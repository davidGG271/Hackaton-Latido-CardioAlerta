# Base técnica/clínica — Tamizaje neonatal de cardiopatías congénitas críticas y ajuste por altitud
**Preparado para el equipo de Cardio Alerta Perú / LATIDO — Hackatón Niño San Borja 2026**

> Este documento resume la evidencia clínica y los algoritmos que **LATIDO debe usar como base real** para su lógica de tamizaje ajustada por altitud. No reemplaza el juicio clínico ni las normas oficiales, pero da al equipo (y a cualquier agente que trabaje en el prototipo) el fundamento técnico exacto para que el "ajuste por altitud" no sea inventado.

---

## 1. Qué es el tamizaje y qué problema resuelve

El tamizaje neonatal de **cardiopatías congénitas críticas (CCC / CCHD)** busca detectar, antes del alta, a recién nacidos aparentemente sanos que tienen una malformación cardíaca grave aún sin síntomas visibles (sin soplo audible, sin cianosis evidente). Sin tamizaje, muchos bebés son dados de alta y regresan días después en shock o colapso cardiocirculatorio, con tratamiento mucho más riesgoso.

**Magnitud del problema:**
- Las cardiopatías congénitas son la malformación de nacimiento más frecuente a nivel mundial.
- De cada 1,000 nacidos vivos, ~8 tienen algún tipo de cardiopatía congénita; entre 2 y 4 de cada 1,000 tienen una forma **crítica** (requiere cirugía/intervención en el primer año de vida).
- Estudios en EE.UU. (Abouk et al.) mostraron que implementar el tamizaje con oximetría redujo significativamente la mortalidad neonatal por estas cardiopatías.

---

## 2. Qué mide exactamente el tamizaje

**Idea de fondo:** el oxímetro de pulso es un sensor no invasivo (mano o pie) que estima, con luz, qué porcentaje de la sangre transporta oxígeno. Ese valor es la **SpO2** (saturación de oxígeno periférica) — es el único dato crudo que produce el sensor. Todo lo demás (rojo/amarillo/verde) es una regla aplicada sobre ese número.

### 2.1 Dos puntos de medición, no uno

| Punto de medición | Nombre clínico | Por qué se mide ahí |
|---|---|---|
| Mano derecha | Saturación **preductal** | La sangre sale del corazón **antes** de pasar por el ductus arterioso (estructura fetal que se cierra tras el nacimiento) |
| Cualquiera de los dos pies | Saturación **postductal** | La sangre pasa **después** del ductus arterioso |

**Por qué importa la diferencia y no solo el valor absoluto:** en un bebé sano ambos valores deberían ser casi iguales. En una cardiopatía crítica la sangre puede "mezclarse" de forma anormal a través del ductus, generando una diferencia notoria entre mano y pie, aunque cada valor por separado parezca aceptable.

> **El algoritmo nunca evalúa un solo número: siempre evalúa tres cosas juntas — valor de la mano, valor del pie, y la diferencia entre ambos.**

### 2.2 Por qué existe esa diferencia (fisiología)

Durante la vida fetal existe el **ductus arterioso**, una conexión entre la arteria pulmonar y la aorta descendente que permite al feto "saltarse" los pulmones. Al nacer, normalmente se cierra en las primeras horas/días.

```
Corazón (izq.) → Aorta ascendente → MANO DERECHA (SpO2 preductal)
Corazón (der.) → Arteria pulmonar → Ductus arterioso → Aorta descendente → PIES (SpO2 postductal)
```

Si el ductus se mantiene abierto por una cardiopatía crítica, se cuela sangre poco oxigenada hacia la aorta descendente → los pies miden menos oxígeno que la mano. **Esa diferencia es en sí misma una señal clínica**, no solo un promedio de dos números.

*(Referencia visual del documento original: diagrama "Circulación relevante para el tamizaje: puntos preductal y postductal", y diagrama "DUCTUS ARTERIOSUS — Persistencia del conducto arterioso (PDA)" comparando circulación normal vs. conducto arterioso persistente.)*

