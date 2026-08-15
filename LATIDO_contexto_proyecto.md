# LATIDO — Contexto completo del proyecto
**Hackatón en Salud · Instituto Nacional de Salud del Niño – San Borja (INSNSB) 2026**
**Desafío:** Cardio Alerta Perú
**Nombre del proyecto/software:** LATIDO

> Este documento reúne todo el contexto necesario (bases del evento, desafío, talleres, contenido clínico/de datos, y la idea de proyecto ya trabajada por el equipo) para que cualquier agente o colaborador pueda entender de inmediato qué se va a construir, para quién, con qué reglas y con qué límites. Está pensado como documento único de referencia — no reemplaza las bases oficiales, pero las resume de forma operativa.

---

## 1. Qué es la Hackatón y quién la organiza

El **Instituto Nacional de Salud del Niño – San Borja (INSNSB)**, junto con la Secretaría de Gobierno y Transformación Digital de la PCM, la **PUCP** y **ESAN**, organiza una Hackatón en Salud (modalidad híbrida: virtual + presencial) para desarrollar soluciones con potencial de implementación real frente a seis desafíos prioritarios de salud pediátrica en Perú.

- **Sedes:** INSN San Borja, ESAN, PUCP.
- **Sede y desafíos asignados a este equipo:** **PUCP → Cardio Alerta Perú** (la otra sede asignada a PUCP trabaja "Crecer Mejor", pero nuestro equipo trabaja Cardio Alerta).
- **Inscripciones:** 16–30 de julio de 2026 (vía portal.insnsb.gob.pe).
- **Equipos:** 3 a 5 integrantes, multidisciplinarios (salud, ingeniería, ciencias sociales, afines), se recomienda al menos un integrante de salud.
- **Metodología del evento:** Inducción → Talleres de entendimiento → Desarrollo de soluciones → Mentorías → Pitch final.
- **Entregables finales obligatorios:**
  1. Formato de entrega final (Anexo 1): problema, solución, usuarios, impacto, viabilidad, componentes, próximos pasos.
  2. Prototipo o demo funcional (no necesita estar 100% implementado, pero debe ser evaluable).
  3. Pitch final ante jurado.
  4. Componentes abiertos y reutilizables (código, modelos, diseños) bajo licencia abierta, con enlace público.
  5. Declaración de uso de IA generativa (Anexo 2) si se usó IA — debe detallar herramienta, uso, y revisión humana de los resultados.
- **Reglas clave a respetar:**
  - No se permiten datos personales reales ni información sensible sin autorización.
  - La solución debe declarar honestamente qué es real, qué es simulado y qué está fuera de alcance.
  - No se exige integración real con sistemas del INSNSB ni despliegue en producción.
  - No se espera desarrollo de hardware médico (p. ej. no inventar un oxímetro nuevo).
  - Todo dato/fuente de terceros debe citarse.
  - Ética: evitar estigmatización, discriminación o uso indebido de información clínica.

### Criterios de evaluación (rúbrica, Anexo 4)

| Criterio | Peso | Qué evalúa |
|---|---|---|
| Innovación | 20% | Originalidad y diferenciación frente a soluciones existentes |
| Impacto en salud | 25% | Beneficio real y medible para la salud pediátrica |
| Viabilidad técnica y económica | 20% | Factibilidad de implementación real |
| Enfoque en el usuario | 20% | Qué tan bien responde a necesidades reales de los usuarios finales |
| Calidad de la presentación (pitch) | 15% | Claridad y capacidad de comunicar la propuesta |

**Implicación práctica:** Impacto en salud es el criterio de mayor peso — el pitch y el prototipo deben dejar clarísimo qué decisión clínica/operativa cambia y qué vidas o procesos mejora, no solo mostrar tecnología.

---

## 2. El desafío: Cardio Alerta Perú

**Título oficial:** *Cardio Alerta Perú: Cuidando Corazones desde el primer latido*
**Servicio:** Cardiología

**Pregunta "¿Cómo podríamos...?" oficial:**
> ¿Cómo podríamos mejorar el tamizaje y la identificación temprana de pacientes pediátricos con sospecha de cardiopatías críticas, para que sean orientados y derivados de manera oportuna y segura, logrando reducir retrasos en la evaluación y atención especializada?

