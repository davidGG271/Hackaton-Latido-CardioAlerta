"""
Ejemplo de cómo tu software consultaría la banda de altitud
ya calculada, sin volver a llamar a Open-Elevation en cada uso.

Uso:
    from consultar_banda_altitud import buscar_por_codigo, buscar_por_nombre

    est = buscar_por_codigo("ipress_altitud.db", "00001234")
    print(est)  # {'codigo': ..., 'nombre': ..., 'altitud_m': ..., 'banda_altitud': ...}
"""

import sqlite3


def _row_to_dict(cursor, row):
    return {desc[0]: value for desc, value in zip(cursor.description, row)}


def buscar_por_codigo(db_path: str, codigo_renipress: str) -> dict | None:
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute("SELECT * FROM establecimientos WHERE codigo = ?", (codigo_renipress,))
    row = cur.fetchone()
    result = _row_to_dict(cur, row) if row else None
    conn.close()
    return result


def buscar_por_nombre(db_path: str, texto: str, limite: int = 10) -> list[dict]:
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM establecimientos WHERE nombre LIKE ? LIMIT ?",
        (f"%{texto}%", limite),
    )
    rows = cur.fetchall()
    results = [_row_to_dict(cur, r) for r in rows]
    conn.close()
    return results


if __name__ == "__main__":
    # Ejemplo rápido de prueba
    import sys
    if len(sys.argv) < 3:
        print("Uso: python consultar_banda_altitud.py <ruta_db> <texto_a_buscar>")
        sys.exit(1)
    for est in buscar_por_nombre(sys.argv[1], sys.argv[2]):
        print(est.get("nombre"), "->", est.get("altitud_m"), "m ->", est.get("banda_altitud"))