### 2.3 Qué hace físicamente el sensor

```
Emisor LED (luz roja + infrarroja) → Piel/tejido → Fotodetector (mide luz que atraviesa) → Salida: SpO2 (%)
```

La sangre con oxígeno (oxihemoglobina) y sin oxígeno (deoxihemoglobina) absorben la luz de forma distinta. El sensor compara cuánta luz roja e infrarroja atraviesa el tejido en cada pulso cardíaco y calcula qué % de la sangre está saturada de oxígeno. **No mide flujo, ni presión, ni volumen — solo ese único porcentaje.**

### 2.4 Condiciones para que la medición sea válida

- El bebé debe estar **despierto, tranquilo, sin llorar y sin lactar** en el momento de la medición (llorar o lactar baja artificialmente el número y genera falsa alarma).
- Se mide con el bebé **respirando aire normal** (sin oxígeno adicional).
- El momento recomendado es **después de las 24 horas de vida**, o justo antes del alta si el bebé se va antes de cumplir 24h.

### 2.5 Variables clínicas que entran en juego

| Variable clínica | Qué representa físicamente | Por qué importa |
|---|---|---|
| Saturación preductal (mano derecha) | % hemoglobina saturada antes del ductus | Valor de referencia — oxigenación del corazón antes de cualquier mezcla anómala |
| Saturación postductal (pies) | Lo mismo pero después del ductus | Si hay mezcla anómala, este valor baja más que el de la mano |
| Diferencia entre ambos puntos | Qué tan distinta es la oxigenación antes/después del ductus | Diferencia >3% sugiere flujo anómalo, aunque cada valor por separado no parezca bajo |
| Presión parcial de oxígeno ambiental (altitud) | A mayor altitud, menos oxígeno disponible por respiración | El mismo número puede ser normal en la sierra y anormal en la costa → de ahí el ajuste por altitud |
| Edad del bebé en horas de vida | En las primeras horas la circulación aún transiciona (el ductus se cierra de forma natural) | Medir muy temprano puede dar falsa alarma por un proceso normal aún en curso |
| Estado de reposo/alimentación al medir | Llorar o lactar altera temporalmente respiración y circulación periférica | Puede bajar la lectura sin relación con el corazón |
| Número de mediciones repetidas | El cuerpo del bebé fluctúa minuto a minuto | Por eso el protocolo pide repetir en 1 hora antes de decidir |

**En resumen:** el sistema captura evidencia de cómo circula la sangre del bebé en relación al ductus arterioso, ajustada por dos factores externos que alteran el valor esperado sin implicar enfermedad: **la altitud** y **el tiempo transcurrido desde el nacimiento**.

### 2.6 Cardiopatías que detecta

**Principalmente:** síndrome de corazón izquierdo hipoplásico, atresia pulmonar, tetralogía de Fallot, retorno venoso pulmonar anómalo, transposición de grandes arterias, atresia tricuspídea, tronco arterioso.

**Secundariamente:** coartación de aorta, anomalía de Ebstein, doble salida de ventrículo derecho, entre otras. También suele detectar sepsis o neumonías no cardíacas que cursan con baja saturación.

---

## 3. El protocolo estándar (AAP) — versión clásica y actualización 2024/2025

### 3.1 Versión clásica (2011, la más citada en Latinoamérica)

| Resultado | Criterio |
|---|---|
| **Falla (Rojo)** | Saturación < 90% en mano derecha o en el pie, en cualquier medición |
| **Indeterminado (Amarillo)** | Saturación entre 90–94% en mano o pie, o diferencia > 3% entre ambos — se repite en 1 hora |
| **Pasa (Verde)** | Saturación ≥ 95% en mano o pie, con diferencia ≤ 3% entre ambos |

Si el resultado sigue indeterminado tras dos repeticiones (3 mediciones en total, separadas por 1 hora c/u), se considera **fallo** y se deriva a evaluación cardiológica/ecocardiograma.

### 3.2 Actualización AAP (Pediatrics, enero 2025)

Tras más de 14 años de uso en EE.UU., la AAP publicó dos cambios:

1. **Criterio de "pasa" más estricto:** antes bastaba ≥95% en mano **o** pie; ahora se exige ≥95% en la mano **Y** en el pie (ambos).
2. **Solo un reintento** permitido (no dos) — acorta el tiempo hasta el tratamiento cuando la sospecha es real.

> **Relevante para el algoritmo de LATIDO:** conviene usar la versión actualizada (más simple y rápida), citando que la AAP la recomienda para instituciones que sigan sus lineamientos.

---

## 4. El problema real de la altitud (por qué el algoritmo estándar falla en la sierra)

A mayor altitud, la presión parcial de oxígeno del aire disminuye → baja la saturación "normal" de cualquier persona sana. Este efecto se vuelve marcado **por encima de los 2,500 m.s.n.m.**

**Adaptaciones fisiológicas propias de poblaciones andinas:**
- Respuesta ventilatoria hipóxica más baja.
- Niveles de hemoglobina y volúmenes pulmonares mayores.
- Gradiente alveolo-arterial más estrecho.
- Respuesta vasoconstrictora pulmonar hipóxica menos marcada.

> Un bebé sano nacido en Cusco o Puno puede tener una saturación "normal" que sería una falla automática si se usa el umbral de nivel del mar (90–95%). Aplicar el algoritmo estándar sin ajuste genera **muchísimos falsos positivos en zonas altas** — exactamente el Insight 1 del reto Cardio Alerta.

---

## 5. Evidencia específica para el contexto peruano — estudio ANDES-CHD

Estudio hecho en Perú, publicado en *Journal of Perinatology* (2024) por **Bravo-Jaimes et al.**, que evaluó recién nacidos desde el nivel del mar hasta 4,380 m.s.n.m. y propuso algoritmos ajustados por altitud, **uno por cada banda**.

> **Punto clave para el diseño de LATIDO:** el sistema no necesita "inventar" ni interpolar un umbral según la altitud exacta — puede aplicar directamente una de estas tres tablas según en qué banda cae la altitud del establecimiento.

### 5.1 Banda 1 — 0 a 2,499 m.s.n.m. (costa y ciudades bajas)

```
NEONATO A PARTIR DE LAS 24 h DE VIDA O ANTES DEL ALTA (0–2,499 m.s.n.m.)
        ↓
     TAMIZAR
        ↓
┌─────────────────┬──────────────────────────────┬────────────────────────┐
│ < 90% en         │ Entre 90–94% en cualquier     │ ≥ 95% en ambas          │
│ cualquier        │ extremidad o diferencia > 3%  │ extremidades y          │
│ extremidad       │ entre extremidades             │ diferencia < 3%         │
└─────────────────┴──────────────────────────────┴────────────────────────┘
                        ↓ (si Amarillo)
                  REPETIR EN 1 HORA (máx. 1 repetición)
                        ↓
              POSITIVO (Rojo)  |  NEGATIVO (Verde)
   Evaluación inmediata por    |  Cuidados usuales del recién
   médico tratante, manejo y   |  nacido, continuar con CRED
   referencia oportuna a
   neonatología y cardiología
   pediátrica
```

| Resultado | Regla |
|---|---|
| **Rojo (positivo directo)** | < 90% en cualquier extremidad |
| **Amarillo (repetir en 1h, máx. 1 repetición)** | 90–94% en cualquier extremidad, o diferencia > 3% |
| **Verde** | ≥ 95% en ambas extremidades y diferencia ≤ 3% |

### 5.2 Banda 2 — 2,500 a 3,599 m.s.n.m. (sierra media)

```
NEONATO A PARTIR DE LAS 24 h DE VIDA O ANTES DEL ALTA (2,500–3,599 m.s.n.m.)
        ↓
     TAMIZAR
        ↓
┌─────────────────┬──────────────────────────────┬────────────────────────┐
│ < 87% en         │ Entre 87–89% en cualquier     │ ≥ 90% en ambas          │
│ cualquier        │ extremidad o diferencia > 3%  │ extremidades y          │
│ extremidad       │                                │ diferencia ≤ 3%         │
└─────────────────┴──────────────────────────────┴────────────────────────┘
                        ↓ (si Amarillo)
                  REPETIR EN 1 HORA (hasta 2 repeticiones)
                        ↓ (se repite el mismo criterio hasta 2 veces)
              POSITIVO (Rojo)  |  NEGATIVO (Verde)
```