### 2.1 A quién afecta (usuarios)

1. **Pacientes pediátricos en riesgo:** recién nacidos con posible cardiopatía crítica dados de alta sin tamizaje oportuno, especialmente en zonas alejadas con traslados complejos y costosos.
2. **Médicos y personal asistencial del primer nivel:** en postas/centros de salud, sin herramientas ágiles de tamizaje ni canal directo de interconsulta.
3. **Familias y cuidadores:** sobre todo en zonas alejadas o vulnerables, con dificultad para saber a dónde acudir y coordinar traslado oportuno.

### 2.2 Dónde ocurre

- **Origen:** puestos de salud, centros médicos y hospitales regionales de todo el Perú, especialmente zonas rurales, dispersas o de gran altitud — donde ocurren partos y altas neonatales.
- **Destino:** hospitales regionales/provinciales y, en última instancia, el INSN-SB, donde la falta de estandarización y de ajuste por altitud impide un tamizaje consistente.

### 2.3 Situación actual (el problema real)

- El tamizaje neonatal de cardiopatías críticas **no es universal**; la ley de tamizaje no está implementada; **no existe ajuste por altitud**.
- Neonatos son dados de alta sin tamizaje y regresan en shock, siendo trasladados en estado crítico.
- El médico rural está **aislado**: no tiene mecanismo ágil (telemedicina) para consultar a un especialista ante un caso sospechoso.
- La **derivación es burocrática y lenta**: trámites y papeleo fragmentados retrasan el traslado, y los pacientes llegan al INSN-SB severamente descompensados.

### 2.4 Situación deseada

1. **Identificación temprana estandarizada:** todo recién nacido recibe tamizaje de oximetría antes del alta, **adaptado a la altitud de su zona**, mediante una app que guía el procedimiento, registra el resultado y activa una alerta al centro de referencia.
2. **Orientación médica en tiempo real:** ante sospecha, el médico de origen se conecta por telemedicina/alertas inteligentes con especialistas del INSN-SB.
3. **Derivación segura y sin retrasos:** flujo de referencia simplificado y prioritario que elimina el cuello de botella administrativo.

### 2.5 Insights clave del trabajo de campo (evidencia)

1. **Sesgo de altitud en el tamizaje:** por encima de ~3,000 m.s.n.m. la saturación normal de un bebé es más baja. Los médicos, al no ajustar por altura, generan falsos diagnósticos (descartan casos reales o se alarman por valores normales para la altura).
2. **Aislamiento del médico rural (SERUMS):** teme activar una referencia porque, si se equivoca, el sistema lo sanciona o lo satura de papeleo — prefiere "esperar y observar", perdiendo tiempo vital.
3. **Señales invisibles para la familia:** los padres no ven síntomas alarmantes hasta que el bebé entra en crisis; confunden fatiga al lactar, sudoración excesiva o respiración rápida con "gases", frío o soroche.
4. **Papeleo interhospitalario:** la referencia no se frena por falta de ambulancias sino por falta de interoperabilidad — formatos físicos (hojas SIS) y llamadas a Centrales de Referencia que no contestan.
5. **Ventana crítica del "Alta Médica":** el momento del alta es la última oportunidad segura para capturar una cardiopatía crítica antes de que el paciente se disperse en la comunidad.

**Dato clave:** en Perú, de cada 1,000 nacidos vivos, entre 8 y 10 presentan una cardiopatía congénita (EsSalud, 2026). Las cardiopatías congénitas son una de las primeras causas de mortalidad neonatal en el país.

### 2.6 Qué SÍ se espera del prototipo

- **Prototipo funcional** (interactivo o rediseño de flujo) que muestre cómo se captura el dato del paciente y cómo viaja la alerta.
- **Algoritmo adaptado al entorno peruano:** ajuste matemático obligatorio de SpO₂ según altitud (m.s.n.m.).
- **Módulo de interoperabilidad simulada:** canal simplificado que simule comunicación, envío de alertas y agendamiento de telemedicina entre el centro periférico y el INSN-SB.
- **Enfoque centrado en el usuario:** interfaz simple, considerando alta rotación de personal, poco tiempo y conectividad limitada.

