"""
Pipeline: RENIPRESS -> Open-Elevation -> Banda de altitud
===========================================================

Flujo:
    RENIPRESS (nombre, distrito, lat, lon)
        -> Open-Elevation API (lat, lon -> altitud en metros)
        -> Banda de altitud (Banda 1 / Banda 2 / Banda 3)
        -> Almacenamiento en SQLite (para consumo directo desde tu app)
        -> Exportación a CSV y JSON (por si tu app prefiere leer archivos planos)

Uso típico:
    1. Descarga el CSV de RENIPRESS desde:
       https://www.datosabiertos.gob.pe/dataset/registro-nacional-de-ipress-renipress-superintendencia-nacional-de-salud-susalud
    2. Ajusta COLUMN_MAP si los nombres de columnas de tu CSV son distintos.
    3. Ejecuta:
       python renipress_altitud_pipeline.py --input renipress.csv --output ipress_altitud

Requisitos:
    pip install pandas requests --break-system-packages

Notas importantes:
- Open-Elevation es gratuito, no requiere API key, pero es un servicio comunitario:
  puede ser lento o fallar bajo carga. El script reintenta y guarda una CACHÉ local
  (cache_elevaciones.json) por coordenada, para no volver a pedir lo mismo si el
  script se corta o lo vuelves a correr.
- Las bandas de altitud por defecto están basadas en literatura clínica peruana
  (tamizaje de cardiopatías congénitas críticas, algoritmo ANDES-CHD / corte de
  SpO2 ajustado desde ~1600 m.s.n.m.). AJÚSTALAS con su mentor clínico del taller
  antes de usarlas para tomar decisiones reales; aquí son un punto de partida
  razonable, no una validación clínica.
"""

import argparse
import json
import sqlite3
import sys
import time
from pathlib import Path

import pandas as pd
import requests

# ---------------------------------------------------------------------------
# 1. CONFIGURACIÓN
# ---------------------------------------------------------------------------

OPEN_ELEVATION_URL = "https://api.open-elevation.com/api/v1/lookup"
BATCH_SIZE = 150          # coordenadas por request POST
SLEEP_BETWEEN_BATCHES = 1.0  # segundos, para no saturar el servicio gratuito
MAX_RETRIES = 3
CACHE_FILE = "cache_elevaciones.json"

# Si tu CSV de RENIPRESS tiene otros nombres de columna, ajusta este mapeo.
# Clave = nombre que usará el pipeline internamente.
# Valor = nombre real de la columna en tu CSV (verifica con pandas.read_csv().columns).
COLUMN_MAP = {
    "codigo": "COD_IPRESS",   # o "Codigo_Unico", verifica tu archivo
    "nombre": "NOMBRE",
    "distrito": "DISTRITO",
    "provincia": "PROVINCIA",
    "departamento": "DEPARTAMENTO",
    "latitud": "NORTE",
    "longitud": "ESTE",
}

# Bandas de altitud por defecto (m.s.n.m.), ajustables.
# Fuente de referencia: Bravo-Jaimes K, et al. "Tamizaje neonatal de
# cardiopatías congénitas críticas en el Perú" (2024) - algoritmo 0-2499
# m.s.n.m. estándar; ajuste de corte SpO2 (95% -> 93%) desde ~1600 m.s.n.m.
ALTITUDE_BANDS = [
    (0, 2499, "Banda 1", "0–2499 m s. n. m."),
    (2500, 3599, "Banda 2", "2500–3599 m s. n. m."),
    (3600, 4500, "Banda 3", "3600–4500 m s. n. m."),
]


# ---------------------------------------------------------------------------
# 2. CARGA DE RENIPRESS
# ---------------------------------------------------------------------------

def load_renipress(csv_path: str) -> pd.DataFrame:
    """Lee el CSV de RENIPRESS y estandariza columnas según COLUMN_MAP."""
    df = pd.read_csv(csv_path, encoding="utf-8-sig", low_memory=False, sep=";")

    missing = [v for v in COLUMN_MAP.values() if v not in df.columns]
    if missing:
        print("ADVERTENCIA: no se encontraron estas columnas en tu CSV:", missing)
        print("Columnas disponibles en tu archivo:")
        print(list(df.columns))
        sys.exit(1)

    df = df.rename(columns={v: k for k, v in COLUMN_MAP.items()})
    df = df[list(COLUMN_MAP.keys())]

    # Limpieza mínima: descartar filas sin coordenadas válidas
    df["latitud"] = pd.to_numeric(df["latitud"], errors="coerce")
    df["longitud"] = pd.to_numeric(df["longitud"], errors="coerce")
    antes = len(df)
    df = df.dropna(subset=["latitud", "longitud"])
    df = df[(df["latitud"] != 0) & (df["longitud"] != 0)]
    print(f"RENIPRESS: {antes} filas leídas, {len(df)} con coordenadas válidas.")

    return df.reset_index(drop=True)


# ---------------------------------------------------------------------------
# 3. CONSULTA A OPEN-ELEVATION (con caché y lotes)
# ---------------------------------------------------------------------------