| Resultado | Regla |
|---|---|
| **Rojo** | < 87% en cualquier extremidad |
| **Amarillo (repetir en 1h, hasta 2 repeticiones)** | 87–89% en cualquier extremidad, o diferencia > 3% |
| **Verde** | ≥ 90% en ambas extremidades y diferencia ≤ 3% |

### 5.3 Banda 3 — 3,600 a 4,500 m.s.n.m. (alto andino)

```
NEONATO A PARTIR DE LAS 24 h DE VIDA Y ANTES DEL ALTA (3,600–4,500 m.s.n.m.)
        ↓
     TAMIZAR
        ↓
┌─────────────────┬──────────────────────────────┬────────────────────────┐
│ < 85% en         │ Entre 85–88% en cualquier     │ ≥ 89% en ambas          │
│ cualquier        │ extremidad o diferencia > 3%  │ extremidades y          │
│ extremidad       │                                │ diferencia ≤ 3%         │
└─────────────────┴──────────────────────────────┴────────────────────────┘
                        ↓ (si Amarillo)
                  REPETIR EN 1 HORA (hasta 2 repeticiones)
                        ↓
              POSITIVO (Rojo)  |  NEGATIVO (Verde)
```

| Resultado | Regla |
|---|---|
| **Rojo** | < 85% en cualquier extremidad |
| **Amarillo (repetir en 1h, hasta 2 repeticiones)** | 85–88% en cualquier extremidad, o diferencia > 3% |
| **Verde** | ≥ 89% en ambas extremidades y diferencia ≤ 3% |

### 5.4 Tabla resumen de las tres bandas

| Banda | Altitud (m.s.n.m.) | Rojo (falla) | Amarillo (repetir) | Verde (pasa) | N.° de repeticiones permitidas |
|---|---|---|---|---|---|
| **1** | 0 – 2,499 | < 90% | 90–94% o diferencia > 3% | ≥ 95% en ambas + diferencia ≤ 3% | 1 (2 mediciones en total) |
| **2** | 2,500 – 3,599 | < 87% | 87–89% o diferencia > 3% | ≥ 90% en ambas + diferencia ≤ 3% | 2 (3 mediciones en total) |
| **3** | 3,600 – 4,500 | < 85% | 85–88% o diferencia > 3% | ≥ 89% en ambas + diferencia ≤ 3% | 2 (3 mediciones en total) |

**Detalle importante:** en la Banda 1 el protocolo permite solo **una** repetición. En las Bandas 2 y 3 se permiten **dos** repeticiones (3 mediciones en total, cada una separada por 1 hora) — porque a mayor altitud hay más variabilidad natural y se necesita más evidencia antes de decidir.

### 5.5 Otros estudios que refuerzan el ajuste por altitud

- **Sneeringer et al. (2022):** proponen un umbral de "pasa" más bajo (≥93%) para tamizaje en altitud, reduciendo repeticiones innecesarias y falsos positivos.
- **Estudio a 3,200 m.s.n.m. (UPCH):** propone un punto de corte de 86% para esa altitud específica, y señala que el tiempo de estabilización de la saturación tras el nacimiento puede ser hasta **tres veces mayor** que a nivel del mar.
- **Estudio en La Paz (3,640 m.s.n.m.) y Cochabamba, Bolivia:** encontró diferencias significativas de saturación entre recién nacidos sanos de ambas ciudades, confirmando variación incluso **dentro** de "zonas altas".

---

## 6. Marco normativo peruano (para el criterio de "viabilidad" de la rúbrica)