### 2.7 Qué NO entra en el alcance

- No desarrollar hardware médico (no inventar oxímetros ni dispositivos físicos).
- No se exige integración real ni despliegue en producción hospitalaria durante el evento.

---

## 3. Marco metodológico general (cómo debe pensarse la solución)

### 3.1 Design Thinking (taller introductorio)

Proceso de 5 fases, centrado en las personas, no lineal (se puede volver a fases anteriores tras testear):

1. **Empatizar (Usuario):** observar y escuchar sin suposiciones. Herramientas: mapa de actores, mapa de empatía, entrevistas, user journey map, los 5 porqués.
2. **Definir (Plantear):** sintetizar hallazgos → formular preguntas **HMW ("¿Cómo podríamos...?")** que abran oportunidades de diseño.
3. **Idear (Priorizar):** pensamiento expansivo — brainstorming, Crazy Eights (8 ideas en 8 min), sketching, matriz impacto vs. factibilidad.
4. **Prototipar (Crear):** maquetas de baja fidelidad (storyboards, wireframes, role playing) — rápidas y baratas.
5. **Testear (Validar):** presentar el prototipo en contexto real, escuchar sin defenderlo, y estar dispuesto a volver a fases anteriores ("falla rápido y barato para triunfar mucho antes").

### 3.2 Lógica de trabajo del equipo (taller introductorio de la hackatón)

**Comprender → Delimitar → Prototipar → Comunicar**

- **Comprender:** usuario, contexto, dolor, momento del cuidado.
- **Delimitar:** qué sí entra en el reto y qué no se debe prometer.
- **Prototipar:** solución mínima, explicable y viable.
- **Comunicar:** qué resuelve, para quién, y cómo podría continuar.

Antes de cada sesión el equipo debe traer **tres preguntas sobre el problema**, no solo ideas de solución.

### 3.3 De la decisión a la solución (taller de IA y datos)

**Principio central:** no empezar por la herramienta de IA. Empezar por la **decisión** que se quiere apoyar.

> Regla de oro: si no puedes escribir la decisión en una oración, la IA aún no está bien integrada al MVP.

**Cadena de valor que todo prototipo debe cerrar:**

```
Problema → Información → Decisión → Acción → Seguimiento
Necesidad → Datos mínimos → Resultado → Decisión humana → Acción y seguimiento
```

**Decisión que apoya específicamente Cardio Alerta (según el taller):**
> ¿La información amerita alerta, revisión, teleorientación o referencia?

**Caso guía Cardio Alerta (tal como lo plantea el taller):**

```
SpO2 + Altitud → Regla / algoritmo → Alerta → Teleorientación
```

- **Datos mínimos:** medición, altitud y contexto necesario para interpretar el resultado.
- **Resultado:** una alerta o necesidad de revisión — **nunca un diagnóstico automático**.
- **Acción:** un profesional revisa, orienta y activa el flujo correspondiente.
- **Puede bastar una regla explicable** (no se necesita ML complejo para el MVP).

**Elegir el método más simple que resuelva el problema** (reglas, analítica, ML, IA generativa, optimización) — reglas y scores explicables son igual de válidos que un modelo sofisticado, y suelen ser preferibles para un MVP explicable.

### 3.4 Errores, daño y recuperación

Todo sistema puede fallar. Para Cardio Alerta específicamente, el taller señala:

> **Si la entrada es incierta, el flujo no debe terminar en falsa tranquilidad.**

```
Entrada incierta → Pedir nueva medición → Mostrar límite → Revisión humana → Escalar el flujo
```

- **Prevención:** validar campos, mostrar la calidad de la entrada.
- **Recuperación:** permitir repetir, corregir, o solicitar revisión.
- **Salida segura:** nunca mostrar tranquilidad cuando falta información suficiente.

**Plantilla de error a usar en el pitch:**
> En {momento de decisión}, {error específico} puede afectar a {usuario/grupo} y producir {daño}. Para prevenirlo, haremos {prevención}. Cuando ocurra, continuaremos mediante {recuperación}.

### 3.5 Automatización y control humano

La automatización es un continuo, no un binario. Regla de diseño: **a mayor consecuencia, mayor necesidad de control humano.**