def load_cache(cache_path: str) -> dict:
    if Path(cache_path).exists():
        with open(cache_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache: dict, cache_path: str) -> None:
    with open(cache_path, "w", encoding="utf-8") as f:
        json.dump(cache, f)


def coord_key(lat: float, lon: float) -> str:
    # Redondeo a 5 decimales (~1.1 m de precisión) para agrupar duplicados
    return f"{round(lat, 5)},{round(lon, 5)}"


def fetch_elevations(df: pd.DataFrame, cache_path: str = CACHE_FILE) -> dict:
    """Devuelve dict {coord_key: elevacion_m} consultando Open-Elevation
    solo para las coordenadas que no estén ya en caché."""
    cache = load_cache(cache_path)

    # Coordenadas únicas (muchos establecimientos pueden compartir predio/lat-lon)
    unique_coords = {}
    for _, row in df.iterrows():
        key = coord_key(row["latitud"], row["longitud"])
        if key not in unique_coords:
            unique_coords[key] = (row["latitud"], row["longitud"])

    pendientes = [k for k in unique_coords if k not in cache]
    print(f"Coordenadas únicas: {len(unique_coords)} | ya en caché: {len(unique_coords) - len(pendientes)} | por consultar: {len(pendientes)}")

    for i in range(0, len(pendientes), BATCH_SIZE):
        batch_keys = pendientes[i:i + BATCH_SIZE]
        locations = [
            {"latitude": unique_coords[k][0], "longitude": unique_coords[k][1]}
            for k in batch_keys
        ]

        for attempt in range(1, MAX_RETRIES + 1):
            try:
                resp = requests.post(
                    OPEN_ELEVATION_URL,
                    json={"locations": locations},
                    headers={"Content-Type": "application/json"},
                    timeout=30,
                )
                resp.raise_for_status()
                results = resp.json()["results"]
                for k, r in zip(batch_keys, results):
                    cache[k] = r.get("elevation")
                print(f"  Lote {i // BATCH_SIZE + 1}: {len(batch_keys)} coordenadas OK")
                break
            except Exception as e:
                print(f"  Intento {attempt}/{MAX_RETRIES} falló para el lote {i // BATCH_SIZE + 1}: {e}")
                if attempt == MAX_RETRIES:
                    print("  Se omite este lote (quedará pendiente para la próxima corrida).")
                else:
                    time.sleep(3 * attempt)

        save_cache(cache, cache_path)  # guarda progreso tras cada lote
        time.sleep(SLEEP_BETWEEN_BATCHES)

    return cache


# ---------------------------------------------------------------------------
# 4. CLASIFICACIÓN POR BANDA
# ---------------------------------------------------------------------------

def classify_band(elevation_m: float):
    if elevation_m is None:
        return None, "Sin dato de altitud"
    for low, high, banda, desc in ALTITUDE_BANDS:
        if low <= elevation_m <= high:
            return banda, desc
    return None, "Fuera del rango validado por ANDES-CHD"


# ---------------------------------------------------------------------------
# 5. ALMACENAMIENTO (SQLite + exportación CSV/JSON)
# ---------------------------------------------------------------------------

def save_to_sqlite(df: pd.DataFrame, db_path: str) -> None:
    conn = sqlite3.connect(db_path)
    df.to_sql("establecimientos", conn, if_exists="replace", index=False)
    conn.execute("CREATE INDEX IF NOT EXISTS idx_codigo ON establecimientos(codigo);")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_distrito ON establecimientos(distrito);")
    conn.commit()
    conn.close()
    print(f"Guardado en SQLite: {db_path} (tabla 'establecimientos')")


def export_flat_files(df: pd.DataFrame, output_prefix: str) -> None:
    csv_path = f"{output_prefix}.csv"
    json_path = f"{output_prefix}.json"
    df.to_csv(csv_path, index=False, encoding="utf-8-sig")
    df.to_json(json_path, orient="records", force_ascii=False, indent=2)
    print(f"Exportado: {csv_path}")
    print(f"Exportado: {json_path}")


# ---------------------------------------------------------------------------
# 6. MAIN
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Pipeline RENIPRESS -> Open-Elevation -> Banda de altitud")
    parser.add_argument("--input", required=True, help="Ruta al CSV de RENIPRESS descargado")
    parser.add_argument("--output", default="ipress_altitud", help="Prefijo de salida (CSV/JSON) y nombre de la BD SQLite")
    args = parser.parse_args()

    df = load_renipress(args.input)

    cache = fetch_elevations(df)

    df["altitud_m"] = df.apply(
        lambda row: cache.get(coord_key(row["latitud"], row["longitud"])), axis=1
    )
    bandas = df["altitud_m"].apply(classify_band)
    df["banda_altitud"] = bandas.apply(lambda x: x[0])
    df["banda_descripcion"] = bandas.apply(lambda x: x[1])

    save_to_sqlite(df, f"{args.output}.db")
    export_flat_files(df, args.output)

    print("\nResumen por banda de altitud:")
    print(df["banda_altitud"].value_counts(dropna=False))


if __name__ == "__main__":
    main()