- **Ley 29885:** declaró de interés nacional el Programa de Tamizaje Neonatal Universal.
- **Ley 31975 (enero 2024):** modifica la Ley 29885 y amplía las enfermedades a tamizar, incluyendo explícitamente **cardiopatía congénita**, junto con hipotiroidismo congénito, hiperplasia suprarrenal, fenilcetonuria, fibrosis quística, hipoacusia y catarata congénita.
- **Norma Técnica de Salud N.° 214-MINSA/DGIESP-2024** ("Atención Integral de Salud Neonatal", R.M. N.° 545-2024/MINSA), de aplicación nacional obligatoria en MINSA, DIRIS, DIRESAs/GERESAs, gobiernos locales y EsSalud.
- **Brecha real (coincide con el PDF oficial del reto):** el marco legal ya existe, pero la implementación universal del tamizaje cardíaco todavía no es una realidad en el terreno.

> **Punto fuerte para el pitch de LATIDO:** el equipo no inventa un requisito legal — ayuda a cerrar la brecha entre una norma ya aprobada (Ley 31975 / NTS 214-2024) y su implementación real en establecimientos de salud, especialmente en altitud.

---

## 7. Implicaciones directas para el diseño de LATIDO

1. **El algoritmo de tamizaje debe seleccionar la banda de altitud del establecimiento** (Banda 1 / 2 / 3) y aplicar la tabla de umbrales correspondiente — no un único umbral fijo tipo "nivel del mar" para todo el Perú.
2. **La lógica siempre evalúa tres valores juntos:** SpO2 mano derecha, SpO2 pie, y la diferencia entre ambos — nunca un solo número aislado.
3. **El número de repeticiones permitidas depende de la banda** (1 en Banda 1; 2 en Bandas 2 y 3), cada una separada por 1 hora — esto debe reflejarse en el flujo/temporizador del prototipo.
4. **Condiciones de validez de la medición** (bebé tranquilo, sin llorar/lactar, aire ambiente, después de 24h de vida o antes del alta) deben aparecer como checklist o validación de entrada antes de aceptar el dato — conecta directamente con la sección "Errores, daño y recuperación" del taller de IA y datos (no mostrar falsa tranquilidad con una entrada de mala calidad).
5. **Resultado Rojo o Amarillo persistente → evaluación inmediata + referencia a neonatología/cardiología pediátrica**, nunca un diagnóstico automático — coherente con el principio "alerta, no diagnóstico" del marco metodológico de LATIDO.
6. **Base legal citable en el pitch:** Ley 29885, Ley 31975 (2024) y NTS N.° 214-MINSA/DGIESP-2024 — refuerzan la viabilidad normativa de la solución.
7. **Fuente científica primaria a citar para el ajuste por altitud:** estudio **ANDES-CHD** (Bravo-Jaimes et al., 2024, *Journal of Perinatology*), hecho en Perú con neonatos de 0 a 4,380 m.s.n.m. — es la base más sólida y local disponible para justificar las tres tablas de bandas.

---

## 8. Fuentes consultadas (documento original)

- Bravo-Jaimes K. et al. *"A new algorithm DEtectS critical Congenital Heart Disease at different altitudes: ANDES-CHD study."* J Perinatol. 2024.
- Bravo-Jaimes K. et al. *"Tamizaje neonatal de cardiopatías congénitas críticas en el Perú: un llamado de urgencia."* Arch Peru Cardiol Cir Cardiovasc. 2024;5(3):157-166.
- American Academy of Pediatrics. *"Newborn Screening for Critical Congenital Heart Disease: A New Algorithm and Other Updated Recommendations."* Pediatrics. 2025.
- Sneeringer M.R. et al. *"Lower pass threshold (≥93%) for critical congenital heart disease screening at high altitude…"* J Perinatol. 2022.
- CDC — Clinical Screening and Diagnosis for Critical Congenital Heart Defects.
- Repositorio UPCH — *"Rangos de saturación de oxígeno en recién nacidos sanos a 3200 metros de altitud."*
- MINSA Perú — NTS N.° 214-MINSA/DGIESP-2024 (R.M. N.° 545-2024/MINSA); Ley 31975 (modificatoria de la Ley 29885).