Controles prototipables: revisar, aceptar/rechazar, editar/corregir, repetir, ignorar/recalcular, escalar.

Para Cardio Alerta, dado que una consecuencia alta (posible cardiopatía crítica) está en juego, el nivel de control debe ser: **trazabilidad y salida** — registrar, escalar, permitir pedir segunda opinión. El sistema **sugiere y prioriza**, la persona (médico) **decide y confirma**.

### 3.6 Confianza calibrada y límites declarados

El objetivo no es que el usuario confíe "mucho" en el sistema, sino lo necesario (ni poca ni demasiada confianza). Se debe declarar explícitamente:

- **Nuestra IA/sistema sirve para:** contextualizar SpO₂ con altitud, generar una alerta, ayudar a organizar la información para la referencia.
- **Puede fallar cuando:** entrada incompleta, mediciones de mala calidad, casos fuera de rango esperado.
- **No debe usarse para:** diagnosticar, reemplazar el criterio clínico, decidir una referencia sin revisión humana.

### 3.7 Medir el valor

Evaluar en tres niveles, no solo el modelo:
1. **Resultado técnico:** falsos negativos/positivos, calidad del ajuste por altitud.
2. **Flujo y operación:** ¿reduce tiempo de referencia? ¿hace visible el caso al especialista?
3. **Acción y persona:** ¿el personal de salud entiende la alerta? ¿puede corregir? ¿confía adecuadamente?

### 3.8 Niveles de construcción del MVP

- **Nivel 1 — Simular:** mockup, datos ficticios, recorrido del usuario.
- **Nivel 2 — Automatizar:** regla, gráfico, clasificación, llamada a LLM o alerta.
- **Nivel 3 — MVP conectado:** interfaz + datos + procesamiento + resultado real.

**Ser siempre transparentes sobre qué funciona de verdad y qué está simulado.**

---

## 4. Datos: cómo se deben tratar (taller de datos clínicos)

### 4.1 Idea central

> Medición ≠ dato ≠ información. Un valor clínico solo tiene sentido con su contexto: sistema, población, momento, propósito, forma de registro.

Cadena a reconstruir para cualquier dato usado: **Paciente/contexto → Medición → Registro → Dato → Información útil.**

### 4.2 Aplicado directamente a Cardio Alerta

> **Interpretar SpO₂ sin contexto de altitud y de medición puede ser engañoso.**

Antes de usar un valor de SpO₂ en el prototipo, LATIDO debe poder responder:
- ¿A qué altitud se tomó la medición?
- ¿Con qué equipo y en qué condiciones?
- ¿Cómo se obtuvo la señal (calidad de la señal de oximetría)?

**Idea de diseño explícita del material:** si el sistema genera una alerta a partir de SpO₂, la información de contexto (altitud, calidad de medición) debe formar parte visible de la alerta, o el sistema debe declarar explícitamente sus límites.

### 4.3 Fuentes públicas recomendadas para Cardio Alerta

| Dataset | Qué aporta | Límite explícito |
|---|---|---|
| **Dryad CCHD Screening** | 2,768 tamizajes; señal cruda de oximetría/PI | Útil para calidad de medición; **no incorpora la altitud peruana** |
| **CirCor DigiScope (PCG)** | 5,000+ fonocardiogramas, soplos anotados, outcome cardiológico | Un modelo de soplos **no sustituye** oximetría ni ecocardiografía |
| **Pediatric CHD clinical + echo** | Variables clínicas y ecocardiográficas | Para fase especializada, no para tamizaje de primer nivel |

**Regla de oro del taller:** si el equipo no puede explicar una variable, no debe usarla para sostener una decisión del pitch. Los datasets públicos sirven para aprender, explorar y demostrar lógica — **no validan automáticamente** la solución para el INSN-SB ni para el Perú.

### 4.4 Checklist de datos a aplicar en LATIDO

- ¿La población del dataset (usualmente extranjera) coincide con población peruana / de altura?
- ¿Hay rangos imposibles o valores codificados en los datasets usados?
- ¿Estamos mezclando neonatos con otros grupos etarios?
- ¿La variable "SpO₂" mide realmente lo mismo en cada fuente (mismo dispositivo, protocolo)?
- Declarar siempre: qué parte del MVP usa datos reales/públicos, qué parte usa datos sintéticos, y qué parte es simulada por el propio equipo (ej. la interoperabilidad con el INSN-SB).

### 4.5 "Data Headline" — ejercicio de honestidad de datos

Ejercicio recomendado (adaptado del Google People + AI Guidebook): imaginar el titular negativo que podría aparecer en un año sobre la solución, ej.:
> "El prototipo funcionaba en la demo, pero falló porque sus datos no representaban a los pacientes reales (de altura)."

Pregunta de diseño: ¿qué decisión sobre los datos podemos tomar hoy para evitar ese titular? → Para LATIDO, la respuesta central es: **el ajuste por altitud no puede ser cosmético ni inventado sin base**, debe declararse su fuente/metodología y sus límites.

---

## 5. LATIDO — la idea de proyecto ya definida por el equipo

**Nombre del proyecto:** **LATIDO**
**Desafío:** Cardio Alerta Perú
**Usuario principal:** personal de salud del primer nivel que realiza el tamizaje neonatal (especialmente en zonas alejadas/altura).

### 5.1 Problema (versión de trabajo del equipo)

> Cuando el tamizaje neonatal genera una sospecha, el personal de salud puede enfrentar dificultades para interpretar el resultado en su contexto, recibir orientación especializada y activar oportunamente la referencia.

Reformulado de forma más amplia:
> Un tamizaje sospechoso no siempre se convierte rápidamente en una acción de atención especializada (sospecha → acción tardía).

### 5.2 Barreras identificadas

- **Altitud:** dificulta la interpretación correcta del resultado de oximetría.
- **Aislamiento del médico:** miedo a equivocarse / sanción administrativa al activar una referencia; falta de orientación especializada rápida.
- **Referencia burocrática:** el proceso administrativo genera retrasos (papeleo físico, llamadas sin respuesta).
- **Ventana crítica antes del alta:** se necesita actuar oportunamente dentro de las 12–48 horas de vida, antes del alta neonatal.

### 5.3 Oportunidad y solución

> Conectar el resultado del tamizaje con una ruta de acción: **contextualizar → alertar → orientar → referir → hacer seguimiento.**

**Concepto guía del proyecto:** *"De la detección a la acción"* — no basta con detectar una señal de alerta, hay que asegurar que esa señal se convierta en una acción concreta y oportuna. La IA actúa como **copiloto** del personal de salud, nunca como reemplazo de la decisión clínica.

### 5.4 Flujo funcional de LATIDO

```
👶 Tamizaje (recién nacido, oximetría)
   ↓
⛰️ Contexto de altitud
   ↓
🧮 Evaluación según protocolo (ajuste por m.s.n.m.)
   ↓
🔴 Resultado (normal / sospechoso)
   ↓
🤖 IA como copiloto (organiza y resume la información, no diagnostica)
   ↓
🚨 Alerta
   ↓
📹 Orientación especializada (telemedicina simulada con INSN-SB)
   ↓
📄 Generación de información de referencia
   ↓
🔄 Seguimiento
```

Versión resumida (cadena de valor):
```
Tamizaje → Interpretación contextualizada → Alerta → Orientación → Referencia → Seguimiento
```

### 5.5 Justificación con el marco DOLOR / IMPACTO / URGENCIA / DEMOSTRABILIDAD

- **DOLOR:** el personal de salud (sobre todo en establecimientos alejados) enfrenta una situación crítica ("tengo una posible señal de alerta en un recién nacido, pero necesito convertir rápidamente ese resultado en una decisión y una referencia") y no siempre tiene cómo resolverla rápido.
- **IMPACTO:** reduce la fricción entre detectar una señal de alerta y activar la siguiente acción (Detección → Acción).
- **URGENCIA:** el tamizaje debe hacerse idealmente entre las 12 y 48 horas de vida y antes del alta — es una ventana temporal muy concreta, no un trámite postergable. Retrasos pueden hacer que el paciente llegue a atención especializada severamente descompensado.
- **DEMOSTRABILIDAD:** se puede simular en la hackatón el escenario completo: registro del tamizaje → ajuste por altitud → resultado según protocolo → sospecha → IA organiza/explica la info → alerta → orientación especializada solicitada → información de referencia generada → seguimiento mostrado. El propio reto pide exactamente esto: mostrar captura de datos, el viaje de la alerta, y un módulo simulado de interoperabilidad/telemedicina.

### 5.6 Resumen en una tabla (formato ficha)

| Campo | Contenido |
|---|---|
| Usuario | Personal de salud que realiza el tamizaje (primer nivel, zonas alejadas) |
| Dolor | Tenemos una sospecha y necesitamos actuar rápido |
| Barrera | Orientación y referencia difíciles de activar |
| Oportunidad | Conectar el tamizaje con una ruta de acción clara |
| Solución | LATIDO: plataforma de apoyo y activación que convierte la detección en acción |
| Momento crítico | Alta neonatal (ventana de 12–48h) |
| Tecnología | Regla/algoritmo de ajuste por altitud + alertas + IA como copiloto + interoperabilidad simulada |
| Resultado esperado | Acción y referencia más oportuna; una sospecha deja de ser un dato aislado y se convierte en una acción coordinada |
| Demo | Tamizaje → Alerta → Especialista (flujo navegable, con datos simulados/públicos declarados) |

### 5.7 Uso de IA dentro de LATIDO — rol explícito (no negociable para el diseño)

- La IA/lógica del sistema **organiza, contextualiza y resume** información (por ejemplo, aplica el ajuste por altitud, redacta un resumen para telemedicina, prioriza la alerta).
- La IA **no diagnostica** y **no decide** la referencia por sí sola.
- Toda alerta debe mostrar su base (SpO₂, altitud, contexto) y permitir **revisar, corregir/repetir medición, o escalar**.
- Si la entrada es incierta o incompleta, el sistema **no debe mostrar falsa tranquilidad**; debe pedir una nueva medición o escalar a revisión humana.
- Debe quedar documentado (Anexo 2 de las bases) qué herramienta de IA generativa se usó, para qué, y cómo se revisó/verificó lo que produjo, si se usa alguna en el desarrollo o en el propio prototipo.

### 5.8 Pendiente de definir por el equipo (explícitamente señalado por el usuario)

- Ícono / identidad visual de LATIDO.
- Imágenes / branding.
- (El resto de la lógica de producto, flujo de datos y narrativa ya está desarrollada, ver secciones 5.1–5.7).

---

## 6. Referencia rápida — vocabulario y reglas de oro del proyecto

- **Momento de decisión de LATIDO:** el punto donde aparece la alerta y el profesional decide revisar, teleorientar o referir.
- **Regla de oro (decisión):** si la decisión que apoya LATIDO no cabe en una oración, aún falta integrar bien la IA.
- **Regla de oro (datos):** no preguntar primero "¿qué modelo uso?", sino "¿qué información necesito, de dónde viene, qué representa, qué falta y qué decisión quiero apoyar?".
- **Regla de oro (límites):** si el equipo no puede declarar qué es real y qué es simulado en la demo, y qué NO debe usarse para (ej. diagnosticar), el sistema todavía no está listo para presentarse.
- **Frase de cierre de errores:** no es "si ocurre un error", es "diseñar qué hacer cuando ocurra".

---

## 7. Fuentes de este documento

Todo el contenido anterior proviene de los materiales oficiales y de trabajo del equipo:
- Bases de Participación — Hackatón en Salud (INSNSB 2026), incluyendo anexos 1–4.
- Taller introductorio — Hackatón (sedes, desafíos, metodología comprender/delimitar/prototipar/comunicar).
- Taller introductorio de Design Thinking (Micaela Alvarado Eslava).
- Taller 2 — IA y datos en prototipos de salud: de la decisión a la solución (Carlos Vásquez Roque).
- Hackatón — Comprensión y evaluación de datos clínicos (contexto de datos clínicos completo, incluye MIMIC-III, ficha de datos, fuentes públicas por reto).
- Desafío 02 — Cardio Alerta Perú (documento oficial del desafío).
- Caso de éxito — Diccionario de Lengua de Señas (referencia de caso de innovación en salud/accesibilidad, contexto general del ecosistema).
- IDEA_PROYECTO.txt — desarrollo propio del equipo para LATIDO (dolor, impacto, urgencia, demostrabilidad, flujo funcional).
