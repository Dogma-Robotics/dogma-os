# DOGMA — BASE DE DATOS MAESTRA FUNDACIONAL

**Versión:** 1.0
**Fecha de compilación:** 2026-03-24
**Fuente exclusiva:** Corpus interno DOGMA (dogma_master_prompt_profesional.txt, ARCHITECTURE.md, MIGRATION.md, nodes.ts, types.ts, theme.ts)
**Clasificación:** Documento fundacional — Arquitectura de información y ontología
**Principio rector:** Ningún dato inventado. Todo dato no confirmado explícitamente lleva marcador de certeza.

---

## LEYENDA DE MARCADORES DE CERTEZA

| Marcador | Significado |
|---|---|
| **confirmado** | Dato explícitamente declarado en el corpus con consistencia |
| **inferido** | Dato derivable lógicamente del corpus pero no declarado textualmente |
| **estimado** | Valor numérico aproximado, mencionado como estimación |
| **candidato** | Nombre, valor o diseño propuesto pero no finalizado |
| **hipótesis** | Afirmación teórica no validada experimentalmente |
| **pendiente de validación** | Dato declarado pero que requiere verificación futura |
| **aspiracional** | Visión futura o meta, no estado actual |
| **benchmark conversacional** | Comparación mencionada en contexto informal, no riguroso |

---

# SECCION 1 — RESUMEN ESTRUCTURAL DE LA ARQUITECTURA

## 1.1 Visión general

DOGMA es un proyecto de manos humanoides biomiméticas, musculoesqueléticas y sensadas que replica la estructura humana a escala 1:1. El proyecto mantiene una **doble naturaleza inseparable**: un eje técnico/robótico (ingeniería, control, sensado, software) y un eje conceptual/filosófico (narrativa, naming simbólico, branding con raíces latinas, griegas y bíblicas).

## 1.2 Arquitectura de 34 nodos

La base de datos se organiza en **34 nodos de primer nivel (L1)** que cubren la totalidad del dominio DOGMA:

- **Nodos 1–4:** Identidad, filosofía, naming, arquitectura de producto
- **Nodos 5–8:** Ingeniería mecánica (mano, brazo), sensado/actuación, especificaciones
- **Nodos 9–12:** Economía, mercado, competencia, diferenciadores
- **Nodos 13–16:** Branding, documentación, roadmap, comunidad
- **Nodos 17–20:** Riesgos, preguntas abiertas, trazabilidad, gobernanza del dato
- **Nodos 21–27:** Arquitectura de control M0-M9, estimación de estado, seguridad, gemelo digital, políticas/Active Inference, software RT, simulación (EJE CENTRAL)
- **Nodos 28–34:** Aplicación de control/HMI, producto digital, ROS Bridge, skills/runs, teaching/teleop, datos/replay, integraciones empresariales

## 1.3 Doble eje

| Eje | Alcance | Ejemplos |
|---|---|---|
| **Técnico/Robótico** | Hardware, control, software, sensores, actuadores, ROS 2, M0-M9, HMI | McKibben a 4 bar, 20 DOF mano, 6 DOF brazo, BUS SENSORS |
| **Conceptual/Filosófico** | Naming, narrativa, tesis fundacional, branding, estética | "músculo → hueso → movimiento → acción", Dextera, Genesis, Ruach, Manus Dei |

## 1.4 Control M0-M9 como pilar central

La arquitectura de control no es un apéndice; es el **sistema nervioso central** de DOGMA. Los módulos M0 (Safety, 1-5kHz) a M9 (Meta-Supervisor, 0.1-1Hz) forman una jerarquía de control en tiempo real donde cada capa opera a una frecuencia distinta y se comunica mediante buses formales de señal (BUS SENSORS, BUS STATE, BUS LIMITS, BUS COMMANDS).

**Principio de control primario:** DOGMA se controla por fuerzas/tensiones de tendones, NO por ángulos articulares. No hay encoders articulares. La relación músculo-tendón es 1:1.

## 1.5 Aplicación de control como parte formal del sistema

DOGMA Control OS v1.0 es la interfaz operativa del sistema. Construida sobre React + RosBridge WebSocket, con tres roles de usuario (Operator, Engineer, Admin) y 13 páginas funcionales. Es parte integral del sistema, no una herramienta auxiliar.

---

# SECCION 2 — MAPA MAESTRO JERARQUICO

```
DOGMA — SISTEMA COMPLETO
│
├── 1. IDENTIDAD_NUCLEAR
│   ├── 1.1 Nombre del proyecto
│   ├── 1.2 Definición nuclear
│   ├── 1.3 Misión y visión
│   ├── 1.4 Naturaleza dual (técnica + filosófica)
│   └── 1.5 Principios fundacionales
│
├── 2. FILOSOFIA_Y_MARCO_CONCEPTUAL
│   ├── 2.1 Tesis fundacional
│   │   ├── 2.1.1 Secuencia lógica: músculo → hueso → movimiento → acción
│   │   └── 2.1.2 Acto creador / génesis
│   ├── 2.2 Integración ciencia-arte-filosofía
│   ├── 2.3 Narrativa bíblica/simbólica
│   └── 2.4 Tono sobrio y académico
│
├── 3. NAMING_SEMANTICA_Y_LENGUAJE
│   ├── 3.1 Sistema de doble naming
│   │   ├── 3.1.1 Nombre conceptual
│   │   └── 3.1.2 Descriptor técnico
│   ├── 3.2 Catálogo de nombres
│   │   ├── 3.2.1 DOGMA Genesis — Facsimile Humanum
│   │   ├── 3.2.2 DOGMA Dextera — Biomimetic Hand V1
│   │   ├── 3.2.3 DOGMA Ruach — Actuated Hand System
│   │   ├── 3.2.4 DOGMA Logos
│   │   ├── 3.2.5 DOGMA Adama
│   │   └── 3.2.6 DOGMA Manus Dei
│   ├── 3.3 Raíces etimológicas (latín, griego, hebreo bíblico)
│   └── 3.4 Guía de uso del lenguaje
│
├── 4. ARQUITECTURA_DE_PRODUCTO
│   ├── 4.1 Jerarquía modular
│   │   ├── 4.1.1 Mano
│   │   ├── 4.1.2 Muñeca
│   │   ├── 4.1.3 Brazo
│   │   └── 4.1.4 Humanoide completo
│   ├── 4.2 Versiones (V1, V2)
│   ├── 4.3 Configuraciones
│   └── 4.4 Aplicaciones target
│       ├── 4.4.1 Industria
│       ├── 4.4.2 Medicina
│       ├── 4.4.3 Investigación
│       ├── 4.4.4 Prótesis
│       └── 4.4.5 Ensamblaje fino
│
├── 5. INGENIERIA_DE_LA_MANO
│   ├── 5.1 Estructura mecánica
│   │   ├── 5.1.1 Ensamblaje de dedos (Finger Assembly)
│   │   ├── 5.1.2 Estructura de palma (Palm Structure)
│   │   └── 5.1.3 Ensamblaje de muñeca (Wrist Assembly, 3-DOF)
│   ├── 5.2 Grados de libertad (20 DOF independientes)
│   ├── 5.3 Diseño anatómicamente preciso
│   ├── 5.4 Actuación por McKibben
│   │   ├── 5.4.1 Músculos McKibben (Braided pneumatic artificial muscles)
│   │   ├── 5.4.2 Suministro de aire (Compressor and valve manifold)
│   │   └── 5.4.3 Presión operativa (4 bar)
│   ├── 5.5 Sistema de tendones
│   │   └── 5.5.1 Relación músculo-tendón 1:1
│   └── 5.6 Sensores táctiles
│       ├── 5.6.1 14 sensores táctiles (dato de corpus principal)
│       └── 5.6.2 19 sensores donut-shaped por dedo (dato alternativo — ver SECCION 10)
│
├── 6. INGENIERIA_DEL_BRAZO
│   ├── 6.1 Grados de libertad (6 DOF, totalmente actuado)
│   ├── 6.2 Alcance (1m)
│   ├── 6.3 Capacidad de carga (15 kg)
│   └── 6.4 Integración brazo-mano
│
├── 7. SENSADO_ACTUACION_Y_CONTROL
│   ├── 7.1 Sensado táctil
│   │   └── 7.1.1 Real-time force feedback
│   ├── 7.2 Propiocepción
│   │   └── 7.2.1 Sin encoders articulares (inferido, estimación de estado)
│   ├── 7.3 Actuación neumática
│   │   └── 7.3.1 McKibben muscles a 4 bar
│   ├── 7.4 Fusión sensorial
│   │   └── 7.4.1 EWMA smoothing + multi-modal fusion
│   └── 7.5 Control primario por fuerzas/tensiones (no ángulos articulares)
│
├── 8. ESPECIFICACIONES_Y_DESEMPENO
│   ├── 8.1 Mano: 20 DOF, 14 sensores táctiles
│   ├── 8.2 Brazo: 6 DOF, 1m alcance, 15 kg carga
│   ├── 8.3 Réplica humana 1:1
│   └── 8.4 Métricas de desempeño (pendiente de validación)
│
├── 9. COSTOS_PRICING_Y_ESTRUCTURA_ECONOMICA
│   ├── 9.1 Brazo-mano: $5,000 USD (estimado)
│   ├── 9.2 Humanoide completo: $18,000 USD (estimado)
│   ├── 9.3 Desglose de costos
│   │   ├── 9.3.1 Brazos/manos: 28%
│   │   ├── 9.3.2 Piernas: 33%
│   │   ├── 9.3.3 Torso: 22%
│   │   ├── 9.3.4 Cabeza: 10%
│   │   └── 9.3.5 Otros: 7%
│   └── 9.4 Estatus: estimación conversada
│
├── 10. MERCADO_CLIENTES_Y_APLICACIONES
│   ├── 10.1 Industria manufacturera
│   ├── 10.2 Medicina / prótesis
│   ├── 10.3 Investigación académica
│   ├── 10.4 Ensamblaje fino
│   └── 10.5 Pilotos industriales (tracking en Supabase)
│
├── 11. BENCHMARKS_Y_COMPETENCIA
│   ├── 11.1 Shadow Hand
│   ├── 11.2 OpenAI Dactyl
│   ├── 11.3 JSK Lab (Universidad de Tokio)
│   ├── 11.4 UBTech Walker S2
│   ├── 11.5 Unitree G1
│   ├── 11.6 Tesla Optimus
│   ├── 11.7 Agility Digit
│   ├── 11.8 Ameca (Engineered Arts)
│   ├── 11.9 NAO (SoftBank/Aldebaran)
│   └── 11.10 Atlas (Boston Dynamics)
│
├── 12. DIFERENCIADORES_Y_PROPUESTA_DE_VALOR
│   ├── 12.1 Biomimético musculoesquelético (vs motores convencionales)
│   ├── 12.2 Control por fuerzas de tendones (no ángulos articulares)
│   ├── 12.3 Réplica 1:1 anatómica
│   ├── 12.4 Precio target competitivo ($5K brazo-mano)
│   └── 12.5 Doble narrativa técnica + filosófica
│
├── 13. BRANDING_NARRATIVA_Y_TONO
│   ├── 13.1 Tono: sobrio, académico, solemne
│   ├── 13.2 Raíces: latín, griego, hebreo bíblico
│   ├── 13.3 Narrativa: acto creador, génesis, cuerpo como templo
│   └── 13.4 Guía visual y estética
│
├── 14. DOCUMENTACION_Y_KNOWLEDGE_BASE
│   ├── 14.1 Ontología fundacional (este documento)
│   ├── 14.2 Documentación técnica de ingeniería
│   ├── 14.3 Documentación de control (M0-M9)
│   └── 14.4 Documentación de la aplicación HMI
│
├── 15. ROADMAP_VERSIONES_Y_EXPANSION
│   ├── 15.1 V1 (actual)
│   ├── 15.2 V2 (planificada)
│   ├── 15.3 Expansión: mano → muñeca → brazo → humanoide
│   └── 15.4 Control OS v3 (en desarrollo)
│
├── 16. COMUNIDAD_EDUCACION_Y_COLABORACIONES
│   ├── 16.1 Potencial académico
│   ├── 16.2 Pilotos industriales
│   └── 16.3 Colaboraciones de investigación
│
├── 17. RIESGOS_VALIDACIONES_Y_CLAIMS
│   ├── 17.1 Claims internos no validados
│   ├── 17.2 Benchmarks conversacionales (no rigurosos)
│   ├── 17.3 Riesgos técnicos
│   └── 17.4 Riesgos de mercado
│
├── 18. PREGUNTAS_ABIERTAS_Y_DATOS_FALTANTES
│   ├── 18.1 Sensores: 14 vs 19 vs zonas amplias
│   ├── 18.2 McKibben: ¿hidráulico o neumático?
│   ├── 18.3 Active Inference: estatus de validación
│   └── 18.4 Datos de desempeño medidos
│
├── 19. FUENTES_TRAZABILIDAD_Y_CONFIANZA
│   ├── 19.1 Corpus conversacional
│   ├── 19.2 Documentos de arquitectura (ARCHITECTURE.md, MIGRATION.md)
│   ├── 19.3 Código fuente (nodes.ts, types.ts, theme.ts)
│   └── 19.4 Niveles de confianza por fuente
│
├── 20. GOBERNANZA_DEL_DATO_Y_MANTENIMIENTO
│   ├── 20.1 Versionamiento
│   ├── 20.2 Proceso de actualización
│   └── 20.3 Roles de mantenimiento
│
├── 21. ARQUITECTURA_DE_CONTROL
│   ├── 21.1 M0 — Safety (1-5 kHz)
│   ├── 21.2 M1 — Pressure Servo (500-1000 Hz)
│   ├── 21.3 M2 — Tendon Force / Impedance (200-500 Hz)
│   ├── 21.4 M3 — Proprioception (100-300 Hz)
│   ├── 21.5 M4 — Vision (30 Hz)
│   ├── 21.6 M5 — Fusion (60-120 Hz)
│   ├── 21.7 M6 — Reflex (100-300 Hz)
│   ├── 21.8 M7 — Policy (10-30 Hz)
│   ├── 21.9 M8 — Language / Skills (0.5-5 Hz)
│   └── 21.10 M9 — Meta-Supervisor (0.1-1 Hz)
│
├── 22. ESTIMACION_DE_ESTADO_Y_FUSION
│   ├── 22.1 theta_hat (ángulo articular estimado)
│   ├── 22.2 omega_hat (velocidad angular estimada)
│   ├── 22.3 c_hat (contacto estimado)
│   ├── 22.4 T_obj_hat (par en objeto estimado)
│   ├── 22.5 w_hat (rigidez/peso del objeto estimado)
│   └── 22.6 EWMA smoothing
│
├── 23. SEGURIDAD_REFLEJOS_Y_LIMITES
│   ├── 23.1 M0 Safety Layer
│   ├── 23.2 M6 Reflex Layer
│   ├── 23.3 BUS LIMITS
│   └── 23.4 Emergency stop protocols
│
├── 24. GEMELO_DIGITAL_Y_DINAMICA
│   ├── 24.1 Modelo dinámico (pendiente de validación)
│   ├── 24.2 Simulación 3D (Three.js en Control OS)
│   └── 24.3 Parámetros del modelo
│
├── 25. POLITICAS_ACTIVE_INFERENCE_Y_SKILLS
│   ├── 25.1 Active Inference framework (hipótesis)
│   ├── 25.2 Jerarquía: sub-skill → skill → run
│   ├── 25.3 Categorías de skills
│   │   ├── 25.3.1 Arm
│   │   ├── 25.3.2 Grasp
│   │   ├── 25.3.3 Manipulation
│   │   ├── 25.3.4 Assembly
│   │   ├── 25.3.5 Sensing
│   │   ├── 25.3.6 Interaction
│   │   └── 25.3.7 Utility
│   └── 25.4 M7 Policy execution (10-30 Hz)
│
├── 26. SOFTWARE_TIEMPO_REAL_Y_COMPUTO
│   ├── 26.1 ROS 2 Jazzy
│   ├── 26.2 rosbridge WebSocket
│   ├── 26.3 Nodos de tiempo real
│   └── 26.4 Requisitos de cómputo
│
├── 27. SIMULACION_DATASET_Y_SIM_TO_REAL
│   ├── 27.1 Simulación (pendiente de validación)
│   ├── 27.2 Dataset collection
│   └── 27.3 Sim-to-real transfer
│
├── 28. APLICACION_DE_CONTROL_Y_HMI
│   ├── 28.1 DOGMA Control OS v1.0
│   ├── 28.2 Stack: React + RosBridge WebSocket
│   ├── 28.3 Roles: Operator, Engineer, Admin
│   └── 28.4 Páginas (13 pantallas — ver nodos 29-34)
│
├── 29. PRODUCTO_DIGITAL_Y_FLUJOS_DE_USUARIO
│   ├── 29.1 Command Center
│   ├── 29.2 Live View
│   ├── 29.3 Manual Control
│   ├── 29.4 Settings
│   └── 29.5 User flows por rol
│
├── 30. ROS_BRIDGE_Y_CONECTIVIDAD
│   ├── 30.1 rosbridge_server
│   ├── 30.2 WebSocket protocol
│   ├── 30.3 Topics y servicios
│   └── 30.4 Latencia y QoS
│
├── 31. SKILLS_RUNS_Y_AUTOMATIZACION
│   ├── 31.1 Skills Library (pantalla)
│   ├── 31.2 Run Builder (pantalla)
│   ├── 31.3 AI Planner (pantalla)
│   ├── 31.4 Arm Planner (pantalla)
│   └── 31.5 Ejecución automatizada
│
├── 32. TEACHING_TELEOP_Y_DEMONSTRATION_LEARNING
│   ├── 32.1 Teleop Mode (pantalla)
│   ├── 32.2 Glove / haptic teleoperation
│   └── 32.3 Demonstration learning
│
├── 33. DATOS_REPLAY_Y_EXPORTS
│   ├── 33.1 Data & Replay (pantalla)
│   ├── 33.2 Formatos de exportación
│   └── 33.3 Almacenamiento
│
└── 34. INTEGRACIONES_EMPRESARIALES_Y_ECOSISTEMA
    ├── 34.1 SAP S/4HANA
    ├── 34.2 MES/SCADA
    ├── 34.3 ROS 2 Ecosystem
    └── 34.4 Cloud / Analytics
```

---

# SECCION 3 — TABLA MAESTRA DE NODOS

## Convenciones de la tabla

- **node_id:** Identificador jerárquico (e.g., N01, N01.01, N01.01.01)
- **parent_id:** Nodo padre (null = raíz)
- **nivel:** L1 (primer nivel), L2 (subnodo), L3 (sub-subnodo)
- **tipo_de_entidad:** concepto | componente | especificación | módulo_de_control | pantalla_HMI | bus | señal | skill | integración | documento | proceso | persona | competidor | riesgo | pregunta
- **eje:** T (técnico), C (conceptual), T+C (ambos)
- **estatus:** confirmado | propuesto | en_desarrollo | planificado | pendiente_de_validación
- **confianza:** alta | media | baja

### Nodos L1 (34 nodos principales)

| node_id | parent_id | nivel | nombre_canonico | tipo_de_entidad | eje | estatus | confianza |
|---|---|---|---|---|---|---|---|
| N01 | null | L1 | IDENTIDAD_NUCLEAR | concepto | T+C | confirmado | alta |
| N02 | null | L1 | FILOSOFIA_Y_MARCO_CONCEPTUAL | concepto | C | confirmado | alta |
| N03 | null | L1 | NAMING_SEMANTICA_Y_LENGUAJE | concepto | C | confirmado | alta |
| N04 | null | L1 | ARQUITECTURA_DE_PRODUCTO | concepto | T+C | confirmado | alta |
| N05 | null | L1 | INGENIERIA_DE_LA_MANO | componente | T | confirmado | alta |
| N06 | null | L1 | INGENIERIA_DEL_BRAZO | componente | T | confirmado | alta |
| N07 | null | L1 | SENSADO_ACTUACION_Y_CONTROL | componente | T | confirmado | alta |
| N08 | null | L1 | ESPECIFICACIONES_Y_DESEMPENO | especificación | T | confirmado | media |
| N09 | null | L1 | COSTOS_PRICING_Y_ESTRUCTURA_ECONOMICA | especificación | T | estimado | baja |
| N10 | null | L1 | MERCADO_CLIENTES_Y_APLICACIONES | concepto | T+C | confirmado | media |
| N11 | null | L1 | BENCHMARKS_Y_COMPETENCIA | concepto | T | benchmark_conv | baja |
| N12 | null | L1 | DIFERENCIADORES_Y_PROPUESTA_DE_VALOR | concepto | T+C | confirmado | media |
| N13 | null | L1 | BRANDING_NARRATIVA_Y_TONO | concepto | C | confirmado | alta |
| N14 | null | L1 | DOCUMENTACION_Y_KNOWLEDGE_BASE | documento | T+C | en_desarrollo | media |
| N15 | null | L1 | ROADMAP_VERSIONES_Y_EXPANSION | proceso | T+C | confirmado | media |
| N16 | null | L1 | COMUNIDAD_EDUCACION_Y_COLABORACIONES | concepto | T+C | planificado | baja |
| N17 | null | L1 | RIESGOS_VALIDACIONES_Y_CLAIMS | riesgo | T+C | confirmado | media |
| N18 | null | L1 | PREGUNTAS_ABIERTAS_Y_DATOS_FALTANTES | pregunta | T+C | confirmado | alta |
| N19 | null | L1 | FUENTES_TRAZABILIDAD_Y_CONFIANZA | documento | T+C | confirmado | alta |
| N20 | null | L1 | GOBERNANZA_DEL_DATO_Y_MANTENIMIENTO | proceso | T+C | propuesto | media |
| N21 | null | L1 | ARQUITECTURA_DE_CONTROL | módulo_de_control | T | confirmado | alta |
| N22 | null | L1 | ESTIMACION_DE_ESTADO_Y_FUSION | módulo_de_control | T | confirmado | media |
| N23 | null | L1 | SEGURIDAD_REFLEJOS_Y_LIMITES | módulo_de_control | T | confirmado | alta |
| N24 | null | L1 | GEMELO_DIGITAL_Y_DINAMICA | módulo_de_control | T | propuesto | baja |
| N25 | null | L1 | POLITICAS_ACTIVE_INFERENCE_Y_SKILLS | módulo_de_control | T | hipótesis | baja |
| N26 | null | L1 | SOFTWARE_TIEMPO_REAL_Y_COMPUTO | componente | T | confirmado | media |
| N27 | null | L1 | SIMULACION_DATASET_Y_SIM_TO_REAL | proceso | T | planificado | baja |
| N28 | null | L1 | APLICACION_DE_CONTROL_Y_HMI | pantalla_HMI | T | en_desarrollo | alta |
| N29 | null | L1 | PRODUCTO_DIGITAL_Y_FLUJOS_DE_USUARIO | pantalla_HMI | T | en_desarrollo | media |
| N30 | null | L1 | ROS_BRIDGE_Y_CONECTIVIDAD | componente | T | confirmado | media |
| N31 | null | L1 | SKILLS_RUNS_Y_AUTOMATIZACION | pantalla_HMI | T | confirmado | media |
| N32 | null | L1 | TEACHING_TELEOP_Y_DEMONSTRATION_LEARNING | pantalla_HMI | T | confirmado | media |
| N33 | null | L1 | DATOS_REPLAY_Y_EXPORTS | pantalla_HMI | T | confirmado | media |
| N34 | null | L1 | INTEGRACIONES_EMPRESARIALES_Y_ECOSISTEMA | integración | T | confirmado | media |

### Nodos L2 — Identidad, Filosofía, Naming, Producto (N01–N04)

| node_id | parent_id | nivel | nombre_canonico | tipo_de_entidad | eje | estatus | confianza |
|---|---|---|---|---|---|---|---|
| N01.01 | N01 | L2 | Nombre del proyecto | concepto | T+C | confirmado | alta |
| N01.02 | N01 | L2 | Definición nuclear | concepto | T+C | confirmado | alta |
| N01.03 | N01 | L2 | Misión y visión | concepto | C | confirmado | media |
| N01.04 | N01 | L2 | Naturaleza dual | concepto | T+C | confirmado | alta |
| N01.05 | N01 | L2 | Principios fundacionales | concepto | T+C | confirmado | alta |
| N02.01 | N02 | L2 | Tesis fundacional | concepto | C | confirmado | alta |
| N02.02 | N02 | L2 | Integración ciencia-arte-filosofía | concepto | C | confirmado | alta |
| N02.03 | N02 | L2 | Narrativa bíblica/simbólica | concepto | C | confirmado | alta |
| N02.04 | N02 | L2 | Tono sobrio y académico | concepto | C | confirmado | alta |
| N03.01 | N03 | L2 | Sistema de doble naming | concepto | C | confirmado | alta |
| N03.02 | N03 | L2 | Catálogo de nombres | concepto | C | confirmado | alta |
| N03.03 | N03 | L2 | Raíces etimológicas | concepto | C | confirmado | alta |
| N03.04 | N03 | L2 | Guía de uso del lenguaje | documento | C | inferido | media |
| N04.01 | N04 | L2 | Jerarquía modular | concepto | T | confirmado | alta |
| N04.02 | N04 | L2 | Versiones V1/V2 | proceso | T | confirmado | media |
| N04.03 | N04 | L2 | Configuraciones | concepto | T | inferido | media |
| N04.04 | N04 | L2 | Aplicaciones target | concepto | T+C | confirmado | alta |

### Nodos L2 — Ingeniería y Especificaciones (N05–N08)

| node_id | parent_id | nivel | nombre_canonico | tipo_de_entidad | eje | estatus | confianza |
|---|---|---|---|---|---|---|---|
| N05.01 | N05 | L2 | Estructura mecánica de la mano | componente | T | confirmado | alta |
| N05.02 | N05 | L2 | Grados de libertad mano (20 DOF) | especificación | T | confirmado | alta |
| N05.03 | N05 | L2 | Diseño anatómicamente preciso | concepto | T | confirmado | alta |
| N05.04 | N05 | L2 | Actuación por McKibben | componente | T | confirmado | alta |
| N05.05 | N05 | L2 | Sistema de tendones | componente | T | confirmado | alta |
| N05.06 | N05 | L2 | Sensores táctiles mano | componente | T | confirmado | media |
| N06.01 | N06 | L2 | DOF brazo (6 DOF) | especificación | T | confirmado | alta |
| N06.02 | N06 | L2 | Alcance (1m) | especificación | T | confirmado | alta |
| N06.03 | N06 | L2 | Carga (15 kg) | especificación | T | confirmado | alta |
| N06.04 | N06 | L2 | Integración brazo-mano | componente | T | confirmado | media |
| N07.01 | N07 | L2 | Sensado táctil | componente | T | confirmado | alta |
| N07.02 | N07 | L2 | Propiocepción | componente | T | confirmado | media |
| N07.03 | N07 | L2 | Actuación neumática | componente | T | confirmado | alta |
| N07.04 | N07 | L2 | Fusión sensorial | componente | T | confirmado | media |
| N07.05 | N07 | L2 | Control primario por fuerzas | concepto | T | confirmado | alta |
| N08.01 | N08 | L2 | Especificaciones de la mano | especificación | T | confirmado | alta |
| N08.02 | N08 | L2 | Especificaciones del brazo | especificación | T | confirmado | alta |
| N08.03 | N08 | L2 | Réplica humana 1:1 | especificación | T | confirmado | alta |
| N08.04 | N08 | L2 | Métricas de desempeño | especificación | T | pendiente_de_validación | baja |

### Nodos L2 — Economía, Mercado, Competencia (N09–N12)

| node_id | parent_id | nivel | nombre_canonico | tipo_de_entidad | eje | estatus | confianza |
|---|---|---|---|---|---|---|---|
| N09.01 | N09 | L2 | Precio brazo-mano ($5K USD) | especificación | T | estimado | baja |
| N09.02 | N09 | L2 | Precio humanoide ($18K USD) | especificación | T | estimado | baja |
| N09.03 | N09 | L2 | Desglose de costos | especificación | T | estimado | baja |
| N09.04 | N09 | L2 | Estatus de pricing | proceso | T | estimación_conversada | baja |
| N10.01 | N10 | L2 | Industria manufacturera | concepto | T | confirmado | media |
| N10.02 | N10 | L2 | Medicina / prótesis | concepto | T | confirmado | media |
| N10.03 | N10 | L2 | Investigación académica | concepto | T | confirmado | media |
| N10.04 | N10 | L2 | Ensamblaje fino | concepto | T | confirmado | media |
| N10.05 | N10 | L2 | Pilotos industriales | proceso | T | en_desarrollo | media |
| N11.01 | N11 | L2 | Shadow Hand | competidor | T | benchmark_conv | baja |
| N11.02 | N11 | L2 | OpenAI Dactyl | competidor | T | benchmark_conv | baja |
| N11.03 | N11 | L2 | JSK Lab | competidor | T | benchmark_conv | baja |
| N11.04 | N11 | L2 | UBTech Walker S2 | competidor | T | benchmark_conv | baja |
| N11.05 | N11 | L2 | Unitree G1 | competidor | T | benchmark_conv | baja |
| N11.06 | N11 | L2 | Tesla Optimus | competidor | T | benchmark_conv | baja |
| N11.07 | N11 | L2 | Agility Digit | competidor | T | benchmark_conv | baja |
| N11.08 | N11 | L2 | Ameca | competidor | T | benchmark_conv | baja |
| N11.09 | N11 | L2 | NAO | competidor | T | benchmark_conv | baja |
| N11.10 | N11 | L2 | Atlas (Boston Dynamics) | competidor | T | benchmark_conv | baja |
| N12.01 | N12 | L2 | Biomimético musculoesquelético | concepto | T | confirmado | alta |
| N12.02 | N12 | L2 | Control por fuerzas de tendones | concepto | T | confirmado | alta |
| N12.03 | N12 | L2 | Réplica 1:1 anatómica | concepto | T | confirmado | alta |
| N12.04 | N12 | L2 | Precio competitivo | concepto | T | estimado | baja |
| N12.05 | N12 | L2 | Doble narrativa técnica-filosófica | concepto | T+C | confirmado | alta |

### Nodos L2 — Branding, Docs, Roadmap, Comunidad (N13–N16)

| node_id | parent_id | nivel | nombre_canonico | tipo_de_entidad | eje | estatus | confianza |
|---|---|---|---|---|---|---|---|
| N13.01 | N13 | L2 | Tono sobrio académico | concepto | C | confirmado | alta |
| N13.02 | N13 | L2 | Raíces latín-griego-hebreo | concepto | C | confirmado | alta |
| N13.03 | N13 | L2 | Narrativa de génesis y creación | concepto | C | confirmado | alta |
| N13.04 | N13 | L2 | Guía visual y estética | documento | C | inferido | media |
| N14.01 | N14 | L2 | Ontología fundacional | documento | T+C | en_desarrollo | alta |
| N14.02 | N14 | L2 | Documentación técnica | documento | T | en_desarrollo | media |
| N14.03 | N14 | L2 | Documentación de control M0-M9 | documento | T | en_desarrollo | media |
| N14.04 | N14 | L2 | Documentación HMI | documento | T | en_desarrollo | media |
| N15.01 | N15 | L2 | V1 actual | proceso | T | confirmado | alta |
| N15.02 | N15 | L2 | V2 planificada | proceso | T | planificado | media |
| N15.03 | N15 | L2 | Expansión modular | proceso | T | confirmado | alta |
| N15.04 | N15 | L2 | Control OS v3 | proceso | T | en_desarrollo | alta |
| N16.01 | N16 | L2 | Potencial académico | concepto | T | planificado | baja |
| N16.02 | N16 | L2 | Pilotos industriales | proceso | T | en_desarrollo | media |
| N16.03 | N16 | L2 | Colaboraciones de investigación | concepto | T | planificado | baja |

### Nodos L2 — Riesgos, Preguntas, Fuentes, Gobernanza (N17–N20)

| node_id | parent_id | nivel | nombre_canonico | tipo_de_entidad | eje | estatus | confianza |
|---|---|---|---|---|---|---|---|
| N17.01 | N17 | L2 | Claims internos no validados | riesgo | T | confirmado | alta |
| N17.02 | N17 | L2 | Benchmarks conversacionales | riesgo | T | confirmado | alta |
| N17.03 | N17 | L2 | Riesgos técnicos | riesgo | T | confirmado | media |
| N17.04 | N17 | L2 | Riesgos de mercado | riesgo | T | inferido | media |
| N18.01 | N18 | L2 | Conflicto sensores 14 vs 19 | pregunta | T | confirmado | alta |
| N18.02 | N18 | L2 | McKibben hidráulico vs neumático | pregunta | T | confirmado | alta |
| N18.03 | N18 | L2 | Active Inference validación | pregunta | T | confirmado | alta |
| N18.04 | N18 | L2 | Datos de desempeño medidos | pregunta | T | confirmado | alta |
| N19.01 | N19 | L2 | Corpus conversacional | documento | T+C | confirmado | alta |
| N19.02 | N19 | L2 | Documentos de arquitectura | documento | T | confirmado | alta |
| N19.03 | N19 | L2 | Código fuente | documento | T | confirmado | alta |
| N19.04 | N19 | L2 | Niveles de confianza | proceso | T+C | confirmado | alta |
| N20.01 | N20 | L2 | Versionamiento | proceso | T+C | propuesto | media |
| N20.02 | N20 | L2 | Proceso de actualización | proceso | T+C | propuesto | media |
| N20.03 | N20 | L2 | Roles de mantenimiento | proceso | T+C | propuesto | baja |

### Nodos L2 — Arquitectura de Control y Estimación (N21–N23)

| node_id | parent_id | nivel | nombre_canonico | tipo_de_entidad | eje | estatus | confianza |
|---|---|---|---|---|---|---|---|
| N21.01 | N21 | L2 | M0 Safety | módulo_de_control | T | confirmado | alta |
| N21.02 | N21 | L2 | M1 Pressure Servo | módulo_de_control | T | confirmado | alta |
| N21.03 | N21 | L2 | M2 Tendon Force/Impedance | módulo_de_control | T | confirmado | alta |
| N21.04 | N21 | L2 | M3 Proprioception | módulo_de_control | T | confirmado | alta |
| N21.05 | N21 | L2 | M4 Vision | módulo_de_control | T | confirmado | alta |
| N21.06 | N21 | L2 | M5 Fusion | módulo_de_control | T | confirmado | alta |
| N21.07 | N21 | L2 | M6 Reflex | módulo_de_control | T | confirmado | alta |
| N21.08 | N21 | L2 | M7 Policy | módulo_de_control | T | confirmado | alta |
| N21.09 | N21 | L2 | M8 Language/Skills | módulo_de_control | T | confirmado | alta |
| N21.10 | N21 | L2 | M9 Meta-Supervisor | módulo_de_control | T | confirmado | alta |
| N22.01 | N22 | L2 | theta_hat (ángulo estimado) | señal | T | confirmado | alta |
| N22.02 | N22 | L2 | omega_hat (velocidad estimada) | señal | T | confirmado | alta |
| N22.03 | N22 | L2 | c_hat (contacto estimado) | señal | T | confirmado | alta |
| N22.04 | N22 | L2 | T_obj_hat (par en objeto) | señal | T | confirmado | alta |
| N22.05 | N22 | L2 | w_hat (rigidez/peso objeto) | señal | T | confirmado | alta |
| N22.06 | N22 | L2 | EWMA smoothing | proceso | T | confirmado | media |
| N23.01 | N23 | L2 | M0 Safety Layer | módulo_de_control | T | confirmado | alta |
| N23.02 | N23 | L2 | M6 Reflex Layer | módulo_de_control | T | confirmado | alta |
| N23.03 | N23 | L2 | BUS LIMITS | bus | T | confirmado | alta |
| N23.04 | N23 | L2 | Emergency stop protocols | proceso | T | inferido | media |

### Nodos L2 — Gemelo Digital, Policies, Software RT, Simulación (N24–N27)

| node_id | parent_id | nivel | nombre_canonico | tipo_de_entidad | eje | estatus | confianza |
|---|---|---|---|---|---|---|---|
| N24.01 | N24 | L2 | Modelo dinámico | componente | T | pendiente_de_validación | baja |
| N24.02 | N24 | L2 | Simulación 3D Three.js | componente | T | en_desarrollo | media |
| N24.03 | N24 | L2 | Parámetros del modelo | especificación | T | pendiente_de_validación | baja |
| N25.01 | N25 | L2 | Active Inference framework | concepto | T | hipótesis | baja |
| N25.02 | N25 | L2 | Jerarquía sub-skill/skill/run | concepto | T | confirmado | alta |
| N25.03 | N25 | L2 | Categorías de skills | concepto | T | confirmado | alta |
| N25.04 | N25 | L2 | M7 Policy execution | módulo_de_control | T | confirmado | alta |
| N26.01 | N26 | L2 | ROS 2 Jazzy | componente | T | confirmado | alta |
| N26.02 | N26 | L2 | rosbridge WebSocket | componente | T | confirmado | alta |
| N26.03 | N26 | L2 | Nodos de tiempo real | componente | T | confirmado | media |
| N26.04 | N26 | L2 | Requisitos de cómputo | especificación | T | inferido | baja |
| N27.01 | N27 | L2 | Simulación | proceso | T | planificado | baja |
| N27.02 | N27 | L2 | Dataset collection | proceso | T | planificado | baja |
| N27.03 | N27 | L2 | Sim-to-real transfer | proceso | T | planificado | baja |

### Nodos L2 — Aplicación HMI y Producto Digital (N28–N34)

| node_id | parent_id | nivel | nombre_canonico | tipo_de_entidad | eje | estatus | confianza |
|---|---|---|---|---|---|---|---|
| N28.01 | N28 | L2 | DOGMA Control OS v1.0 | componente | T | en_desarrollo | alta |
| N28.02 | N28 | L2 | Stack React + RosBridge | componente | T | confirmado | alta |
| N28.03 | N28 | L2 | Roles (Operator/Engineer/Admin) | concepto | T | confirmado | alta |
| N28.04 | N28 | L2 | 13 pantallas funcionales | pantalla_HMI | T | confirmado | alta |
| N29.01 | N29 | L2 | Command Center | pantalla_HMI | T | confirmado | alta |
| N29.02 | N29 | L2 | Live View | pantalla_HMI | T | confirmado | alta |
| N29.03 | N29 | L2 | Manual Control | pantalla_HMI | T | confirmado | alta |
| N29.04 | N29 | L2 | Settings | pantalla_HMI | T | confirmado | alta |
| N29.05 | N29 | L2 | User flows por rol | documento | T | inferido | media |
| N30.01 | N30 | L2 | rosbridge_server | componente | T | confirmado | alta |
| N30.02 | N30 | L2 | WebSocket protocol | componente | T | confirmado | alta |
| N30.03 | N30 | L2 | Topics y servicios ROS | componente | T | confirmado | media |
| N30.04 | N30 | L2 | Latencia y QoS | especificación | T | inferido | baja |
| N31.01 | N31 | L2 | Skills Library (pantalla) | pantalla_HMI | T | confirmado | alta |
| N31.02 | N31 | L2 | Run Builder (pantalla) | pantalla_HMI | T | confirmado | alta |
| N31.03 | N31 | L2 | AI Planner (pantalla) | pantalla_HMI | T | confirmado | alta |
| N31.04 | N31 | L2 | Arm Planner (pantalla) | pantalla_HMI | T | confirmado | alta |
| N31.05 | N31 | L2 | Ejecución automatizada | proceso | T | confirmado | media |
| N32.01 | N32 | L2 | Teleop Mode (pantalla) | pantalla_HMI | T | confirmado | alta |
| N32.02 | N32 | L2 | Glove/haptic teleoperation | componente | T | confirmado | media |
| N32.03 | N32 | L2 | Demonstration learning | proceso | T | confirmado | media |
| N33.01 | N33 | L2 | Data & Replay (pantalla) | pantalla_HMI | T | confirmado | alta |
| N33.02 | N33 | L2 | Formatos de exportación | especificación | T | inferido | baja |
| N33.03 | N33 | L2 | Almacenamiento | componente | T | inferido | baja |
| N34.01 | N34 | L2 | SAP S/4HANA | integración | T | confirmado | media |
| N34.02 | N34 | L2 | MES/SCADA | integración | T | confirmado | media |
| N34.03 | N34 | L2 | ROS 2 Ecosystem | integración | T | confirmado | alta |
| N34.04 | N34 | L2 | Cloud/Analytics | integración | T | confirmado | media |

### Nodos L3 — Sub-subnodos clave

| node_id | parent_id | nivel | nombre_canonico | tipo_de_entidad | eje | estatus | confianza |
|---|---|---|---|---|---|---|---|
| N02.01.01 | N02.01 | L3 | Secuencia músculo→hueso→movimiento→acción | concepto | C | confirmado | alta |
| N02.01.02 | N02.01 | L3 | Acto creador / génesis | concepto | C | confirmado | alta |
| N03.01.01 | N03.01 | L3 | Nombre conceptual | concepto | C | confirmado | alta |
| N03.01.02 | N03.01 | L3 | Descriptor técnico | concepto | C | confirmado | alta |
| N03.02.01 | N03.02 | L3 | DOGMA Genesis — Facsimile Humanum | concepto | C | candidato | alta |
| N03.02.02 | N03.02 | L3 | DOGMA Dextera — Biomimetic Hand V1 | concepto | C | candidato | alta |
| N03.02.03 | N03.02 | L3 | DOGMA Ruach — Actuated Hand System | concepto | C | candidato | alta |
| N03.02.04 | N03.02 | L3 | DOGMA Logos | concepto | C | candidato | media |
| N03.02.05 | N03.02 | L3 | DOGMA Adama | concepto | C | candidato | media |
| N03.02.06 | N03.02 | L3 | DOGMA Manus Dei | concepto | C | candidato | media |
| N04.01.01 | N04.01 | L3 | Mano (módulo base) | componente | T | confirmado | alta |
| N04.01.02 | N04.01 | L3 | Muñeca | componente | T | confirmado | alta |
| N04.01.03 | N04.01 | L3 | Brazo | componente | T | confirmado | alta |
| N04.01.04 | N04.01 | L3 | Humanoide completo | componente | T | planificado | media |
| N04.04.01 | N04.04 | L3 | Industria | concepto | T | confirmado | alta |
| N04.04.02 | N04.04 | L3 | Medicina | concepto | T | confirmado | alta |
| N04.04.03 | N04.04 | L3 | Investigación | concepto | T | confirmado | alta |
| N04.04.04 | N04.04 | L3 | Prótesis | concepto | T | confirmado | alta |
| N04.04.05 | N04.04 | L3 | Ensamblaje fino | concepto | T | confirmado | alta |
| N05.01.01 | N05.01 | L3 | Finger Assembly | componente | T | confirmado | alta |
| N05.01.02 | N05.01 | L3 | Palm Structure | componente | T | confirmado | alta |
| N05.01.03 | N05.01 | L3 | Wrist Assembly (3-DOF) | componente | T | confirmado | alta |
| N05.04.01 | N05.04 | L3 | McKibben Muscles (braided pneumatic) | componente | T | confirmado | alta |
| N05.04.02 | N05.04 | L3 | Air Supply (compressor + valve manifold) | componente | T | confirmado | alta |
| N05.04.03 | N05.04 | L3 | Presión operativa 4 bar | especificación | T | confirmado | alta |
| N05.05.01 | N05.05 | L3 | Relación músculo-tendón 1:1 | especificación | T | confirmado | alta |
| N05.06.01 | N05.06 | L3 | 14 sensores táctiles (corpus principal) | especificación | T | confirmado | media |
| N05.06.02 | N05.06 | L3 | 19 donut-shaped por dedo (dato alternativo) | especificación | T | conflicto_de_versión | baja |
| N07.04.01 | N07.04 | L3 | EWMA smoothing | proceso | T | confirmado | media |
| N07.04.02 | N07.04 | L3 | Multi-modal fusion | proceso | T | confirmado | media |
| N09.03.01 | N09.03 | L3 | Brazos/manos 28% | especificación | T | estimado | baja |
| N09.03.02 | N09.03 | L3 | Piernas 33% | especificación | T | estimado | baja |
| N09.03.03 | N09.03 | L3 | Torso 22% | especificación | T | estimado | baja |
| N09.03.04 | N09.03 | L3 | Cabeza 10% | especificación | T | estimado | baja |
| N09.03.05 | N09.03 | L3 | Otros 7% | especificación | T | estimado | baja |
| N25.03.01 | N25.03 | L3 | Arm skills | skill | T | confirmado | alta |
| N25.03.02 | N25.03 | L3 | Grasp skills | skill | T | confirmado | alta |
| N25.03.03 | N25.03 | L3 | Manipulation skills | skill | T | confirmado | alta |
| N25.03.04 | N25.03 | L3 | Assembly skills | skill | T | confirmado | alta |
| N25.03.05 | N25.03 | L3 | Sensing skills | skill | T | confirmado | alta |
| N25.03.06 | N25.03 | L3 | Interaction skills | skill | T | confirmado | alta |
| N25.03.07 | N25.03 | L3 | Utility skills | skill | T | confirmado | alta |

**Total de nodos catalogados: 34 L1 + 115 L2 + 42 L3 = 191 nodos**

---

# SECCION 4 — DESARROLLO DETALLADO POR NODO

## N01 — IDENTIDAD_NUCLEAR

| Campo | Valor |
|---|---|
| **nombre_canonico** | IDENTIDAD_NUCLEAR |
| **aliases** | Identidad del proyecto, Core Identity, DOGMA Identity |
| **descripcion_breve** | Nodo raíz que define qué es DOGMA como proyecto, empresa y sistema. |
| **descripcion_extensa** | DOGMA es un proyecto centrado en manos humanoides biomiméticas, musculoesqueléticas y sensadas. Réplica humana 1:1. El proyecto posee una doble naturaleza inseparable: un eje técnico/robótico de ingeniería avanzada y un eje conceptual/filosófico de narrativa, estética y naming con raíces latinas, griegas y bíblicas. DOGMA no es solo un producto; es una tesis sobre el cuerpo, el movimiento y la creación. |
| **datos_cuantitativos** | Mano: 20 DOF, 14 sensores táctiles. Brazo: 6 DOF, 1m alcance, 15 kg carga. Precio target brazo-mano: $5,000 USD (estimado). |
| **datos_cualitativos** | Biomimético musculoesquelético, control por fuerzas de tendones, réplica 1:1, doble naming, narrativa de génesis. |
| **estatus** | confirmado |
| **confianza** | alta |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección IDENTIDAD GENERAL |
| **relaciones** | es_parte_de: DOGMA (raíz); habilita: todos los demás nodos; integra: N02 (Filosofía), N03 (Naming), N04 (Producto) |
| **preguntas_abiertas** | Falta formalización de la misión y visión como declaraciones separadas. El corpus las implica pero no las declara textualmente. |

---

## N02 — FILOSOFIA_Y_MARCO_CONCEPTUAL

| Campo | Valor |
|---|---|
| **nombre_canonico** | FILOSOFIA_Y_MARCO_CONCEPTUAL |
| **aliases** | Filosofía DOGMA, Marco conceptual, Tesis fundacional |
| **descripcion_breve** | Marco filosófico que define la dimensión conceptual y narrativa de DOGMA. |
| **descripcion_extensa** | DOGMA se fundamenta en una tesis que parte de la secuencia lógica: músculo → hueso → movimiento → acción. El proyecto integra ciencia, arte, filosofía y narrativa bíblica/simbólica. El acto de construir una mano es concebido como un acto creador, una génesis. El tono es sobrio y académico, evitando el hype tecnológico. La dimensión filosófica no es decorativa; es constitutiva del proyecto y guía decisiones de naming, diseño, comunicación y posicionamiento. |
| **datos_cuantitativos** | N/A — nodo puramente conceptual |
| **datos_cualitativos** | Lógica fundacional: músculo → hueso → movimiento → acción. Integración ciencia-arte-filosofía. Narrativa bíblica/simbólica con tono sobrio y académico. |
| **estatus** | confirmado |
| **confianza** | alta |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección FILOSOFÍA Y TESIS |
| **relaciones** | es_parte_de: N01 (Identidad); habilita: N03 (Naming), N13 (Branding); fundamenta: N12 (Diferenciadores) |
| **preguntas_abiertas** | ¿Existe un documento formal de la tesis filosófica o solo es implícita en las conversaciones? |

---

## N03 — NAMING_SEMANTICA_Y_LENGUAJE

| Campo | Valor |
|---|---|
| **nombre_canonico** | NAMING_SEMANTICA_Y_LENGUAJE |
| **aliases** | Sistema de naming, Semántica DOGMA, Naming conceptual-técnico |
| **descripcion_breve** | Sistema dual de naming que combina nombre conceptual y descriptor técnico. |
| **descripcion_extensa** | DOGMA utiliza un sistema de doble naming donde cada producto/versión tiene un nombre conceptual (con raíces latinas, griegas o bíblicas) y un descriptor técnico funcional. Ejemplos confirmados en el corpus: DOGMA Genesis — Facsimile Humanum, DOGMA Dextera — Biomimetic Hand V1, DOGMA Ruach — Actuated Hand System. Nombres conceptuales adicionales: Logos, Adama, Manus Dei. Las raíces etimológicas son latín (Dextera = mano derecha, Manus Dei = mano de Dios), griego (Logos = palabra/razón), y hebreo bíblico (Ruach = espíritu/aliento, Adama = tierra/barro). |
| **datos_cuantitativos** | 6 nombres conceptuales catalogados. 3 combinaciones nombre+descriptor confirmadas. |
| **datos_cualitativos** | Sistema de doble naming único en la industria robótica. Raíces latinas, griegas, hebreo bíblico. Tono solemne y académico. |
| **estatus** | confirmado (sistema) / candidato (nombres individuales) |
| **confianza** | alta (sistema) / media (nombres individuales — pueden cambiar) |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección MARCA / NAMING |
| **relaciones** | es_parte_de: N01 (Identidad); depende_de: N02 (Filosofía); habilita: N13 (Branding) |
| **preguntas_abiertas** | ¿Cuáles nombres son finales y cuáles son candidatos? ¿Existe un registry formal de nombres reservados? ¿Qué nombre corresponde a qué versión/producto? |

---

## N04 — ARQUITECTURA_DE_PRODUCTO

| Campo | Valor |
|---|---|
| **nombre_canonico** | ARQUITECTURA_DE_PRODUCTO |
| **aliases** | Product Architecture, Arquitectura modular, Sistema modular DOGMA |
| **descripcion_breve** | Jerarquía modular del producto: mano → muñeca → brazo → humanoide completo. |
| **descripcion_extensa** | DOGMA sigue una arquitectura modular donde la mano es la unidad base que se compone con la muñeca, luego el brazo, y eventualmente el humanoide completo. Se contemplan versiones V1 y V2. Las aplicaciones target son: industria, medicina, investigación, prótesis y ensamblaje fino. La modularidad permite que cada nivel pueda venderse y operar de forma independiente. |
| **datos_cuantitativos** | 2 versiones (V1, V2). 5 aplicaciones target. 4 niveles de composición modular. |
| **datos_cualitativos** | Modular, escalable, cada nivel es autónomo pero componible. |
| **estatus** | confirmado |
| **confianza** | alta |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección ARQUITECTURA MODULAR |
| **relaciones** | es_parte_de: N01 (Identidad); habilita: N05 (Mano), N06 (Brazo); limita: N09 (Costos — determina desglose) |
| **preguntas_abiertas** | ¿V2 tiene cambios en la arquitectura modular o solo mejoras internas? ¿La muñeca se vende por separado? |

---

## N05 — INGENIERIA_DE_LA_MANO

| Campo | Valor |
|---|---|
| **nombre_canonico** | INGENIERIA_DE_LA_MANO |
| **aliases** | Hand Engineering, Mano biomimética, DOGMA Hand, Hand Mechanism |
| **descripcion_breve** | Ingeniería mecánica, actuación y sensado de la mano biomimética DOGMA. |
| **descripcion_extensa** | La mano DOGMA es una estructura biomimética musculoesquelética con 20 DOF independientes, diseño anatómicamente preciso a escala 1:1 humana. La actuación se realiza mediante músculos McKibben (braided pneumatic artificial muscles) operando a 4 bar de presión. El sistema de tendones tiene una relación músculo-tendón 1:1, lo cual significa que cada músculo McKibben acciona un único tendón. La estructura incluye: ensamblaje de dedos (Finger Assembly) con módulos McKibben por dedo, estructura de palma rígida con montaje de sensores (Palm Structure), y ensamblaje de muñeca de 3-DOF (Wrist Assembly). Sensores táctiles proveen real-time force feedback. El número de sensores tiene un conflicto de versión en el corpus (ver SECCION 10). El control primario es por fuerzas/tensiones de tendones, NO por ángulos articulares. No hay encoders articulares; la estimación de estado se hace computacionalmente. |
| **datos_cuantitativos** | 20 DOF independientes. 14 sensores táctiles (corpus principal) / 19 donut-shaped por dedo (dato alternativo). McKibben a 4 bar. Relación músculo-tendón 1:1. Muñeca 3-DOF. |
| **datos_cualitativos** | Biomimético, anatómicamente preciso, réplica 1:1, control por fuerzas de tendones, sin encoders. |
| **estatus** | confirmado |
| **confianza** | alta (estructura) / media (cantidad exacta de sensores) |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — secciones ESPECIFICACIONES TÉCNICAS, ARQUITECTURA DE CONTROL; nodes.ts — subsystems tree |
| **relaciones** | es_parte_de: N04 (Producto); contiene: N05.01–N05.06 (subnodos); depende_de: N07 (Sensado/Actuación); alimenta: N21 (Control M0-M9); limita: N08 (Especificaciones) |
| **preguntas_abiertas** | ¿Cuántos sensores exactamente? ¿El diseño anatómico ha sido validado por médicos/anatomistas? ¿Material de los huesos artificiales? ¿Peso total de la mano? |

---

## N06 — INGENIERIA_DEL_BRAZO

| Campo | Valor |
|---|---|
| **nombre_canonico** | INGENIERIA_DEL_BRAZO |
| **aliases** | Arm Engineering, Brazo DOGMA, Arm System |
| **descripcion_breve** | Brazo robótico de 6 DOF, totalmente actuado, 1m de alcance y 15 kg de carga. |
| **descripcion_extensa** | El brazo DOGMA es un sistema de 6 grados de libertad completamente actuado con un alcance de 1 metro y capacidad de carga de 15 kg. Se integra con la mano biomimética para formar el conjunto brazo-mano que representa la unidad comercial principal ($5,000 USD estimado). El corpus no detalla el tipo de actuación del brazo (si es McKibben como la mano o motores convencionales). |
| **datos_cuantitativos** | 6 DOF. Alcance: 1m. Carga: 15 kg. Totalmente actuado. |
| **datos_cualitativos** | Integración con mano biomimética. Unidad comercial brazo-mano. |
| **estatus** | confirmado |
| **confianza** | alta (especificaciones generales) / baja (detalles de implementación) |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección ESPECIFICACIONES TÉCNICAS |
| **relaciones** | es_parte_de: N04 (Producto); integra: N05 (Mano); alimenta: N08 (Especificaciones); habilita: N31.04 (Arm Planner) |
| **preguntas_abiertas** | ¿El brazo usa McKibben o motores eléctricos? ¿Peso del brazo? ¿Materiales? ¿Velocidad máxima de movimiento? ¿Torque por articulación? |

---

## N07 — SENSADO_ACTUACION_Y_CONTROL

| Campo | Valor |
|---|---|
| **nombre_canonico** | SENSADO_ACTUACION_Y_CONTROL |
| **aliases** | Sensing & Actuation, Sistema sensorial y de actuación |
| **descripcion_breve** | Sistemas de sensado táctil, propiocepción, actuación neumática y fusión sensorial. |
| **descripcion_extensa** | DOGMA integra múltiples modalidades de sensado: sensores táctiles (force feedback en tiempo real), propiocepción (sin encoders articulares — estado estimado computacionalmente), y actuación neumática mediante músculos McKibben a 4 bar. La fusión sensorial combina EWMA smoothing con fusión multi-modal. El principio fundamental de control es por fuerzas y tensiones de tendones, NO por ángulos articulares, lo cual diferencia a DOGMA de la mayoría de sistemas robóticos convencionales. |
| **datos_cuantitativos** | McKibben a 4 bar. Relación músculo-tendón 1:1. |
| **datos_cualitativos** | Sin encoders articulares. Control por fuerzas, no ángulos. EWMA smoothing. Multi-modal fusion. Real-time force feedback. |
| **estatus** | confirmado |
| **confianza** | alta |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — secciones ESPECIFICACIONES TÉCNICAS, ARQUITECTURA DE CONTROL; nodes.ts — sensing subsystem |
| **relaciones** | es_parte_de: N05 (Mano); alimenta: N21 (Control), N22 (Estimación de estado); depende_de: N05.04 (McKibben), N05.06 (Sensores); publica: BUS SENSORS |
| **preguntas_abiertas** | ¿Qué tipo específico de sensor táctil se usa? ¿Resolución y rango de los sensores? ¿Latencia del sensado? |

---

## N08 — ESPECIFICACIONES_Y_DESEMPENO

| Campo | Valor |
|---|---|
| **nombre_canonico** | ESPECIFICACIONES_Y_DESEMPENO |
| **aliases** | Specs & Performance, Especificaciones técnicas |
| **descripcion_breve** | Datos cuantitativos de desempeño del sistema DOGMA. |
| **descripcion_extensa** | Las especificaciones confirmadas del corpus son: Mano con 20 DOF independientes y 14 sensores táctiles (con conflicto de versión), diseño anatómicamente preciso como réplica humana 1:1 con real-time force feedback. Brazo con 6 DOF totalmente actuado, alcance de 1m y carga de 15 kg. Las métricas de desempeño operativo (velocidad, precisión, fuerza de agarre, repetibilidad, vida útil) no están documentadas en el corpus y se consideran pendientes de validación. |
| **datos_cuantitativos** | Mano: 20 DOF, 14 sensores. Brazo: 6 DOF, 1m, 15 kg. |
| **datos_cualitativos** | Réplica 1:1 humana. Real-time force feedback. Anatómicamente preciso. |
| **estatus** | confirmado (especificaciones básicas) / pendiente_de_validación (desempeño operativo) |
| **confianza** | alta (DOF, alcance, carga) / baja (rendimiento operativo) |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección ESPECIFICACIONES TÉCNICAS |
| **relaciones** | depende_de: N05 (Mano), N06 (Brazo); valida: N17 (Claims); limita: N12 (Diferenciadores) |
| **preguntas_abiertas** | Fuerza de agarre máxima? Velocidad de cierre de la mano? Precisión de posicionamiento? Repetibilidad? Vida útil de los McKibben? Temperatura operativa? |

---

## N09 — COSTOS_PRICING_Y_ESTRUCTURA_ECONOMICA

| Campo | Valor |
|---|---|
| **nombre_canonico** | COSTOS_PRICING_Y_ESTRUCTURA_ECONOMICA |
| **aliases** | Pricing, Costos, Estructura económica |
| **descripcion_breve** | Estimaciones de precio y desglose de costos del sistema DOGMA. |
| **descripcion_extensa** | Los precios documentados son estimaciones conversacionales, no precios de venta finalizados. Brazo-mano: $5,000 USD. Humanoide completo: $18,000 USD. Desglose del humanoide: brazos/manos 28%, piernas 33%, torso 22%, cabeza 10%, otros 7%. Todos estos valores tienen confianza baja y estatus de "estimación conversada". |
| **datos_cuantitativos** | Brazo-mano: $5,000 USD (estimado). Humanoide: $18,000 USD (estimado). Desglose: 28%+33%+22%+10%+7% = 100%. |
| **datos_cualitativos** | Precios significativamente por debajo de competidores como Shadow Hand. Estatus: estimación conversada. |
| **estatus** | estimado |
| **confianza** | baja |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección PRECIO / COSTOS |
| **relaciones** | depende_de: N04 (Producto), N05 (Mano), N06 (Brazo); valida: N12 (Diferenciadores — precio competitivo); limita: N10 (Mercado) |
| **preguntas_abiertas** | ¿Los precios incluyen software/licencia? ¿BOM (Bill of Materials) detallado? ¿Margen target? ¿Costo de mantenimiento? ¿Modelo de revenue (venta, lease, SaaS)? |

---

## N10 — MERCADO_CLIENTES_Y_APLICACIONES

| Campo | Valor |
|---|---|
| **nombre_canonico** | MERCADO_CLIENTES_Y_APLICACIONES |
| **aliases** | Market, Clientes, Aplicaciones |
| **descripcion_breve** | Mercados objetivo, aplicaciones y pipeline de clientes de DOGMA. |
| **descripcion_extensa** | DOGMA identifica cinco aplicaciones target: industria manufacturera, medicina, investigación académica, prótesis y ensamblaje fino. El sistema de tracking en la aplicación DOGMA OS incluye un módulo de pilotos industriales con campos para company, stage, viability score, champion y risk level, almacenado en Supabase. |
| **datos_cuantitativos** | 5 aplicaciones target. Pipeline tracking via Supabase (pilots table). |
| **datos_cualitativos** | Diversificación de mercados. Pipeline de pilotos industriales activo. |
| **estatus** | confirmado |
| **confianza** | media |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección ARQUITECTURA MODULAR; nodes.ts — pilots |
| **relaciones** | depende_de: N04 (Producto), N09 (Costos); habilita: N16 (Comunidad); alimenta: N34 (Integraciones) |
| **preguntas_abiertas** | ¿Hay pilotos activos? ¿TAM/SAM/SOM? ¿Prioridad entre los 5 mercados? ¿Geografía target? |

---

## N11 — BENCHMARKS_Y_COMPETENCIA

| Campo | Valor |
|---|---|
| **nombre_canonico** | BENCHMARKS_Y_COMPETENCIA |
| **aliases** | Competencia, Competitive Analysis, Benchmarks |
| **descripcion_breve** | Análisis competitivo con 10 sistemas/empresas de referencia. |
| **descripcion_extensa** | El corpus menciona comparaciones con 10 sistemas/empresas: Shadow Hand (mano diestra líder), OpenAI Dactyl (manipulación con RL), JSK Lab (Universidad de Tokio, manos musculoesqueléticas), UBTech Walker S2, Unitree G1, Tesla Optimus, Agility Digit, Ameca (Engineered Arts), NAO (SoftBank), y Atlas (Boston Dynamics). IMPORTANTE: Estos son "benchmarks conversacionales" — mencionados en contexto informal, no como análisis competitivo riguroso con datos comparativos verificados. |
| **datos_cuantitativos** | 10 competidores/referencias identificados. |
| **datos_cualitativos** | Benchmarks conversacionales, no rigurosos. Falta análisis comparativo formal con métricas. |
| **estatus** | benchmark_conversacional |
| **confianza** | baja |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección POSICIONAMIENTO |
| **relaciones** | depende_de: N08 (Especificaciones); valida: N12 (Diferenciadores); informa: N17 (Riesgos) |
| **preguntas_abiertas** | ¿Existe un análisis competitivo formal? ¿Con qué métricas se compara? ¿Precios de competidores confirmados? ¿Posición de DOGMA en cada eje de comparación? |

---

## N12 — DIFERENCIADORES_Y_PROPUESTA_DE_VALOR

| Campo | Valor |
|---|---|
| **nombre_canonico** | DIFERENCIADORES_Y_PROPUESTA_DE_VALOR |
| **aliases** | Value Proposition, Diferenciadores, USP |
| **descripcion_breve** | Lo que hace a DOGMA único frente a la competencia. |
| **descripcion_extensa** | Los diferenciadores clave de DOGMA son: (1) Diseño biomimético musculoesquelético vs motores convencionales, usando McKibben como actuadores; (2) Control primario por fuerzas y tensiones de tendones en vez de ángulos articulares con encoders; (3) Réplica anatómica 1:1 del cuerpo humano; (4) Precio target significativamente inferior a la competencia ($5K brazo-mano); (5) Doble narrativa que integra ingeniería avanzada con una dimensión filosófica y estética única en la industria. |
| **datos_cuantitativos** | 5 diferenciadores principales. Precio target: $5K vs >$100K de Shadow Hand (benchmark conversacional). |
| **datos_cualitativos** | Combinación única de biomimética + control por fuerzas + narrativa filosófica. |
| **estatus** | confirmado (como propuesta) / pendiente_de_validación (como ventaja demostrada) |
| **confianza** | media |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — múltiples secciones |
| **relaciones** | depende_de: N05 (Mano), N07 (Sensado), N02 (Filosofía); valida: N11 (Competencia); habilita: N10 (Mercado) |
| **preguntas_abiertas** | ¿Los diferenciadores son ventajas demostradas o claims? ¿Existe evidencia de desempeño superior? |

---

## N13 — BRANDING_NARRATIVA_Y_TONO

| Campo | Valor |
|---|---|
| **nombre_canonico** | BRANDING_NARRATIVA_Y_TONO |
| **aliases** | Branding, Narrativa, Tono de marca |
| **descripcion_breve** | Identidad de marca, tono comunicacional y narrativa del proyecto. |
| **descripcion_extensa** | El branding de DOGMA se caracteriza por un tono sobrio y académico, raíces etimológicas en latín, griego y hebreo bíblico, y una narrativa centrada en el acto creador y la génesis. El cuerpo es concebido como templo, la mano como instrumento primordial. El tono evita el hype tecnológico y busca solemnidad. La estética visual (inferida del theme.ts) usa una paleta oscura con gold (#C8A74B) como acento primario, fondos near-black (#030308), y una estética que recuerda a terminales de control industrial sofisticados. |
| **datos_cuantitativos** | Paleta: bg #030308, gold #C8A74B, text #C8C4BC. |
| **datos_cualitativos** | Tono: sobrio, académico, solemne. No hype. Raíces lingüísticas clásicas. |
| **estatus** | confirmado |
| **confianza** | alta |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección MARCA / NAMING; theme.ts |
| **relaciones** | depende_de: N02 (Filosofía), N03 (Naming); habilita: N28 (HMI — estética); limita: N16 (Comunidad — define el tono de comunicación) |
| **preguntas_abiertas** | ¿Existe un brand book formal? ¿Tipografía definida? ¿Guidelines para comunicación externa? |

---

## N14 — DOCUMENTACION_Y_KNOWLEDGE_BASE

| Campo | Valor |
|---|---|
| **nombre_canonico** | DOCUMENTACION_Y_KNOWLEDGE_BASE |
| **aliases** | Docs, Knowledge Base, Base documental |
| **descripcion_breve** | Sistema documental del proyecto incluyendo ontología, ingeniería, control y HMI. |
| **descripcion_extensa** | La documentación de DOGMA está en desarrollo activo. Este documento (DOGMA_MASTER_DATABASE.md) constituye la ontología fundacional. Se requiere documentación técnica de ingeniería, documentación de la arquitectura de control M0-M9, y documentación de la aplicación HMI. El corpus menciona que la base documental debe ser migrable a Notion, Obsidian, Airtable, Neo4j o una wiki privada. |
| **datos_cuantitativos** | 4 capas documentales identificadas. |
| **datos_cualitativos** | Modular, escalable, versionable, migrable. |
| **estatus** | en_desarrollo |
| **confianza** | media |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección OBJETIVO CENTRAL |
| **relaciones** | documenta: todos los nodos; depende_de: N20 (Gobernanza) |
| **preguntas_abiertas** | ¿Plataforma definitiva para la knowledge base? ¿Quién mantiene la documentación? |

---

## N15 — ROADMAP_VERSIONES_Y_EXPANSION

| Campo | Valor |
|---|---|
| **nombre_canonico** | ROADMAP_VERSIONES_Y_EXPANSION |
| **aliases** | Roadmap, Versiones, Plan de expansión |
| **descripcion_breve** | Plan de versiones (V1, V2) y expansión modular del producto. |
| **descripcion_extensa** | DOGMA contempla dos versiones principales: V1 (actual, en desarrollo) y V2 (planificada). La expansión sigue la jerarquía modular: mano → muñeca → brazo → humanoide completo. En paralelo, el software de control está en transición hacia v3 con arquitectura modular (Next.js, Supabase, componentes separados). El MIGRATION.md documenta un plan de 5 fases para la refactorización del software. |
| **datos_cuantitativos** | 2 versiones de hardware (V1, V2). Control OS en transición a v3. 5 fases de migración de software. |
| **datos_cualitativos** | Expansión modular. Refactorización de monolito a arquitectura modular. |
| **estatus** | confirmado (roadmap) / en_desarrollo (ejecución) |
| **confianza** | media |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt; ARCHITECTURE.md; MIGRATION.md |
| **relaciones** | depende_de: N04 (Producto); habilita: N28 (HMI v3); planifica: N05 (Mano V2), N06 (Brazo V2) |
| **preguntas_abiertas** | ¿Timeline del roadmap? ¿Diferencias entre V1 y V2? ¿Prioridades de la expansión? |

---

## N16 — COMUNIDAD_EDUCACION_Y_COLABORACIONES

| Campo | Valor |
|---|---|
| **nombre_canonico** | COMUNIDAD_EDUCACION_Y_COLABORACIONES |
| **aliases** | Comunidad, Educación, Partnerships |
| **descripcion_breve** | Relaciones con academia, industria y comunidad científica. |
| **descripcion_extensa** | El corpus menciona potencial académico, pilotos industriales y colaboraciones de investigación como ejes de relación externa. No hay datos específicos sobre colaboraciones formalizadas. Los pilotos industriales se gestionan a través de la aplicación Control OS (tabla pilots en Supabase). |
| **datos_cuantitativos** | Pipeline de pilotos en Supabase. |
| **datos_cualitativos** | Potencial académico no formalizado. Pilotos industriales en gestión activa. |
| **estatus** | planificado |
| **confianza** | baja |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — implícito; nodes.ts — pilots |
| **relaciones** | depende_de: N10 (Mercado); habilita: N27 (Datasets — posibles colaboraciones académicas) |
| **preguntas_abiertas** | ¿Hay partnerships académicos activos? ¿Programa de investigadores? ¿Comunidad open-source? |

---

## N17 — RIESGOS_VALIDACIONES_Y_CLAIMS

| Campo | Valor |
|---|---|
| **nombre_canonico** | RIESGOS_VALIDACIONES_Y_CLAIMS |
| **aliases** | Risks, Claims, Validaciones |
| **descripcion_breve** | Registro de claims no validados, riesgos técnicos y de mercado. |
| **descripcion_extensa** | El corpus contiene múltiples claims que requieren validación: precios estimados conversacionalmente, benchmarks no rigurosos, especificaciones de desempeño no medidas, Active Inference no validada experimentalmente, y conflictos de versión en datos técnicos (sensores, tipo de actuación). Los riesgos técnicos incluyen la viabilidad a largo plazo de McKibben, la precisión del control sin encoders, y la integración del sistema completo. Los riesgos de mercado incluyen la competencia de empresas con mayor capital y la aceptación de un sistema neumático en entornos industriales. |
| **datos_cuantitativos** | Al menos 5 conflictos de versión documentados (ver SECCION 10). |
| **datos_cualitativos** | Claims internos abundantes, validaciones formales escasas. |
| **estatus** | confirmado (como nodo de riesgo) |
| **confianza** | alta (la existencia de riesgos es cierta) |
| **fuente_del_corpus** | Análisis transversal del corpus completo |
| **relaciones** | audita: N08 (Especificaciones), N09 (Costos), N11 (Benchmarks), N25 (Active Inference) |
| **preguntas_abiertas** | ¿Plan de validación formal? ¿Timeline de testing? ¿Criterios de aceptación? |

---

## N18 — PREGUNTAS_ABIERTAS_Y_DATOS_FALTANTES

| Campo | Valor |
|---|---|
| **nombre_canonico** | PREGUNTAS_ABIERTAS_Y_DATOS_FALTANTES |
| **aliases** | Open Questions, Datos faltantes, Gaps |
| **descripcion_breve** | Registro de información no disponible en el corpus que requiere investigación futura. |
| **descripcion_extensa** | Las preguntas abiertas principales son: (1) Conflicto en número de sensores táctiles — el corpus principal dice 14, nodes.ts dice "19 donut-shaped per finger"; (2) McKibben ¿hidráulico o neumático? — el corpus dice "4 bar" y "pneumatic", pero en otro contexto menciona "hydraulic"; (3) Active Inference — mencionada como framework de control pero sin validación experimental; (4) Datos de desempeño real — no hay métricas de velocidad, precisión, repetibilidad, vida útil; (5) Arquitectura formalizada vs implementada — mucho del M0-M9 es propuesto/teórico. Ver SECCION 6 para listado completo. |
| **datos_cuantitativos** | Al menos 15 categorías de datos faltantes identificadas. |
| **datos_cualitativos** | La mayoría de los vacíos son en datos cuantitativos de desempeño y validación experimental. |
| **estatus** | confirmado |
| **confianza** | alta |
| **fuente_del_corpus** | Análisis transversal del corpus completo |
| **relaciones** | identifica_vacíos_en: todos los nodos; alimenta: N17 (Riesgos); informa: N20 (Gobernanza) |
| **preguntas_abiertas** | Este nodo ES el registro de preguntas abiertas. Ver SECCION 6 para detalle completo. |

---

## N19 — FUENTES_TRAZABILIDAD_Y_CONFIANZA

| Campo | Valor |
|---|---|
| **nombre_canonico** | FUENTES_TRAZABILIDAD_Y_CONFIANZA |
| **aliases** | Sources, Trazabilidad, Confidence |
| **descripcion_breve** | Registro de fuentes del corpus y niveles de confianza por dato. |
| **descripcion_extensa** | Las fuentes del corpus DOGMA son: (1) dogma_master_prompt_profesional.txt — el corpus principal con toda la información conceptual, técnica y de control; (2) ARCHITECTURE.md — arquitectura del software Control OS v3; (3) MIGRATION.md — plan de migración del monolito a v3; (4) nodes.ts — definición del árbol de nodos y columnas de la base de datos; (5) types.ts — interfaces TypeScript del sistema; (6) theme.ts — paleta de colores y estética. Niveles de confianza: alta (datos consistentes en múltiples fuentes), media (datos mencionados una vez sin contradicción), baja (estimaciones, benchmarks conversacionales, datos con conflictos). |
| **datos_cuantitativos** | 6 fuentes documentales. 3 niveles de confianza. |
| **datos_cualitativos** | Trazabilidad punto a punto desde cada dato hasta su fuente. |
| **estatus** | confirmado |
| **confianza** | alta |
| **fuente_del_corpus** | Meta-análisis de todas las fuentes |
| **relaciones** | fundamenta: todos los nodos; depende_de: N20 (Gobernanza) |
| **preguntas_abiertas** | ¿Hay fuentes adicionales no incluidas en este corpus (CAD, papers, prototipos)? |

---

## N20 — GOBERNANZA_DEL_DATO_Y_MANTENIMIENTO

| Campo | Valor |
|---|---|
| **nombre_canonico** | GOBERNANZA_DEL_DATO_Y_MANTENIMIENTO |
| **aliases** | Data Governance, Mantenimiento, Governance |
| **descripcion_breve** | Políticas de versionamiento, actualización y mantenimiento de la base de datos. |
| **descripcion_extensa** | La gobernanza del dato para DOGMA debe definir: (1) Versionamiento — cada actualización de este documento incrementa la versión; (2) Proceso de actualización — quién puede modificar, cómo se revisan cambios, workflow de aprobación; (3) Roles de mantenimiento — owner del dato, revisores, consumidores. El corpus indica que el sistema debe ser "modular, escalable, versionable, legible y fácil de migrar a cualquier sistema". En la aplicación Control OS, los agentes tienen políticas de edición configurables (direct, approval, readonly). |
| **datos_cuantitativos** | 3 políticas de edición en la app (direct, approval, readonly). |
| **datos_cualitativos** | Modular, escalable, versionable, migrable. |
| **estatus** | propuesto |
| **confianza** | media |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt; types.ts — SettingsConfig |
| **relaciones** | gobierna: todos los nodos; depende_de: N14 (Documentación); habilita: N19 (Trazabilidad) |
| **preguntas_abiertas** | ¿Quién es el owner de la base de datos? ¿Cadencia de actualización? ¿Herramienta de versionamiento? |

---

## N21 — ARQUITECTURA_DE_CONTROL

**Este nodo es un PILAR CENTRAL del sistema DOGMA.**

| Campo | Valor |
|---|---|
| **nombre_canonico** | ARQUITECTURA_DE_CONTROL |
| **aliases** | Control Architecture, M0-M9, Stack de control |
| **descripcion_breve** | Arquitectura de control jerárquica de 10 módulos (M0-M9) con frecuencias de operación diferenciadas. |
| **descripcion_extensa** | La arquitectura de control DOGMA se organiza en 10 módulos jerárquicos que operan a frecuencias desde 0.1 Hz hasta 5 kHz. El principio fundamental es el control por fuerzas/tensiones de tendones (no ángulos articulares). No hay encoders articulares; la estimación de estado es computacional. Los módulos se comunican mediante 4 buses formales: BUS SENSORS, BUS STATE, BUS LIMITS, BUS COMMANDS. La actuación utiliza McKibben a 4 bar con relación músculo-tendón 1:1. |
| **datos_cuantitativos** | 10 módulos (M0-M9). Rango de frecuencia: 0.1 Hz — 5 kHz. 4 buses. McKibben a 4 bar. |
| **datos_cualitativos** | Jerárquico, multi-rate, control por fuerzas, sin encoders. |
| **estatus** | confirmado (arquitectura) / pendiente_de_validación (implementación completa) |
| **confianza** | alta (diseño) / baja (implementación) |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — sección ARQUITECTURA DE CONTROL M0-M9 |

### Detalle de módulos de control:

#### N21.01 — M0 Safety

| Campo | Valor |
|---|---|
| **modulo_de_control** | M0 |
| **rate_hz** | 1,000–5,000 Hz |
| **inputs** | p (presión), \|F\| (fuerza), x_tac (táctil), BUS LIMITS |
| **outputs** | Emergency stop, pressure relief, actuator shutdown |
| **buses** | Consume: BUS SENSORS, BUS LIMITS. Publica: BUS COMMANDS (override). |
| **hardware** | Sensores de presión, válvulas de alivio, E-stop (inferido) |
| **descripcion** | Capa de seguridad de máxima prioridad. Opera a la mayor frecuencia del sistema. Puede sobrescribir cualquier otro módulo. Monitorea presiones, fuerzas y límites en tiempo real. |

#### N21.02 — M1 Pressure Servo

| Campo | Valor |
|---|---|
| **modulo_de_control** | M1 |
| **rate_hz** | 500–1,000 Hz |
| **inputs** | p (presión actual), p* (presión deseada) |
| **outputs** | Comandos de válvula |
| **buses** | Consume: BUS SENSORS (p), BUS COMMANDS (p*). Publica: señales de actuación. |
| **hardware** | Sensores de presión, válvulas proporcionales (inferido) |
| **descripcion** | Servo de presión de bajo nivel. Controla la presión en cada músculo McKibben para seguir la referencia p* generada por M2. |

#### N21.03 — M2 Tendon Force / Impedance

| Campo | Valor |
|---|---|
| **modulo_de_control** | M2 |
| **rate_hz** | 200–500 Hz |
| **inputs** | \|F\| (fuerza actual), F* (fuerza deseada), K* (rigidez deseada), D* (amortiguamiento deseado) |
| **outputs** | p* (referencia de presión para M1) |
| **buses** | Consume: BUS SENSORS (\|F\|), BUS COMMANDS (F*, K*, D*). Publica: BUS COMMANDS (p*). |
| **hardware** | Sensores de fuerza en tendones (inferido) |
| **descripcion** | Control de fuerza e impedancia de tendones. Traduce comandos de fuerza/impedancia en referencias de presión. Implementa control de compliance variable. |

#### N21.04 — M3 Proprioception

| Campo | Valor |
|---|---|
| **modulo_de_control** | M3 |
| **rate_hz** | 100–300 Hz |
| **inputs** | p (presión), \|F\| (fuerza), x_tac (táctil) |
| **outputs** | theta_hat (ángulo estimado), omega_hat (velocidad estimada) |
| **buses** | Consume: BUS SENSORS. Publica: BUS STATE (theta_hat, omega_hat). |
| **hardware** | No hay hardware dedicado — propiocepción computacional |
| **descripcion** | Estimación propioceptiva sin encoders. Calcula posición y velocidad articular a partir de presiones, fuerzas y datos táctiles. Es uno de los módulos más innovadores de DOGMA. |

#### N21.05 — M4 Vision

| Campo | Valor |
|---|---|
| **modulo_de_control** | M4 |
| **rate_hz** | 30 Hz |
| **inputs** | Imágenes de cámara (inferido) |
| **outputs** | Detección de objetos, pose estimation (inferido) |
| **buses** | Publica: BUS STATE (datos visuales) |
| **hardware** | Cámara(s) — tipo no especificado en corpus |
| **descripcion** | Módulo de visión por computadora. Opera a 30 Hz (framerate estándar). Detalles de implementación no especificados en el corpus. |

#### N21.06 — M5 Fusion

| Campo | Valor |
|---|---|
| **modulo_de_control** | M5 |
| **rate_hz** | 60–120 Hz |
| **inputs** | theta_hat, omega_hat, c_hat, T_obj_hat, w_hat, datos visuales |
| **outputs** | Estado fusionado del sistema |
| **buses** | Consume: BUS STATE (todas las estimaciones). Publica: BUS STATE (estado fusionado). |
| **hardware** | N/A — módulo computacional |
| **descripcion** | Fusión multi-modal de todas las estimaciones de estado. Combina propiocepción, tacto, visión. Usa EWMA smoothing. Produce el "world model" interno del sistema. |

#### N21.07 — M6 Reflex

| Campo | Valor |
|---|---|
| **modulo_de_control** | M6 |
| **rate_hz** | 100–300 Hz |
| **inputs** | BUS STATE (estado fusionado), BUS LIMITS |
| **outputs** | Acciones reflexivas (soltar, apretar, retractar) |
| **buses** | Consume: BUS STATE, BUS LIMITS. Publica: BUS COMMANDS (override reflexivo). |
| **hardware** | N/A — módulo computacional |
| **descripcion** | Capa de reflejos biomecánicos. Similar a los reflejos espinales humanos. Opera antes que la política consciente. Puede sobrescribir M7 en situaciones de peligro o contacto inesperado. |

#### N21.08 — M7 Policy

| Campo | Valor |
|---|---|
| **modulo_de_control** | M7 |
| **rate_hz** | 10–30 Hz |
| **inputs** | BUS STATE (estado fusionado), SkillCmd |
| **outputs** | F* (fuerza deseada), K* (rigidez), D* (amortiguamiento) |
| **buses** | Consume: BUS STATE, BUS COMMANDS (SkillCmd). Publica: BUS COMMANDS (F*, K*, D*). |
| **hardware** | N/A — módulo computacional / GPU (inferido para Active Inference) |
| **descripcion** | Ejecución de políticas de control de alto nivel. Traduce skills en comandos de fuerza e impedancia. Es aquí donde Active Inference se aplicaría (hipótesis). |

#### N21.09 — M8 Language / Skills

| Campo | Valor |
|---|---|
| **modulo_de_control** | M8 |
| **rate_hz** | 0.5–5 Hz |
| **inputs** | Comandos de lenguaje natural, skill definitions, run sequences |
| **outputs** | SkillCmd (comando de skill para M7) |
| **buses** | Consume: interfaz de usuario / API. Publica: BUS COMMANDS (SkillCmd). |
| **hardware** | N/A — módulo computacional / LLM (inferido) |
| **descripcion** | Interfaz de lenguaje y gestión de skills. Traduce instrucciones de alto nivel en secuencias de skills ejecutables. Jerarquía: sub-skill → skill → run. |

#### N21.10 — M9 Meta-Supervisor

| Campo | Valor |
|---|---|
| **modulo_de_control** | M9 |
| **rate_hz** | 0.1–1 Hz |
| **inputs** | Estado global del sistema, métricas de rendimiento, alertas |
| **outputs** | meta-actions (cambio de modo, recalibración, replanificación) |
| **buses** | Consume: todos los buses. Publica: BUS COMMANDS (meta-actions). |
| **hardware** | N/A — módulo computacional |
| **descripcion** | Supervisor de más alto nivel. Opera a la menor frecuencia. Monitorea la salud global del sistema, decide cambios de modo operativo, inicia recalibraciones y maneja excepciones sistémicas. |

| **relaciones (N21 completo)** | es_parte_de: DOGMA (pilar central); controla: N05 (Mano), N06 (Brazo); depende_de: N07 (Sensado); publica: BUS COMMANDS; consume: BUS SENSORS, BUS STATE, BUS LIMITS; habilita: N28 (HMI); supervisa: N23 (Seguridad) |
| **preguntas_abiertas** | ¿Qué módulos están implementados vs teóricos? ¿Hardware de cómputo (microcontrolador, FPGA, PC)? ¿Protocolo de comunicación inter-módulo (DDS, shared memory, custom)? ¿Latencia end-to-end medida? |

---

## N22 — ESTIMACION_DE_ESTADO_Y_FUSION

| Campo | Valor |
|---|---|
| **nombre_canonico** | ESTIMACION_DE_ESTADO_Y_FUSION |
| **aliases** | State Estimation, Fusion, Estimador de estado |
| **descripcion_breve** | Estimación computacional del estado del sistema sin encoders articulares. |
| **descripcion_extensa** | Dado que DOGMA no tiene encoders articulares, toda la información de posición y velocidad articular debe ser estimada computacionalmente a partir de presiones, fuerzas y datos táctiles. Las variables estimadas son: theta_hat (ángulo articular), omega_hat (velocidad angular), c_hat (contacto), T_obj_hat (par en el objeto), w_hat (rigidez/peso del objeto). La fusión usa EWMA smoothing y combinación multi-modal. Esto se implementa entre M3 (Proprioception) y M5 (Fusion). |
| **datos_cuantitativos** | 5 variables estimadas. M3: 100-300 Hz. M5: 60-120 Hz. |
| **datos_cualitativos** | Propiocepción computacional, sin encoders. EWMA smoothing. Multi-modal fusion. |
| **estatus** | confirmado (diseño) / pendiente_de_validación (precisión de estimación) |
| **confianza** | alta (concepto) / baja (resultados) |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — secciones ARQUITECTURA DE CONTROL, BUSES |
| **relaciones** | es_parte_de: N21 (Control); depende_de: N07 (Sensado); publica: BUS STATE; alimenta: M5, M6, M7 |
| **preguntas_abiertas** | ¿Algoritmo de estimación (EKF, UKF, particle filter, neural network)? ¿Precisión de theta_hat vs encoder real? ¿Drift acumulado? |

---

## N23 — SEGURIDAD_REFLEJOS_Y_LIMITES

| Campo | Valor |
|---|---|
| **nombre_canonico** | SEGURIDAD_REFLEJOS_Y_LIMITES |
| **aliases** | Safety, Reflejos, Limits |
| **descripcion_breve** | Capas de seguridad y reflejos del sistema DOGMA. |
| **descripcion_extensa** | La seguridad en DOGMA opera en dos capas: M0 (Safety, 1-5 kHz) que es la capa de máxima prioridad con capacidad de emergency stop y alivio de presión, y M6 (Reflex, 100-300 Hz) que implementa reflejos biomecánicos similares a los espinales humanos. Ambas capas pueden sobrescribir los comandos de módulos superiores. El BUS LIMITS define los umbrales y restricciones operativas del sistema. |
| **datos_cuantitativos** | M0: 1-5 kHz. M6: 100-300 Hz. |
| **datos_cualitativos** | Doble capa de seguridad. Override capability. Reflejos biomecánicos. |
| **estatus** | confirmado |
| **confianza** | alta (diseño) / media (implementación) |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — ARQUITECTURA DE CONTROL |
| **relaciones** | protege: todo el sistema; sobrescribe: M1-M9 (M0), M7 (M6); consume: BUS SENSORS, BUS LIMITS; publica: BUS COMMANDS (override) |
| **preguntas_abiertas** | ¿Certificación de seguridad (ISO 10218, ISO/TS 15066)? ¿Testing de escenarios de fallo? ¿Redundancia hardware? |

---

## N24 — GEMELO_DIGITAL_Y_DINAMICA

| Campo | Valor |
|---|---|
| **nombre_canonico** | GEMELO_DIGITAL_Y_DINAMICA |
| **aliases** | Digital Twin, Modelo dinámico, Simulación |
| **descripcion_breve** | Modelo dinámico del sistema y gemelo digital para simulación. |
| **descripcion_extensa** | El corpus menciona gemelo digital y dinámica como parte del roadmap. En la aplicación Control OS existe un componente ThreeViz (Three.js) para visualización 3D de tipo "neural network". No hay evidencia en el corpus de un gemelo digital completo con modelo dinámico validado. Los parámetros del modelo dinámico de los McKibben (curvas presión-fuerza, histeresis, respuesta temporal) son necesarios pero no documentados. |
| **datos_cuantitativos** | Three.js para visualización (en desarrollo). |
| **datos_cualitativos** | Gemelo digital planificado pero no implementado según el corpus. |
| **estatus** | propuesto / pendiente_de_validación |
| **confianza** | baja |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt; MIGRATION.md — ThreeViz component |
| **relaciones** | depende_de: N05 (Mano — modelo mecánico), N07 (Sensado — datos de calibración); habilita: N27 (Sim-to-real); alimenta: N22 (Estimación — modelo inverso) |
| **preguntas_abiertas** | ¿Modelo dinámico de McKibben validado? ¿Software de simulación (MuJoCo, Isaac Gym, custom)? ¿Parámetros del modelo? |

---

## N25 — POLITICAS_ACTIVE_INFERENCE_Y_SKILLS

| Campo | Valor |
|---|---|
| **nombre_canonico** | POLITICAS_ACTIVE_INFERENCE_Y_SKILLS |
| **aliases** | Active Inference, Policies, Skills Framework |
| **descripcion_breve** | Framework de políticas de control incluyendo Active Inference y jerarquía de skills. |
| **descripcion_extensa** | El corpus menciona Active Inference como framework de control para M7 (Policy). Sin embargo, no hay evidencia de implementación o validación experimental de Active Inference en DOGMA. La jerarquía de skills está mejor definida: sub-skill → skill → run, con categorías Arm, Grasp, Manipulation, Assembly, Sensing, Interaction, Utility. El teaching se realiza por glove/haptic teleoperation. |
| **datos_cuantitativos** | 7 categorías de skills. 3 niveles jerárquicos (sub-skill, skill, run). M7: 10-30 Hz. |
| **datos_cualitativos** | Active Inference: hipótesis no validada. Skills hierarchy: confirmada. Teaching by demonstration: confirmado. |
| **estatus** | hipótesis (Active Inference) / confirmado (skills hierarchy) |
| **confianza** | baja (AI) / alta (skills) |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — ARQUITECTURA DE CONTROL, SKILLS/RUNS |
| **relaciones** | es_parte_de: N21 (Control — M7, M8); habilita: N31 (Skills Library), N32 (Teaching); depende_de: N22 (Estimación de estado) |
| **preguntas_abiertas** | ¿Active Inference implementada o solo propuesta? ¿Alternativas (RL, imitation learning, classical)? ¿Definición formal de cada categoría de skill? ¿Cuántos skills definidos? |

---

## N26 — SOFTWARE_TIEMPO_REAL_Y_COMPUTO

| Campo | Valor |
|---|---|
| **nombre_canonico** | SOFTWARE_TIEMPO_REAL_Y_COMPUTO |
| **aliases** | RT Software, ROS 2, Cómputo |
| **descripcion_breve** | Stack de software en tiempo real: ROS 2 Jazzy, rosbridge, nodos RT. |
| **descripcion_extensa** | DOGMA usa ROS 2 Jazzy como middleware de comunicación robótica. rosbridge WebSocket conecta el backend ROS 2 con el frontend React de la aplicación Control OS. Los nodos de tiempo real ejecutan los módulos M0-M9. No hay especificaciones detalladas sobre el hardware de cómputo en el corpus (tipo de procesador, FPGA, GPU). |
| **datos_cuantitativos** | ROS 2 Jazzy. WebSocket via rosbridge. |
| **datos_cualitativos** | Tiempo real multi-rate (0.1 Hz — 5 kHz). ROS 2 como middleware. |
| **estatus** | confirmado (stack) / inferido (detalles de implementación) |
| **confianza** | media |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt; ARCHITECTURE.md; nodes.ts |
| **relaciones** | implementa: N21 (Control M0-M9); conecta: N28 (HMI via rosbridge); depende_de: hardware de cómputo (no especificado) |
| **preguntas_abiertas** | ¿Hardware de cómputo? ¿RTOS o Linux con PREEMPT_RT? ¿DDS implementation (Fast-DDS, Cyclone)? ¿Particionamiento de tareas RT vs non-RT? |

---

## N27 — SIMULACION_DATASET_Y_SIM_TO_REAL

| Campo | Valor |
|---|---|
| **nombre_canonico** | SIMULACION_DATASET_Y_SIM_TO_REAL |
| **aliases** | Simulation, Dataset, Sim-to-Real |
| **descripcion_breve** | Simulación, colección de datos y transferencia sim-to-real. |
| **descripcion_extensa** | El corpus menciona simulación, dataset y sim-to-real como parte del roadmap del proyecto. No hay detalles específicos sobre el simulador (MuJoCo, Isaac Gym, PyBullet), el formato de datasets, ni el método de sim-to-real transfer. La aplicación Control OS incluye una pantalla de "Data & Replay" que implica capacidad de grabación y reproducción de sesiones. |
| **datos_cuantitativos** | N/A — no especificado en corpus. |
| **datos_cualitativos** | Planificado pero no detallado. Data & Replay en HMI sugiere infraestructura de datos. |
| **estatus** | planificado |
| **confianza** | baja |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — mención implícita |
| **relaciones** | depende_de: N24 (Gemelo digital), N26 (Software RT); habilita: N25 (Policies — training data) |
| **preguntas_abiertas** | ¿Simulador elegido? ¿Formato de datasets? ¿Método de sim-to-real? ¿Domain randomization? |

---

## N28 — APLICACION_DE_CONTROL_Y_HMI

| Campo | Valor |
|---|---|
| **nombre_canonico** | APLICACION_DE_CONTROL_Y_HMI |
| **aliases** | Control OS, HMI, DOGMA Robotics Control OS, Dashboard |
| **descripcion_breve** | Aplicación principal de control e interfaz humano-máquina del sistema DOGMA. |
| **descripcion_extensa** | DOGMA Robotics Control OS v1.0 es la interfaz operativa del sistema. Construida sobre React + RosBridge WebSocket, con arquitectura Next.js (App Router, Turbopack). Backend: Supabase (Postgres, Auth, Realtime). AI: OpenClaw gateway (localhost:18789) con Claude API fallback. Visualización 3D: Three.js. Tema: dark mode exclusivo. Tres roles de usuario: Operator, Engineer, Admin. 13 páginas funcionales. Agentes AI (11 definidos) que pueden editar datos con políticas configurables. En transición a v3 con arquitectura modular (de un monolito de 2500 líneas a 15+ archivos). |
| **datos_cuantitativos** | 13 páginas. 3 roles. 11 agentes AI. Monolito de 2500 líneas → modular. 5 fases de migración. |
| **datos_cualitativos** | React + RosBridge + Supabase + OpenClaw + Three.js. Dark mode only. Monday-like boards. |
| **estatus** | en_desarrollo |
| **confianza** | alta |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt; ARCHITECTURE.md; MIGRATION.md; nodes.ts; types.ts; theme.ts |
| **nombre_de_la_pantalla** | DOGMA Robotics Control OS v1.0 |
| **user_role** | Operator, Engineer, Admin |
| **topics_ros** | Via rosbridge WebSocket (topics específicos no detallados en corpus) |
| **dependencias** | Next.js 16, Supabase, OpenClaw, Three.js, rosbridge, Claude API |
| **relaciones** | visualiza: N21 (Control M0-M9); consume: BUS STATE via rosbridge; depende_de: N26 (Software RT), N30 (ROS Bridge); contiene: N29-N34 (páginas y funcionalidades) |
| **preguntas_abiertas** | ¿Deployment (local, cloud, edge)? ¿Latencia WebSocket aceptable para control? ¿Certificación para uso industrial? |

---

## N29 — PRODUCTO_DIGITAL_Y_FLUJOS_DE_USUARIO

| Campo | Valor |
|---|---|
| **nombre_canonico** | PRODUCTO_DIGITAL_Y_FLUJOS_DE_USUARIO |
| **aliases** | User Flows, Digital Product, UX |
| **descripcion_breve** | Páginas principales de la aplicación y flujos de usuario por rol. |
| **descripcion_extensa** | Las páginas principales son: Command Center (dashboard central), Live View (visualización en tiempo real del estado), Manual Control (control directo del robot), Settings (configuración del sistema, cuenta, permisos, agentes, conexiones, API keys, OpenClaw config). Los flujos de usuario están diferenciados por rol: Operator (operación básica, ejecución de runs), Engineer (configuración avanzada, calibración, debugging), Admin (todo + gestión de permisos y agentes). |
| **nombre_de_la_pantalla** | Command Center, Live View, Manual Control, Settings |
| **user_role** | Operator (ejecución), Engineer (configuración), Admin (gestión completa) |
| **topics_ros** | Inferido: topics de estado, comandos y configuración |
| **dependencias** | Supabase (persistencia), rosbridge (datos RT), OpenClaw (AI) |
| **estatus** | en_desarrollo |
| **confianza** | media |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt; MIGRATION.md — SettingsPanel details |
| **relaciones** | es_parte_de: N28 (HMI); habilita: operación del sistema; depende_de: N30 (ROS Bridge) |
| **preguntas_abiertas** | ¿Wireframes finalizados? ¿User testing realizado? ¿Accesibilidad? |

---

## N30 — ROS_BRIDGE_Y_CONECTIVIDAD

| Campo | Valor |
|---|---|
| **nombre_canonico** | ROS_BRIDGE_Y_CONECTIVIDAD |
| **aliases** | ROS Bridge, rosbridge, Connectivity |
| **descripcion_breve** | Capa de conectividad entre el backend ROS 2 y el frontend web. |
| **descripcion_extensa** | rosbridge_server proporciona una interfaz WebSocket que permite al frontend React comunicarse con el sistema ROS 2 Jazzy. Esto habilita la transmisión de datos en tiempo real desde los módulos de control al dashboard, y el envío de comandos desde la interfaz al robot. La API de la aplicación incluye proxy a OpenClaw (localhost:18789, /v1/chat/completions), CRUD genérico para Supabase, y CRUD de comentarios. |
| **datos_cuantitativos** | WebSocket protocol. OpenClaw: localhost:18789. |
| **datos_cualitativos** | Bridge bidireccional RT (ROS 2) ↔ non-RT (React). |
| **estatus** | confirmado |
| **confianza** | media |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt; ARCHITECTURE.md; MIGRATION.md |
| **nombre_de_la_pantalla** | N/A — capa de infraestructura, no pantalla |
| **user_role** | N/A — transparente al usuario |
| **topics_ros** | Topics publicados por M0-M9 (específicos no detallados) |
| **dependencias** | rosbridge_server, ROS 2 Jazzy, WebSocket |
| **relaciones** | conecta: N26 (Software RT) con N28 (HMI); depende_de: ROS 2 Jazzy; habilita: N29-N34 (todas las pantallas) |
| **preguntas_abiertas** | ¿Latencia medida? ¿QoS configurado? ¿Seguridad del WebSocket (wss)? ¿Rate limiting? |

---

## N31 — SKILLS_RUNS_Y_AUTOMATIZACION

| Campo | Valor |
|---|---|
| **nombre_canonico** | SKILLS_RUNS_Y_AUTOMATIZACION |
| **aliases** | Skills, Runs, Automation |
| **descripcion_breve** | Sistema de skills, runs y automatización con 4 pantallas dedicadas en la HMI. |
| **descripcion_extensa** | El sistema de skills organiza las capacidades del robot en una jerarquía: sub-skill → skill → run. Un run es una secuencia de skills que se ejecuta como una misión completa. Categorías: Arm, Grasp, Manipulation, Assembly, Sensing, Interaction, Utility. La HMI incluye 4 pantallas dedicadas: Skills Library (catálogo de skills disponibles), Run Builder (compositor de secuencias), AI Planner (planificación asistida por AI), y Arm Planner (planificación de trayectorias del brazo). |
| **nombre_de_la_pantalla** | Skills Library, Run Builder, AI Planner, Arm Planner |
| **user_role** | Engineer (creación), Operator (ejecución), Admin (gestión) |
| **topics_ros** | SkillCmd (BUS COMMANDS) |
| **dependencias** | M7 (Policy), M8 (Language/Skills), Supabase (persistencia de skills/runs) |
| **estatus** | confirmado (concepto) / en_desarrollo (implementación) |
| **confianza** | media |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — SKILLS/RUNS; MIGRATION.md |
| **relaciones** | es_parte_de: N28 (HMI); depende_de: N25 (Policies), N21.09 (M8); publica: SkillCmd via BUS COMMANDS; habilita: automatización industrial |
| **preguntas_abiertas** | ¿Cuántos skills definidos actualmente? ¿Formato de definición de skills (YAML, JSON, código)? ¿Validación de runs antes de ejecución? |

---

## N32 — TEACHING_TELEOP_Y_DEMONSTRATION_LEARNING

| Campo | Valor |
|---|---|
| **nombre_canonico** | TEACHING_TELEOP_Y_DEMONSTRATION_LEARNING |
| **aliases** | Teleop, Teaching, Demonstration Learning, Glove |
| **descripcion_breve** | Teleoperation por guante háptico y aprendizaje por demostración. |
| **descripcion_extensa** | DOGMA soporta teaching por glove/haptic teleoperation, donde un operador humano usa un guante háptico para controlar la mano robótica y enseñar nuevos skills por demostración. La HMI incluye una pantalla "Teleop Mode" dedicada. El aprendizaje por demostración implica grabar las acciones del operador y convertirlas en skills reproducibles. |
| **nombre_de_la_pantalla** | Teleop Mode |
| **user_role** | Engineer (teaching), Operator (teleop básico) |
| **topics_ros** | Topics de glove input, robot state feedback (inferido) |
| **dependencias** | Glove hardware, haptic feedback system, M8 (Skills recording) |
| **estatus** | confirmado (concepto) / pendiente_de_validación (implementación) |
| **confianza** | media |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — SKILLS/RUNS |
| **relaciones** | es_parte_de: N28 (HMI); habilita: N25 (Skills — enseñanza de nuevos skills); depende_de: N30 (ROS Bridge — streaming de datos); alimenta: N27 (Dataset — grabaciones de demos) |
| **preguntas_abiertas** | ¿Modelo de glove? ¿Tipo de haptic feedback? ¿Latencia del teleop? ¿Rate de grabación? |

---

## N33 — DATOS_REPLAY_Y_EXPORTS

| Campo | Valor |
|---|---|
| **nombre_canonico** | DATOS_REPLAY_Y_EXPORTS |
| **aliases** | Data & Replay, Exports, Recording |
| **descripcion_breve** | Grabación, reproducción y exportación de datos del sistema. |
| **descripcion_extensa** | La HMI incluye una pantalla "Data & Replay" para grabación y reproducción de sesiones del robot. Permite revisar ejecuciones pasadas, analizar datos sensoriales y de control, y exportar datos. El formato de exportación y el sistema de almacenamiento no están especificados en el corpus. En la aplicación, el módulo de finanzas (finance_snapshots) sugiere capacidad de exportación a CSV. |
| **nombre_de_la_pantalla** | Data & Replay |
| **user_role** | Engineer (análisis), Admin (export masivo) |
| **topics_ros** | Topics de recording (rosbag-like, inferido) |
| **dependencias** | Supabase (metadata), almacenamiento de archivos (no especificado) |
| **estatus** | confirmado (pantalla) / inferido (detalles de implementación) |
| **confianza** | media (existencia) / baja (detalles) |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt; MIGRATION.md |
| **relaciones** | es_parte_de: N28 (HMI); consume: datos de N21 (Control); alimenta: N27 (Datasets); habilita: N32 (Teaching — replay de demos) |
| **preguntas_abiertas** | ¿Formato de datos (rosbag2, HDF5, custom)? ¿Almacenamiento (local, S3, Supabase Storage)? ¿Capacidad de streaming replay? |

---

## N34 — INTEGRACIONES_EMPRESARIALES_Y_ECOSISTEMA

| Campo | Valor |
|---|---|
| **nombre_canonico** | INTEGRACIONES_EMPRESARIALES_Y_ECOSISTEMA |
| **aliases** | Enterprise Integrations, Ecosystem, Integraciones |
| **descripcion_breve** | Integraciones con sistemas empresariales: SAP, MES/SCADA, ROS 2, Cloud. |
| **descripcion_extensa** | DOGMA contempla integraciones con 4 ecosistemas: (1) SAP S/4HANA para integración con ERP industrial; (2) MES/SCADA para integración con sistemas de manufactura y supervisión; (3) ROS 2 Ecosystem para compatibilidad con el ecosistema robótico estándar; (4) Cloud/Analytics para procesamiento en la nube y analítica. La pantalla "Integrations" en la HMI gestiona estas conexiones. En la aplicación, MCP integrations se gestionan desde Settings. |
| **nombre_de_la_pantalla** | Integrations |
| **user_role** | Admin (configuración), Engineer (testing) |
| **topics_ros** | N/A — integraciones via API REST / protocolos industriales |
| **dependencias** | APIs de SAP, MES/SCADA, cloud providers |
| **estatus** | confirmado (plan) / planificado (implementación) |
| **confianza** | media |
| **fuente_del_corpus** | dogma_master_prompt_profesional.txt — INTEGRACIONES; MIGRATION.md — Settings/MCP |
| **relaciones** | es_parte_de: N28 (HMI); habilita: N10 (Mercado — requisito para clientes industriales); depende_de: N30 (ROS Bridge), N26 (Software RT) |
| **preguntas_abiertas** | ¿Protocolos industriales soportados (OPC UA, MQTT, REST)? ¿Nivel de integración SAP (read, write, bidirectional)? ¿Certificaciones industriales? |

---

# SECCION 5 — MAPA DE RELACIONES

## 5.1 Relaciones estructurales (es_parte_de)

| Origen | Relación | Destino |
|---|---|---|
| N01 | es_parte_de | DOGMA (raíz) |
| N02 | es_parte_de | N01 (Identidad) |
| N03 | es_parte_de | N01 (Identidad) |
| N04 | es_parte_de | N01 (Identidad) |
| N05 | es_parte_de | N04 (Producto) |
| N06 | es_parte_de | N04 (Producto) |
| N05.01 (Estructura mecánica) | es_parte_de | N05 (Mano) |
| N05.04 (McKibben) | es_parte_de | N05 (Mano) |
| N05.05 (Tendones) | es_parte_de | N05 (Mano) |
| N05.06 (Sensores) | es_parte_de | N05 (Mano) |
| N21.01–N21.10 (M0-M9) | es_parte_de | N21 (Control) |
| N29–N34 | es_parte_de | N28 (HMI) |

## 5.2 Relaciones de dependencia (depende_de)

| Origen | Relación | Destino |
|---|---|---|
| N03 (Naming) | depende_de | N02 (Filosofía) |
| N05 (Mano) | depende_de | N07 (Sensado/Actuación) |
| N21 (Control) | depende_de | N07 (Sensado) |
| N22 (Estimación) | depende_de | N07 (Sensado) |
| N24 (Gemelo digital) | depende_de | N05 (Mano — modelo mecánico) |
| N25 (Active Inference) | depende_de | N22 (Estimación) |
| N27 (Sim-to-real) | depende_de | N24 (Gemelo digital) |
| N28 (HMI) | depende_de | N26 (Software RT), N30 (ROS Bridge) |
| N31 (Skills) | depende_de | N25 (Policies), N21.09 (M8) |
| N32 (Teaching) | depende_de | N30 (ROS Bridge) |

## 5.3 Relaciones de control (controla, supervisa, sobrescribe)

| Origen | Relación | Destino |
|---|---|---|
| N21 (Control) | controla | N05 (Mano) |
| N21 (Control) | controla | N06 (Brazo) |
| M0 (Safety) | sobrescribe | M1, M2, M3, M4, M5, M6, M7, M8, M9 |
| M6 (Reflex) | sobrescribe | M7 (Policy) |
| M9 (Meta-Supervisor) | supervisa | M0-M8 (todos) |
| M7 (Policy) | controla | M2 (Tendon Force) via F*, K*, D* |
| M2 (Tendon Force) | controla | M1 (Pressure Servo) via p* |
| M8 (Language/Skills) | controla | M7 (Policy) via SkillCmd |

## 5.4 Relaciones de estimación y fusión (estima, fusiona)

| Origen | Relación | Destino |
|---|---|---|
| M3 (Proprioception) | estima | theta_hat, omega_hat |
| M5 (Fusion) | fusiona | theta_hat, omega_hat, c_hat, T_obj_hat, w_hat, visual data |
| M5 (Fusion) | estima | estado fusionado del sistema |

## 5.5 Relaciones de bus (publica, consume)

| Origen | Relación | Destino |
|---|---|---|
| N07 (Sensado) | publica | BUS SENSORS (p, \|F\|, x_tac) |
| M3 (Proprioception) | publica | BUS STATE (theta_hat, omega_hat) |
| M5 (Fusion) | publica | BUS STATE (estado fusionado) |
| M5 (Fusion) | consume | BUS STATE (estimaciones individuales) |
| M0 (Safety) | consume | BUS SENSORS, BUS LIMITS |
| M0 (Safety) | publica | BUS COMMANDS (emergency override) |
| M6 (Reflex) | consume | BUS STATE, BUS LIMITS |
| M6 (Reflex) | publica | BUS COMMANDS (reflexive override) |
| M7 (Policy) | consume | BUS STATE, BUS COMMANDS (SkillCmd) |
| M7 (Policy) | publica | BUS COMMANDS (F*, K*, D*) |
| M8 (Language/Skills) | publica | BUS COMMANDS (SkillCmd) |
| M9 (Meta-Supervisor) | consume | todos los buses |
| M9 (Meta-Supervisor) | publica | BUS COMMANDS (meta-actions) |

## 5.6 Relaciones de habilitación (habilita)

| Origen | Relación | Destino |
|---|---|---|
| N01 (Identidad) | habilita | todos los nodos |
| N02 (Filosofía) | habilita | N03 (Naming), N13 (Branding) |
| N07 (Sensado) | habilita | N21 (Control) |
| N21 (Control) | habilita | N28 (HMI — datos para visualizar) |
| N30 (ROS Bridge) | habilita | N28-N34 (todas las pantallas HMI) |
| N25 (Skills) | habilita | N31 (Skills Library HMI) |
| N32 (Teaching) | habilita | N25 (nuevos skills por demostración) |

## 5.7 Relaciones de protección y límite (protege, limita)

| Origen | Relación | Destino |
|---|---|---|
| N23 (Seguridad) | protege | todo el sistema |
| M0 (Safety) | protege | N05 (Mano), N06 (Brazo) |
| BUS LIMITS | limita | M0 (Safety), M6 (Reflex) |
| N09 (Costos) | limita | N10 (Mercado — pricing) |
| N08 (Especificaciones) | limita | N12 (Diferenciadores — claims verificables) |

## 5.8 Relaciones de visualización y operación (visualiza, opera, calibra)

| Origen | Relación | Destino |
|---|---|---|
| N29.02 (Live View) | visualiza | N21 (Control — estado en tiempo real) |
| N29.03 (Manual Control) | opera | N05 (Mano), N06 (Brazo) |
| Calibration Lab (pantalla) | calibra | N07 (Sensado), N22 (Estimación) |
| N33 (Data & Replay) | visualiza | datos históricos de N21 (Control) |

## 5.9 Relaciones de enseñanza y automatización (enseña, automatiza)

| Origen | Relación | Destino |
|---|---|---|
| N32 (Teaching) | enseña | N25 (nuevos skills) |
| N31.02 (Run Builder) | automatiza | secuencias de skills |
| N31.03 (AI Planner) | automatiza | planificación de tareas |
| N31.04 (Arm Planner) | automatiza | trayectorias del brazo |

## 5.10 Relaciones de integración (integra)

| Origen | Relación | Destino |
|---|---|---|
| N34.01 (SAP) | integra | ERP industrial |
| N34.02 (MES/SCADA) | integra | sistemas de manufactura |
| N34.03 (ROS 2 Ecosystem) | integra | ecosistema robótico estándar |
| N34.04 (Cloud/Analytics) | integra | procesamiento en la nube |
| N28 (HMI) | integra | N30 (ROS Bridge) con interfaz de usuario |

## 5.11 Relaciones de validación (valida)

| Origen | Relación | Destino |
|---|---|---|
| N08 (Especificaciones) | valida | N12 (Diferenciadores) |
| N11 (Benchmarks) | valida | N12 (Propuesta de valor) |
| N17 (Riesgos) | audita | N08, N09, N11, N25 |

---

# SECCION 6 — DATOS FALTANTES Y PENDIENTES

## 6.1 Datos mecánicos y físicos faltantes

| Dato faltante | Nodo afectado | Prioridad | Tipo |
|---|---|---|---|
| Peso total de la mano | N05 | Alta | Especificación |
| Peso total del brazo | N06 | Alta | Especificación |
| Materiales de fabricación (huesos, estructura) | N05 | Alta | Especificación |
| Fuerza de agarre máxima | N08 | Alta | Desempeño |
| Velocidad de cierre/apertura de la mano | N08 | Alta | Desempeño |
| Precisión de posicionamiento del brazo | N08 | Alta | Desempeño |
| Repetibilidad | N08 | Alta | Desempeño |
| Vida útil de los McKibben (ciclos) | N05.04 | Alta | Fiabilidad |
| Curvas presión-fuerza de McKibben | N24 | Alta | Modelo dinámico |
| Histeresis de McKibben | N24 | Media | Modelo dinámico |
| Respuesta temporal del McKibben | N24 | Alta | Modelo dinámico |
| Temperatura operativa del sistema | N08 | Media | Especificación |
| Torque por articulación del brazo | N06 | Alta | Especificación |
| Resolución y rango de sensores táctiles | N07 | Alta | Especificación |
| Latencia del sensado | N07 | Alta | Desempeño |

## 6.2 Datos de control faltantes

| Dato faltante | Nodo afectado | Prioridad | Tipo |
|---|---|---|---|
| Hardware de cómputo (procesador, FPGA, GPU) | N26 | Alta | Hardware |
| RTOS o Linux PREEMPT_RT | N26 | Alta | Software |
| DDS implementation (Fast-DDS, Cyclone) | N26 | Media | Software |
| Protocolo inter-módulo (DDS, shared memory) | N21 | Alta | Arquitectura |
| Latencia end-to-end medida | N21 | Alta | Desempeño |
| Algoritmo de estimación (EKF, UKF, etc.) | N22 | Alta | Algoritmo |
| Precisión de theta_hat vs encoder real | N22 | Alta | Validación |
| Drift acumulado en estimación | N22 | Alta | Validación |
| Estado de implementación de cada módulo M0-M9 | N21 | Alta | Estado |
| Active Inference: implementada o solo propuesta | N25 | Alta | Validación |
| Definición formal de categorías de skill | N25 | Media | Documentación |
| Número de skills definidos actualmente | N31 | Media | Estado |

## 6.3 Datos de producto y negocio faltantes

| Dato faltante | Nodo afectado | Prioridad | Tipo |
|---|---|---|---|
| BOM (Bill of Materials) detallado | N09 | Alta | Costos |
| Margen target | N09 | Alta | Negocio |
| Modelo de revenue (venta, lease, SaaS) | N09 | Alta | Negocio |
| TAM/SAM/SOM | N10 | Alta | Mercado |
| Prioridad entre mercados target | N10 | Media | Estrategia |
| Geografía target | N10 | Media | Mercado |
| Análisis competitivo formal con métricas | N11 | Alta | Estrategia |
| Timeline del roadmap | N15 | Alta | Planificación |
| Diferencias V1 vs V2 | N15 | Media | Producto |

## 6.4 Datos de software y HMI faltantes

| Dato faltante | Nodo afectado | Prioridad | Tipo |
|---|---|---|---|
| Deployment strategy (local, cloud, edge) | N28 | Media | Infraestructura |
| Latencia WebSocket medida | N30 | Alta | Desempeño |
| QoS configuration | N30 | Media | Configuración |
| WebSocket security (wss) | N30 | Media | Seguridad |
| Formato de datos para replay (rosbag2, HDF5) | N33 | Media | Formato |
| Almacenamiento de archivos (local, S3) | N33 | Media | Infraestructura |
| Protocolos industriales (OPC UA, MQTT) | N34 | Alta | Integración |
| Nivel de integración SAP | N34 | Media | Integración |
| Modelo de glove para teleop | N32 | Media | Hardware |
| Tipo de haptic feedback | N32 | Media | Hardware |

## 6.5 Datos documentales y organizacionales faltantes

| Dato faltante | Nodo afectado | Prioridad | Tipo |
|---|---|---|---|
| Brand book formal | N13 | Media | Documentación |
| Tipografía definida | N13 | Baja | Diseño |
| Owner de la base de datos | N20 | Media | Gobernanza |
| Cadencia de actualización | N20 | Media | Gobernanza |
| Partnerships académicos | N16 | Media | Relaciones |
| Certificaciones de seguridad (ISO) | N23 | Alta | Compliance |
| Testing de escenarios de fallo | N23 | Alta | Seguridad |

---

# SECCION 7 — RECOMENDACION DE EVOLUCION

## 7.1 Principios de evolución

1. **Modularidad:** Cada adición a la base de datos debe ser un nodo independiente con relaciones explícitas.
2. **Inmutabilidad de estructura:** Los 34 nodos L1 son estables. Nuevos temas se agregan como L2/L3 o como nuevos L1 si representan dominios completamente nuevos.
3. **Trazabilidad continua:** Cada nuevo dato debe incluir fuente, fecha de adición, nivel de confianza y marcador de certeza.
4. **Versionamiento semántico:** Versión del documento: MAJOR.MINOR.PATCH (cambios estructurales.cambios de contenido.correcciones).
5. **Separación datos-metadatos:** Mantener la separación entre hechos, claims, estimaciones, hipótesis y aspiraciones.

## 7.2 Próximos pasos recomendados

### Fase 1 — Validación (inmediata)

| Acción | Prioridad | Nodo(s) |
|---|---|---|
| Resolver conflicto de sensores (14 vs 19) | Alta | N05.06, N18.01 |
| Confirmar McKibben neumático vs hidráulico | Alta | N05.04, N18.02 |
| Documentar estado de implementación de cada M0-M9 | Alta | N21 |
| Medir latencia end-to-end del sistema de control | Alta | N21, N26 |
| Validar precisión de theta_hat sin encoder | Alta | N22 |

### Fase 2 — Completitud (corto plazo)

| Acción | Prioridad | Nodo(s) |
|---|---|---|
| Crear BOM detallado | Alta | N09 |
| Documentar especificaciones de desempeño medidas | Alta | N08 |
| Definir hardware de cómputo | Alta | N26 |
| Formalizar definición de skills | Media | N25, N31 |
| Crear análisis competitivo formal | Alta | N11 |
| Definir roadmap con timeline | Alta | N15 |

### Fase 3 — Expansión (mediano plazo)

| Acción | Prioridad | Nodo(s) |
|---|---|---|
| Agregar nodos para cada articulación individual | Media | N05 |
| Documentar modelo dinámico de McKibben | Alta | N24 |
| Agregar nodos de fabricación y ensamblaje | Media | N04 |
| Documentar protocolos de testing | Alta | N17, N23 |
| Crear nodo de PROPIEDAD_INTELECTUAL | Media | Nuevo L1 |
| Crear nodo de EQUIPO_Y_ORGANIZACION | Media | Nuevo L1 |

### Fase 4 — Migración (largo plazo)

| Acción | Prioridad | Nodo(s) |
|---|---|---|
| Migrar a Neo4j para knowledge graph nativo | Media | N14, N20 |
| Implementar API de consulta para la base de datos | Media | N14 |
| Conectar con la aplicación Control OS como fuente de verdad | Alta | N28 |
| Automatizar actualización de estado desde Supabase | Media | N20 |

## 7.3 Criterios de calidad para nuevas entradas

Cada nueva entrada debe incluir:

- [ ] node_id único dentro de la jerarquía
- [ ] parent_id que referencia un nodo existente
- [ ] nombre_canonico sin duplicados
- [ ] aliases (si existen)
- [ ] tipo_de_entidad de la taxonomía establecida
- [ ] eje (T, C, T+C)
- [ ] estatus con marcador de certeza
- [ ] confianza (alta, media, baja)
- [ ] fuente_del_corpus (referencia específica)
- [ ] al menos una relación con otro nodo
- [ ] preguntas_abiertas (si las hay)

---

# SECCION 8 — MATRIZ DE MODULOS DE CONTROL M0–M9

| Module | Rate_Hz | Class | Primary_Variable | Inputs | Outputs | Bus_In | Bus_Out | Can_Override | Overridden_By | Hardware | Latency | Implementation_Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **M0 Safety** | 1,000–5,000 | Safety/Guardian | p, \|F\|, limits | p, \|F\|, x_tac, BUS LIMITS | Emergency stop, pressure relief | BUS SENSORS, BUS LIMITS | BUS COMMANDS (override) | M1, M2, M3, M4, M5, M6, M7, M8, M9 | Ninguno | Sensores de presión, válvulas de alivio, E-stop (inferido) | <1ms (estimado) | Pendiente de validación |
| **M1 Pressure Servo** | 500–1,000 | Actuator Control | p (presión) | p (actual), p* (deseada) | Comandos de válvula | BUS SENSORS (p), BUS COMMANDS (p*) | Señales de actuación | Ninguno | M0, M6 | Sensores de presión, válvulas proporcionales (inferido) | 1-2ms (estimado) | Pendiente de validación |
| **M2 Tendon Force** | 200–500 | Force/Impedance | \|F\|, K, D | \|F\|, F*, K*, D* | p* (ref presión) | BUS SENSORS (\|F\|), BUS COMMANDS (F*, K*, D*) | BUS COMMANDS (p*) | M1 (vía p*) | M0, M6 | Sensores de fuerza (inferido) | 2-5ms (estimado) | Pendiente de validación |
| **M3 Proprioception** | 100–300 | State Estimation | theta_hat, omega_hat | p, \|F\|, x_tac | theta_hat, omega_hat | BUS SENSORS | BUS STATE | Ninguno | M0 | Sin hardware dedicado — computacional | 3-10ms (estimado) | Pendiente de validación |
| **M4 Vision** | 30 | Perception | Imagen | Frames de cámara | Detección, pose (inferido) | Cámara (external) | BUS STATE | Ninguno | M0 | Cámara (tipo no especificado) | 30-50ms (estimado) | Pendiente de validación |
| **M5 Fusion** | 60–120 | State Fusion | Estado fusionado | theta_hat, omega_hat, c_hat, T_obj_hat, w_hat, visual | Estado fusionado global | BUS STATE (estimaciones) | BUS STATE (fusionado) | Ninguno | M0 | Sin hardware dedicado — computacional | 8-16ms (estimado) | Pendiente de validación |
| **M6 Reflex** | 100–300 | Reflex/Safety | Acción reflexiva | BUS STATE, BUS LIMITS | Soltar, apretar, retractar | BUS STATE, BUS LIMITS | BUS COMMANDS (reflexive override) | M7 (override) | M0 | Sin hardware dedicado — computacional | 3-10ms (estimado) | Pendiente de validación |
| **M7 Policy** | 10–30 | Control Policy | F*, K*, D* | BUS STATE, SkillCmd | F*, K*, D* | BUS STATE, BUS COMMANDS (SkillCmd) | BUS COMMANDS (F*, K*, D*) | M2 (vía F*, K*, D*) | M0, M6 | GPU/CPU (inferido — Active Inference) | 33-100ms (estimado) | Hipótesis (Active Inference) |
| **M8 Language/Skills** | 0.5–5 | Skill Manager | SkillCmd | Lenguaje natural, skill defs, runs | SkillCmd | Interfaz usuario / API | BUS COMMANDS (SkillCmd) | M7 (vía SkillCmd) | M0, M6 | CPU / LLM (inferido) | 200-2000ms (estimado) | Pendiente de validación |
| **M9 Meta-Supervisor** | 0.1–1 | Supervisor | meta-actions | Estado global, métricas, alertas | meta-actions | Todos los buses | BUS COMMANDS (meta-actions) | Todos (reconfigura sistema) | M0 (safety override prevalece) | CPU | 1-10s (estimado) | Pendiente de validación |

### Notas sobre la matriz:

1. **Todas las latencias son estimadas** — no hay mediciones reales documentadas en el corpus.
2. **Todo el hardware es inferido** — el corpus no especifica hardware de cómputo ni sensores específicos.
3. **Implementation_Status:** Todos los módulos están como "Pendiente de validación" porque el corpus describe la arquitectura pero no confirma implementación operativa.
4. **M7 Policy** tiene estatus adicional de "Hipótesis" por la mención de Active Inference sin validación.
5. **La jerarquía de override es estricta:** M0 > M6 > M9 > M7 > M8 en términos de prioridad de seguridad.

---

# SECCION 9 — MAPA DE BUSES Y CONTRATOS DE SEÑAL

## 9.1 BUS SENSORS — Señales sensoriales crudas

| Variable | Símbolo | Tipo | Unidad (inferida) | Fuente | Frecuencia | Descripción |
|---|---|---|---|---|---|---|
| Presión | p | float | bar | Sensores de presión McKibben | 1-5 kHz | Presión interna de cada músculo McKibben |
| Magnitud de fuerza | \|F\| | float | N | Sensores de fuerza en tendones | 500-1000 Hz | Fuerza medida en cada tendón |
| Señal táctil | x_tac | float/vector | N/A | Sensores táctiles | 100-500 Hz (inferido) | Datos de los sensores táctiles (presión de contacto, forma, distribución) |

### Contrato del BUS SENSORS:

- **Productores:** Sensores físicos (presión, fuerza, táctil)
- **Consumidores:** M0 (Safety), M1 (Pressure Servo), M2 (Tendon Force), M3 (Proprioception)
- **Garantía:** Datos crudos, sin filtrar, con timestamp
- **Rate mínimo:** Igual o superior al consumidor más rápido (M0: 1-5 kHz para p)
- **Formato:** Pendiente de especificación (inferido: ROS 2 message types)

## 9.2 BUS STATE — Variables de estado estimadas

| Variable | Símbolo | Tipo | Unidad (inferida) | Fuente | Frecuencia | Descripción |
|---|---|---|---|---|---|---|
| Ángulo articular estimado | theta_hat | float | rad | M3 (Proprioception) | 100-300 Hz | Posición articular estimada sin encoder |
| Velocidad angular estimada | omega_hat | float | rad/s | M3 (Proprioception) | 100-300 Hz | Velocidad articular estimada |
| Contacto estimado | c_hat | bool/float | N/A | M3/M5 (inferido) | 60-300 Hz | Indicador de contacto con objeto |
| Par en objeto estimado | T_obj_hat | float | Nm | M5 (Fusion) | 60-120 Hz | Par/torque aplicado al objeto manipulado |
| Rigidez/peso del objeto | w_hat | float | N/m o kg | M5 (Fusion) | 60-120 Hz | Estimación de las propiedades del objeto |
| Datos visuales | visual_data | struct | N/A | M4 (Vision) | 30 Hz | Detección de objetos, poses (inferido) |

### Contrato del BUS STATE:

- **Productores:** M3 (theta_hat, omega_hat), M4 (visual_data), M5 (c_hat, T_obj_hat, w_hat, estado fusionado)
- **Consumidores:** M5 (Fusion — consume antes de fusionar), M6 (Reflex), M7 (Policy), M9 (Meta-Supervisor), HMI (Live View)
- **Garantía:** Variables estimadas con timestamp y posiblemente intervalos de confianza (inferido)
- **Rate mínimo:** Variable según el productor
- **Formato:** Pendiente de especificación

## 9.3 BUS LIMITS — Restricciones y umbrales

| Variable | Símbolo | Tipo | Unidad (inferida) | Fuente | Frecuencia | Descripción |
|---|---|---|---|---|---|---|
| Límite de presión máxima | p_max | float | bar | Configuración / M9 | Estático o bajo demanda | Presión máxima permitida por músculo |
| Límite de fuerza máxima | F_max | float | N | Configuración / M9 | Estático o bajo demanda | Fuerza máxima permitida por tendón |
| Límite de ángulo | theta_max | float | rad | Configuración | Estático | Rango articular máximo |
| Límite de velocidad | omega_max | float | rad/s | Configuración | Estático | Velocidad angular máxima |
| Límite de temperatura | T_max | float | °C | Configuración | Estático | Temperatura operativa máxima (inferido) |
| Modo operativo | mode | enum | N/A | M9 | Bajo demanda | Normal, reduced, emergency, calibration |

### Contrato del BUS LIMITS:

- **Productores:** Configuración del sistema, M9 (puede ajustar dinámicamente)
- **Consumidores:** M0 (Safety — comparación continua), M6 (Reflex — umbrales de activación)
- **Garantía:** Valores estáticos o cuasi-estáticos. Cambios infrecuentes.
- **Crítico:** M0 compara CADA lectura de BUS SENSORS contra BUS LIMITS a 1-5 kHz

## 9.4 BUS COMMANDS — Comandos y referencias

| Variable | Símbolo | Tipo | Unidad (inferida) | Fuente | Frecuencia | Descripción |
|---|---|---|---|---|---|---|
| Referencia de presión | p* | float | bar | M2 → M1 | 200-500 Hz | Presión deseada por músculo |
| Referencia de fuerza | F* | float | N | M7 → M2 | 10-30 Hz | Fuerza deseada por tendón |
| Referencia de rigidez | K* | float | N/m | M7 → M2 | 10-30 Hz | Rigidez de impedancia deseada |
| Referencia de amortiguamiento | D* | float | Ns/m | M7 → M2 | 10-30 Hz | Amortiguamiento de impedancia deseado |
| Comando de skill | SkillCmd | struct | N/A | M8 → M7 | 0.5-5 Hz | Skill a ejecutar con parámetros |
| Meta-acciones | meta-actions | struct | N/A | M9 | 0.1-1 Hz | Cambio de modo, recalibración, replanificación |
| Override de emergencia | emergency_cmd | struct | N/A | M0 | Instantáneo | Stop, release, shutdown |
| Override reflexivo | reflex_cmd | struct | N/A | M6 | 100-300 Hz | Soltar, apretar, retractar |

### Contrato del BUS COMMANDS:

- **Productores:** M0 (emergency), M2 (p*), M6 (reflex), M7 (F*, K*, D*), M8 (SkillCmd), M9 (meta-actions)
- **Consumidores:** M1 (p*), M2 (F*, K*, D*), M7 (SkillCmd), sistema completo (emergency, meta-actions)
- **Prioridad:** M0 emergency > M6 reflex > M9 meta > M7 policy > M8 skills
- **Garantía:** Comandos con timestamp y prioridad. Override por prioridad.

## 9.5 Diagrama de flujo de señales

```
SENSORES FÍSICOS
    │
    ▼
┌─────────────────┐
│   BUS SENSORS   │  p, |F|, x_tac
│   (1-5 kHz)     │
└────────┬────────┘
         │
    ┌────┼───────────────────────┐
    │    │                       │
    ▼    ▼                       ▼
┌──────┐ ┌──────┐           ┌──────┐
│  M0  │ │  M1  │◄──p*──── │  M2  │◄──F*,K*,D*──┐
│Safety│ │Press.│           │Tendon│               │
│1-5kHz│ │Servo │           │Force │               │
└──┬───┘ └──────┘           └──────┘               │
   │                             │                  │
   │  ┌──────────────────────────┘                  │
   │  │                                             │
   │  ▼                                             │
   │ ┌──────┐    ┌──────┐    ┌──────┐          ┌──────┐
   │ │  M3  │───▶│  M5  │───▶│  M6  │          │  M7  │
   │ │Propr.│    │Fusion│    │Reflex│──override▶│Policy│
   │ │100Hz │    │60Hz  │    │100Hz │          │10-30Hz│
   │ └──────┘    └──┬───┘    └──────┘          └───┬──┘
   │                │                               │
   │                │    ┌──────┐                    │
   │                │    │  M4  │              ┌─────┘
   │                │    │Vision│              │
   │                │    │ 30Hz │         ┌────┴───┐
   │                │    └──────┘         │   M8   │
   │                │                     │Lang/Sk.│
   │                │                     │0.5-5Hz │
   │                │                     └────┬───┘
   │                │                          │
   │          ┌─────┴────────────────────────┐ │
   │          │         BUS STATE            │ │
   │          │  theta_hat, omega_hat, c_hat │ │
   │          │  T_obj_hat, w_hat            │ │
   │          └──────────────────────────────┘ │
   │                                           │
   │               ┌──────────┐                │
   │               │    M9    │◄───────────────┘
   └──override──▶  │Meta-Sup. │
                   │ 0.1-1Hz  │
                   └──────────┘
```

---

# SECCION 10 — MAPA DE CONFLICTOS Y AMBIGUEDADES DE VERSION

## Conflicto 1: Número de sensores táctiles

| Aspecto | Detalle |
|---|---|
| **Conflicto** | El corpus principal indica "14 sensores táctiles" mientras que nodes.ts (descripción del subsistema de sensores) indica "19 donut-shaped air pressure sensors per finger" |
| **Fuente A** | dogma_master_prompt_profesional.txt: "14 sensores táctiles" |
| **Fuente B** | nodes.ts: "19 donut-shaped air pressure sensors per finger" |
| **Análisis** | Son dos datos incompatibles. "14 sensores táctiles" podría referirse a 14 zonas de sensado en toda la mano, mientras que "19 por dedo" implicaría 19 × 5 = 95 sensores, un número mucho mayor. Es posible que "14 sensores" sea una versión anterior o simplificada, y "19 donut-shaped per finger" sea una especificación más detallada posterior. También es posible que haya un error en uno de los documentos. |
| **Resolución requerida** | Confirmación del equipo de ingeniería. ¿Cuántos sensores hay realmente en el prototipo actual? |
| **Impacto** | Alto — afecta diseño de M3, M5, BUS SENSORS, y toda la estimación de estado. |
| **Estatus** | ABIERTO |

## Conflicto 2: McKibben hidráulico vs neumático

| Aspecto | Detalle |
|---|---|
| **Conflicto** | El corpus menciona "McKibben a 4 bar" y "pneumatic" en las referencias principales. Sin embargo, el término "hydraulic" aparece en algunos contextos del naming (e.g., la palabra "hydraulic" se ha mencionado en conversaciones previas como posibilidad). |
| **Fuente A** | dogma_master_prompt_profesional.txt: "McKibben a 4 bar", nodes.ts: "Braided pneumatic artificial muscles" |
| **Fuente B** | Menciones conversacionales de "hydraulic" (no encontradas textualmente en el corpus actual, pero referenciadas como conflicto conocido) |
| **Análisis** | La evidencia del corpus apunta fuertemente a neumático. McKibben a 4 bar es consistente con actuación neumática (presión de aire comprimido). La mención de hidráulico podría referirse a una versión futura o alternativa. 4 bar es una presión baja para hidráulica pero razonable para neumática. |
| **Resolución tentativa** | El sistema actual es NEUMÁTICO con alta probabilidad. Marcar hidráulico como posible alternativa futura. |
| **Impacto** | Alto — afecta diseño del sistema de suministro, selección de componentes, y seguridad. |
| **Estatus** | PARCIALMENTE RESUELTO (neumático como default) |

## Conflicto 3: Arquitectura formalizada vs implementada

| Aspecto | Detalle |
|---|---|
| **Conflicto** | La arquitectura M0-M9 se presenta como un diseño completo y coherente, pero no hay evidencia en el corpus de que todos los módulos estén implementados y operativos. |
| **Fuente A** | dogma_master_prompt_profesional.txt describe M0-M9 con frecuencias, variables y buses como si fuera un sistema operativo. |
| **Fuente B** | No hay menciones de testing, mediciones de latencia, o validación de los módulos en el corpus. |
| **Análisis** | Es probable que la arquitectura M0-M9 esté en diferentes niveles de madurez. Algunos módulos (M0 Safety, M1 Pressure Servo) son fundamentales y probablemente prioritarios. Otros (M7 Active Inference, M8 Language/Skills, M9 Meta-Supervisor) pueden ser más teóricos o aspiracionales. |
| **Resolución requerida** | Mapear el estado de implementación real de cada módulo: {teórico, en diseño, prototipado, implementado, validado}. |
| **Impacto** | Muy alto — fundamental para planificación de roadmap técnico. |
| **Estatus** | ABIERTO |

## Conflicto 4: Active Inference — validación científica

| Aspecto | Detalle |
|---|---|
| **Conflicto** | Active Inference se menciona como framework de control para M7 (Policy) pero no hay evidencia de implementación o validación experimental. |
| **Fuente A** | dogma_master_prompt_profesional.txt: implica Active Inference como parte de la arquitectura de control. |
| **Fuente B** | No hay papers, datos experimentales, ni código de Active Inference en el corpus. |
| **Análisis** | Active Inference es un framework teórico elegante (Karl Friston) pero su aplicación a control robótico en tiempo real es aún un área de investigación activa. La implementación práctica de Active Inference para control de manipulación a 10-30 Hz con los constraints de McKibben es un desafío significativo no trivial. Podría ser una aspiración a largo plazo más que una implementación actual. |
| **Resolución requerida** | ¿Es Active Inference el framework elegido? ¿Hay alternativas en consideración (RL, imitation learning, control clásico)? ¿Hay resultados experimentales? |
| **Impacto** | Alto — afecta la viabilidad del módulo M7 y toda la capa de políticas. |
| **Estatus** | ABIERTO |

## Conflicto 5: DOF de la mano — 20 vs 27

| Aspecto | Detalle |
|---|---|
| **Conflicto** | El corpus principal indica "20 DOF independientes" para la mano. Pero en nodes.ts, la descripción del Hand Mechanism dice "27-DOF biomimetic hand structure". |
| **Fuente A** | dogma_master_prompt_profesional.txt: "20 DOF independientes" |
| **Fuente B** | nodes.ts: "27-DOF biomimetic hand structure" |
| **Análisis** | La mano humana tiene aproximadamente 27 DOF anatómicos, pero no todos son independientes. Es posible que 27 DOF sea el conteo anatómico total y 20 DOF sea el conteo de DOF independientes/actuados. También es posible que 27 incluya la muñeca (3 DOF) + 20 de dedos + 4 de arcos palmares, aunque eso sumaría más. |
| **Resolución tentativa** | 27 DOF podría ser el total anatómico, 20 DOF los independientemente actuados. Requiere confirmación. |
| **Impacto** | Medio — afecta diseño de actuadores y control. |
| **Estatus** | ABIERTO |

## Tabla resumen de conflictos

| # | Conflicto | Severidad | Estatus | Resolución tentativa |
|---|---|---|---|---|
| 1 | Sensores: 14 vs 19 per finger | Alta | ABIERTO | Confirmar con ingeniería |
| 2 | McKibben: neumático vs hidráulico | Alta | PARCIALMENTE RESUELTO | Neumático (alta probabilidad) |
| 3 | Arquitectura: formalizada vs implementada | Muy alta | ABIERTO | Mapear estado por módulo |
| 4 | Active Inference: validación | Alta | ABIERTO | Clasificar como hipótesis |
| 5 | DOF mano: 20 vs 27 | Media | ABIERTO | 27 total, 20 independientes (hipótesis) |

---

# SECCION 11 — SECUENCIA DE IMPLEMENTACION TECNICA

## 11.1 Principio de secuenciación

La implementación sigue una lógica bottom-up: desde los sensores y actuadores más básicos hasta las capas de inteligencia más altas. Cada fase tiene prerequisitos (dependencias) y gates de validación que deben cumplirse antes de avanzar.

## 11.2 Secuencia detallada

### FASE 0 — Hardware base + Sensores + M0 Safety

| Aspecto | Detalle |
|---|---|
| **Descripción** | Montaje de hardware base, integración de sensores, implementación de M0 Safety. |
| **Componentes** | Estructura mecánica, McKibben muscles, sensores de presión, sensores táctiles, válvulas, E-stop. |
| **Módulos** | M0 Safety (1-5 kHz) |
| **Bus** | BUS SENSORS (p, \|F\|, x_tac), BUS LIMITS (configuración estática) |
| **Dependencias** | Hardware mecánico ensamblado, sensores instalados y calibrados. |
| **Gate de validación** | M0 detiene el sistema ante sobrepresión. BUS SENSORS publica a ≥1 kHz. E-stop funcional. Sensores leen valores coherentes. |
| **Riesgo** | Sensores defectuosos, McKibben con fugas, E-stop no fiable. |

### FASE 1 — M1 Pressure Servo

| Aspecto | Detalle |
|---|---|
| **Descripción** | Control de presión de bajo nivel para cada músculo McKibben. |
| **Módulos** | M1 Pressure Servo (500-1000 Hz) |
| **Bus** | Consume: BUS SENSORS (p), BUS COMMANDS (p*). Publica: señales de actuación. |
| **Dependencias** | FASE 0 completa. Válvulas proporcionales funcionales. BUS SENSORS operativo. |
| **Gate de validación** | M1 sigue referencia p* con error <5% (estimado como target). Respuesta temporal <2ms (estimado). M0 puede override M1 en todo momento. |
| **Riesgo** | No-linealidad de válvulas, delay en la neumática. |

### FASE 2 — Calibración + M2 Tendon Force/Impedance

| Aspecto | Detalle |
|---|---|
| **Descripción** | Calibración de la relación presión-fuerza de los McKibben. Implementación de control de fuerza e impedancia. |
| **Módulos** | M2 Tendon Force/Impedance (200-500 Hz) |
| **Bus** | Consume: BUS SENSORS (\|F\|), BUS COMMANDS (F*, K*, D*). Publica: BUS COMMANDS (p*). |
| **Dependencias** | FASE 1 completa. Sensores de fuerza en tendones calibrados. Modelo presión-fuerza de McKibben caracterizado. |
| **Gate de validación** | M2 sigue referencia F* con error aceptable. Control de impedancia K*, D* funcional. M0 puede override. Modelo inverso p* = f(F*, K*, D*) funcional. |
| **Riesgo** | Histeresis del McKibben, modelo presión-fuerza inexacto, compliance variable difícil de calibrar. |
| **CRÍTICO** | Esta fase requiere un modelo dinámico del McKibben (curvas, histeresis, temperatura) que no está documentado en el corpus. |

### FASE 3 — M3 Proprioception

| Aspecto | Detalle |
|---|---|
| **Descripción** | Estimación propioceptiva sin encoders. Cálculo de theta_hat y omega_hat. |
| **Módulos** | M3 Proprioception (100-300 Hz) |
| **Bus** | Consume: BUS SENSORS. Publica: BUS STATE (theta_hat, omega_hat). |
| **Dependencias** | FASE 2 completa. Modelo cinemático de la mano. Relación presión/fuerza → posición articular. |
| **Gate de validación** | theta_hat accuracy: ¿comparación con qué ground truth? (PROBLEMA: no hay encoders). Posibles métodos: comparación visual, motion capture externo, o marcadores. omega_hat coherente con derivada de theta_hat. |
| **Riesgo** | **MUY ALTO** — la validación de la propiocepción sin encoder externo es el desafío más significativo. Sin ground truth, ¿cómo se valida? |
| **CRÍTICO** | Definir método de validación de theta_hat. Opciones: (1) encoders temporales solo para validación, (2) motion capture externo, (3) cámara + vision. |

### FASE 4 — M5 Fusion + M4 Vision (parcial)

| Aspecto | Detalle |
|---|---|
| **Descripción** | Fusión multi-modal de todas las estimaciones. Integración parcial de visión. |
| **Módulos** | M5 Fusion (60-120 Hz), M4 Vision (30 Hz — parcial) |
| **Bus** | M5 consume: BUS STATE (todas las estimaciones). Publica: BUS STATE (estado fusionado). M4 publica: BUS STATE (datos visuales). |
| **Dependencias** | FASE 3 completa. Cámara(s) instalada(s). Pipeline de visión básico. |
| **Gate de validación** | Estado fusionado coherente y estable. EWMA smoothing reduce ruido sin lag excesivo. Datos visuales enriquecen la estimación de estado. |
| **Riesgo** | Latencia de fusión, conflictos entre modalidades sensoriales, calibración de tiempos entre sensores de diferente rate. |

### FASE 5 — M6 Reflex

| Aspecto | Detalle |
|---|---|
| **Descripción** | Implementación de reflejos biomecánicos. |
| **Módulos** | M6 Reflex (100-300 Hz) |
| **Bus** | Consume: BUS STATE, BUS LIMITS. Publica: BUS COMMANDS (reflexive override). |
| **Dependencias** | FASE 4 completa. Estado fusionado fiable. BUS LIMITS configurado. |
| **Gate de validación** | Reflejos activan correctamente ante: sobrefuerza, contacto inesperado, pérdida de agarre, exceso de velocidad. M6 override M7 correctamente. M0 override M6 correctamente. |
| **Riesgo** | False positives (reflejos innecesarios), false negatives (reflejos que no activan). |

### FASE 6 — M7 Policy

| Aspecto | Detalle |
|---|---|
| **Descripción** | Implementación de políticas de control de alto nivel. |
| **Módulos** | M7 Policy (10-30 Hz) |
| **Bus** | Consume: BUS STATE, BUS COMMANDS (SkillCmd). Publica: BUS COMMANDS (F*, K*, D*). |
| **Dependencias** | FASE 5 completa. Al menos un skill definido. Framework de policy elegido (Active Inference vs alternativa). |
| **Gate de validación** | M7 genera F*, K*, D* coherentes para skills básicos (abrir/cerrar mano, agarrar objeto simple). M6 puede override M7. Ejecución estable a 10-30 Hz. |
| **Riesgo** | Active Inference puede no ser viable para el timeline del proyecto. Alternativa: control clásico o imitation learning como fallback. |
| **CRÍTICO** | Decisión sobre Active Inference vs alternativa antes de esta fase. |

### FASE 7 — M8 Language/Skills

| Aspecto | Detalle |
|---|---|
| **Descripción** | Gestión de skills y interfaz de lenguaje. |
| **Módulos** | M8 Language/Skills (0.5-5 Hz) |
| **Bus** | Consume: interfaz de usuario / API. Publica: BUS COMMANDS (SkillCmd). |
| **Dependencias** | FASE 6 completa. Catálogo de skills definido. Interfaz de usuario (HMI) operativa. |
| **Gate de validación** | Skills se ejecutan correctamente a través de M8 → M7 → M2 → M1. Secuencias de skills (runs) ejecutan en orden. Interfaz de lenguaje natural funcional (si se implementa). |
| **Riesgo** | Complejidad de la gestión de estados entre skills, manejo de errores mid-run. |

### FASE 8 — M9 Meta-Supervisor

| Aspecto | Detalle |
|---|---|
| **Descripción** | Supervisión global del sistema. |
| **Módulos** | M9 Meta-Supervisor (0.1-1 Hz) |
| **Bus** | Consume: todos los buses. Publica: BUS COMMANDS (meta-actions). |
| **Dependencias** | FASE 7 completa. Métricas de rendimiento definidas. Modos operativos definidos. |
| **Gate de validación** | M9 detecta degradación del sistema. M9 inicia recalibración cuando es necesario. M9 cambia modo operativo correctamente. M0 prevalece sobre M9 en emergencias. |
| **Riesgo** | Falsa alarma vs no-detección de problemas. |

### FASE 9 — HMI completo + Integraciones

| Aspecto | Detalle |
|---|---|
| **Descripción** | Integración completa de la HMI (todas las pantallas) y las integraciones empresariales. |
| **Módulos** | N28-N34 (todas las pantallas HMI), integraciones SAP, MES/SCADA. |
| **Dependencias** | FASES 0-8 completas. rosbridge operativo. Supabase configurado. |
| **Gate de validación** | Todas las 13 pantallas funcionales. Datos en tiempo real visibles en Live View. Manual Control opera el robot. Skills Library y Run Builder funcionales. Teleop Mode funcional con glove. Data & Replay graba y reproduce. Integraciones conectan con sistemas externos. |
| **Riesgo** | Latencia de WebSocket, estabilidad del rosbridge, seguridad de la interfaz. |

## 11.3 Diagrama de dependencias

```
FASE 0: Hardware + Sensores + M0
    │
    ▼
FASE 1: M1 Pressure Servo
    │
    ▼
FASE 2: Calibración + M2 Tendon Force ←── [Modelo dinámico McKibben REQUERIDO]
    │
    ▼
FASE 3: M3 Proprioception ←── [Método de validación sin encoder REQUERIDO]
    │
    ▼
FASE 4: M5 Fusion + M4 Vision (parcial)
    │
    ▼
FASE 5: M6 Reflex
    │
    ▼
FASE 6: M7 Policy ←── [Decisión Active Inference vs alternativa REQUERIDA]
    │
    ▼
FASE 7: M8 Language/Skills
    │
    ▼
FASE 8: M9 Meta-Supervisor
    │
    ▼
FASE 9: HMI completo + Integraciones
```

## 11.4 Decisiones bloqueantes

| Decisión | Fase bloqueada | Impacto | Urgencia |
|---|---|---|---|
| Número real de sensores (14 vs 19 vs 95) | FASE 0 | Diseño de BUS SENSORS y M3 | INMEDIATA |
| Modelo dinámico de McKibben | FASE 2 | Calibración de M2, modelo inverso | ALTA |
| Método de validación de theta_hat | FASE 3 | Toda la propiocepción computacional | ALTA |
| Active Inference vs alternativa | FASE 6 | Diseño de M7, skills, learning | MEDIA |
| Hardware de cómputo | FASE 0-1 | Particionamiento RT vs non-RT | ALTA |

---

# SECCION 12 — MODELO DOCUMENTAL DE LA APLICACION DE CONTROL

## 12.1 Identidad de la aplicación

| Campo | Valor |
|---|---|
| **Nombre** | DOGMA Robotics Control OS v1.0 |
| **Tipo** | HMI / Control Console / Dashboard Operativo |
| **Propósito** | Interfaz humano-máquina para operar, monitorear, programar y configurar el sistema robótico DOGMA |
| **Stack** | Next.js 16 (App Router, Turbopack), React, TypeScript |
| **Backend** | Supabase (Postgres, Auth, Realtime) |
| **AI Engine** | OpenClaw gateway (localhost:18789, /v1/chat/completions) + Claude API (Anthropic) fallback |
| **3D Engine** | Three.js |
| **Robot Comms** | RosBridge WebSocket → ROS 2 Jazzy |
| **Theme** | Dark mode only. Paleta: bg #030308, gold #C8A74B, text #C8C4BC |
| **Versión actual** | v2 (monolito 2500 líneas) en transición a v3 (modular 15+ archivos) |

## 12.2 Roles de usuario

| Rol | Permisos | Descripción |
|---|---|---|
| **Operator** | Ejecutar runs, teleop básico, ver datos, Live View | Operador de planta que ejecuta programas pre-definidos |
| **Engineer** | Todo Operator + crear/editar skills, calibración, configuración avanzada, debugging | Ingeniero que programa y calibra el robot |
| **Admin** | Todo Engineer + gestión de permisos, agentes, integraciones, API keys, políticas | Administrador del sistema con acceso completo |

## 12.3 Páginas de la aplicación (13 pantallas)

### 12.3.1 Command Center

| Campo | Valor |
|---|---|
| **Nombre** | Command Center |
| **Ruta** | / (inferido: dashboard principal) |
| **Rol mínimo** | Operator |
| **Descripción** | Dashboard central con vista general del sistema. Resumen de subsistemas, tareas críticas, alertas, pilotos, finanzas. |
| **Datos mostrados** | Subsystems maturity, Tasks (critical/high), Pilots pipeline, Finance (burn rate, runway), Incidents |
| **ROS Topics** | Estado general del sistema (inferido) |
| **Supabase tables** | subsystems, tasks, pilots, finance_snapshots, incidents |
| **Componentes** | NodeBoard (Monday-like table), ThreeViz (3D neural network) |
| **Acciones** | Ver, filtrar, expandir detalle de cualquier entidad |

### 12.3.2 Live View

| Campo | Valor |
|---|---|
| **Nombre** | Live View |
| **Ruta** | /live-view (inferido) |
| **Rol mínimo** | Operator |
| **Descripción** | Visualización en tiempo real del estado del robot: presiones, fuerzas, posiciones estimadas, contacto, temperatura. |
| **Datos mostrados** | BUS SENSORS (p, \|F\|, x_tac), BUS STATE (theta_hat, omega_hat, c_hat), alertas M0/M6 |
| **ROS Topics** | Todos los topics de BUS SENSORS y BUS STATE |
| **Supabase tables** | N/A (datos en tiempo real via WebSocket) |
| **Componentes** | Gráficas RT, 3D hand visualization, indicadores de estado |
| **Acciones** | Observar, pausar streaming, zoom en señales específicas |

### 12.3.3 Manual Control

| Campo | Valor |
|---|---|
| **Nombre** | Manual Control |
| **Ruta** | /manual-control (inferido) |
| **Rol mínimo** | Engineer |
| **Descripción** | Control directo del robot. Sliders de presión/fuerza por músculo/tendón. Presets de posturas. |
| **Datos mostrados** | Estado actual + controles de referencia (p*, F*, K*, D*) |
| **ROS Topics** | Topics de comando (BUS COMMANDS) |
| **Supabase tables** | N/A (control directo) |
| **Componentes** | Sliders, botones de preset, visualización 3D de la mano |
| **Acciones** | Enviar comandos individuales, activar presets, E-stop |

### 12.3.4 AI Planner

| Campo | Valor |
|---|---|
| **Nombre** | AI Planner |
| **Ruta** | /ai-planner (inferido) |
| **Rol mínimo** | Engineer |
| **Descripción** | Planificación de tareas asistida por AI. Interfaz de chat con agentes AI que pueden proponer y ejecutar secuencias de acciones. |
| **Datos mostrados** | Contexto del sistema, historial de conversación, mutaciones propuestas |
| **ROS Topics** | SkillCmd (BUS COMMANDS) |
| **Supabase tables** | tasks, subsystems (contexto para el agente) |
| **Componentes** | ChatPanel (streaming), mutaciones con aprobación |
| **Dependencias** | OpenClaw gateway, Claude API fallback, 11 agentes definidos |
| **Acciones** | Chat con agente, aprobar/rechazar mutaciones, ejecutar skills |

### 12.3.5 Arm Planner

| Campo | Valor |
|---|---|
| **Nombre** | Arm Planner |
| **Ruta** | /arm-planner (inferido) |
| **Rol mínimo** | Engineer |
| **Descripción** | Planificación de trayectorias del brazo 6-DOF. Definición de waypoints, interpolación, ejecución. |
| **Datos mostrados** | Posición actual del brazo, waypoints, trayectoria planificada |
| **ROS Topics** | Topics de trayectoria del brazo (inferido) |
| **Supabase tables** | N/A (o tabla de trayectorias guardadas — inferido) |
| **Componentes** | Visualización 3D del brazo, editor de waypoints |
| **Acciones** | Definir waypoints, planificar trayectoria, ejecutar, guardar |

### 12.3.6 Skills Library

| Campo | Valor |
|---|---|
| **Nombre** | Skills Library |
| **Ruta** | /skills-library (inferido) |
| **Rol mínimo** | Operator (ver) / Engineer (crear/editar) |
| **Descripción** | Catálogo de skills disponibles. Categorías: Arm, Grasp, Manipulation, Assembly, Sensing, Interaction, Utility. |
| **Datos mostrados** | Lista de skills con nombre, categoría, parámetros, historial de ejecución |
| **ROS Topics** | N/A (metadata, no RT) |
| **Supabase tables** | skills (inferido) |
| **Componentes** | Lista categorizada, detalle de skill, editor de parámetros |
| **Acciones** | Ver, ejecutar, editar parámetros, crear nuevo skill |

### 12.3.7 Run Builder

| Campo | Valor |
|---|---|
| **Nombre** | Run Builder |
| **Ruta** | /run-builder (inferido) |
| **Rol mínimo** | Engineer |
| **Descripción** | Compositor de secuencias de skills. Drag-and-drop de skills en timeline para crear runs. |
| **Datos mostrados** | Skills disponibles, timeline del run, parámetros por step |
| **ROS Topics** | SkillCmd secuencial |
| **Supabase tables** | runs (inferido) |
| **Componentes** | Timeline editor, skill selector, parámetros por step |
| **Acciones** | Componer run, reordenar skills, configurar parámetros, guardar, ejecutar |

### 12.3.8 Teleop Mode

| Campo | Valor |
|---|---|
| **Nombre** | Teleop Mode |
| **Ruta** | /teleop (inferido) |
| **Rol mínimo** | Engineer |
| **Descripción** | Teleoperation con glove/haptic. El operador controla la mano robótica con su propia mano a través de un guante háptico. Teaching by demonstration. |
| **Datos mostrados** | Estado de la mano robótica, estado del glove, fuerza de feedback, recording status |
| **ROS Topics** | Topics de glove input, robot state, haptic feedback |
| **Supabase tables** | N/A (RT) / recordings (metadata) |
| **Componentes** | Dual hand visualization (human + robot), recording controls, haptic feedback display |
| **Acciones** | Iniciar teleop, grabar demostración, detener, convertir grabación en skill |

### 12.3.9 Calibration Lab

| Campo | Valor |
|---|---|
| **Nombre** | Calibration Lab |
| **Ruta** | /calibration (inferido) |
| **Rol mínimo** | Engineer |
| **Descripción** | Herramientas de calibración de sensores, actuadores y estimadores de estado. |
| **Datos mostrados** | Datos crudos de sensores, curvas de calibración, offsets, gains |
| **ROS Topics** | BUS SENSORS (datos crudos), servicios de calibración |
| **Supabase tables** | calibration_profiles (inferido) |
| **Componentes** | Gráficas de calibración, controles de ajuste, wizard de calibración |
| **Acciones** | Ejecutar rutina de calibración, ajustar parámetros, guardar perfil, validar |

### 12.3.10 Data & Replay

| Campo | Valor |
|---|---|
| **Nombre** | Data & Replay |
| **Ruta** | /data-replay (inferido) |
| **Rol mínimo** | Engineer |
| **Descripción** | Grabación, almacenamiento y reproducción de sesiones del robot. Análisis de datos históricos. |
| **Datos mostrados** | Lista de grabaciones, timeline de replay, gráficas de señales históricas |
| **ROS Topics** | Todos (durante grabación/replay) |
| **Supabase tables** | recordings (metadata), finance_snapshots (exportable) |
| **Componentes** | Recording manager, timeline player, gráficas multi-señal, export button |
| **Acciones** | Grabar sesión, reproducir, buscar, analizar, exportar CSV |

### 12.3.11 Safety & Diagnostics

| Campo | Valor |
|---|---|
| **Nombre** | Safety & Diagnostics |
| **Ruta** | /safety (inferido) |
| **Rol mínimo** | Engineer (ver) / Admin (configurar) |
| **Descripción** | Configuración de límites de seguridad (BUS LIMITS), historial de alertas, diagnósticos del sistema. |
| **Datos mostrados** | BUS LIMITS actuales, historial de M0/M6 activaciones, diagnósticos de cada módulo |
| **ROS Topics** | Topics de seguridad, alertas, diagnósticos |
| **Supabase tables** | incidents, safety_events (inferido) |
| **Componentes** | Panel de límites editables, historial de incidentes, diagnóstico por módulo |
| **Acciones** | Configurar límites, ver historial, ejecutar diagnósticos, crear incidente |

### 12.3.12 Settings

| Campo | Valor |
|---|---|
| **Nombre** | Settings |
| **Ruta** | /settings (inferido) |
| **Rol mínimo** | Operator (ver propios) / Admin (editar todo) |
| **Descripción** | Configuración del sistema: cuenta, permisos, políticas de agentes, conexiones, API keys, OpenClaw config. |
| **Datos mostrados** | Account info, role, permissions, agent policies, API keys status, gateway status |
| **ROS Topics** | N/A (configuración) |
| **Supabase tables** | users, settings, organizations |
| **Componentes** | SettingsPanel con tabs: Account, Permissions, Agent Policy, Connections, API Keys, OpenClaw |
| **Acciones** | Editar nombre/role, configurar agentEditPolicy (direct/approval/readonly), gestionar API keys, configurar OpenClaw |

### 12.3.13 Integrations

| Campo | Valor |
|---|---|
| **Nombre** | Integrations |
| **Ruta** | /integrations (inferido) |
| **Rol mínimo** | Admin |
| **Descripción** | Gestión de integraciones empresariales: SAP S/4HANA, MES/SCADA, ROS 2 Ecosystem, Cloud/Analytics. |
| **Datos mostrados** | Estado de cada integración, configuración, logs |
| **ROS Topics** | N/A (APIs externas) |
| **Supabase tables** | integrations (inferido) |
| **Componentes** | Lista de integraciones, status indicators, configuración por integración |
| **Acciones** | Activar/desactivar, configurar, testear conexión, ver logs |

## 12.4 Sistema de agentes AI

| Aspecto | Detalle |
|---|---|
| **Cantidad** | 11 agentes definidos |
| **Categorías** | strategy, implementation, quality, operations |
| **Fuente de datos** | OpenClaw gateway (localhost:18789) con Claude API fallback |
| **Protocolo** | /v1/chat/completions (OpenAI-compatible) |
| **Contexto** | Todos los datos de Supabase se inyectan en el system prompt del agente |
| **Mutaciones** | Los agentes pueden proponer cambios a la base de datos |
| **Políticas** | direct (aplica inmediatamente), approval (cola de aprobación), readonly (rechazado) |
| **Configuración** | Settings → Agent Policy |

### Estructura de un agente (AgentDef)

```typescript
interface AgentDef {
  id: string
  name: string
  icon: string
  color: string
  category: 'strategy' | 'implementation' | 'quality' | 'operations'
  description: string
  soulPrompt: string
  skills: string[]
  toolPolicy: 'ask' | 'record' | 'ignore'
  allowedTools: string[]
  deniedTools: string[]
  computerAccess: {
    shell: boolean
    fileRead: boolean
    fileWrite: boolean
    browser: boolean
    canvas: boolean
    cron: boolean
    network: boolean
  }
}
```

## 12.5 Modelo de persistencia (Supabase)

### Tablas confirmadas

| Tabla | Descripción | Campos clave |
|---|---|---|
| **subsystems** | Subsistemas de hardware/software | name, description, maturity_level, status, criticality, owner |
| **tasks** | Tareas de ingeniería y negocio | title, description, progress, status, priority, owner, due_date, criticality, tags |
| **pilots** | Pilotos industriales | company_name, stage, viability_score, champion_name, risk_level |
| **investors** | Pipeline de fundraising | name, stage, check_size, contact |
| **incidents** | Incidentes y problemas | title, severity, status, root_cause, owner |
| **finance_snapshots** | Snapshots financieros | month, burn_rate, runway_months, cash_balance |
| **milestones** | Hitos clave | title, progress, due_date, status, owner |
| **supply_chain** | Cadena de suministro | item, vendor, status, lead_time, cost |
| **comments** | Comentarios por entidad | entity_type, entity_id, author, text, created_at, organization_id |
| **organizations** | Organizaciones | id (referenced by comments) |

### Schema additions (MIGRATION.md)

```sql
-- Comments table (works for any entity)
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  author TEXT NOT NULL DEFAULT 'Jero',
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  organization_id UUID REFERENCES organizations(id)
);
CREATE INDEX idx_comments_entity ON comments(entity_type, entity_id);

-- Additional columns for tasks
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS criticality TEXT DEFAULT 'medium';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS owner TEXT DEFAULT 'Jero';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Additional columns for subsystems
ALTER TABLE subsystems ADD COLUMN IF NOT EXISTS criticality TEXT DEFAULT 'medium';
ALTER TABLE subsystems ADD COLUMN IF NOT EXISTS owner TEXT DEFAULT 'Jero';
ALTER TABLE subsystems ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
```

## 12.6 Arquitectura de archivos (v3 target)

```
src/
├── lib/
│   ├── types.ts          — All TypeScript interfaces
│   ├── theme.ts          — Dark theme colors
│   ├── nodes.ts          — Node tree config + column definitions
│   ├── agents.ts         — 11 agent definitions
│   └── auth.ts           — Auth helpers
├── hooks/
│   ├── useOpenClaw.ts    — Gateway health + chat proxy
│   ├── useNodeData.ts    — CRUD hook for any node's data
│   └── useComments.ts    — Comment thread hook
├── components/
│   ├── ui/
│   │   ├── Badge.tsx         — Status/priority/criticality badges
│   │   ├── ProgressBar.tsx   — Colored progress bar with %
│   │   ├── EditableCell.tsx  — Click-to-edit text/number/select
│   │   ├── CommentThread.tsx — Threaded comments per entity
│   │   ├── CodeBlock.tsx     — Code with copy button
│   │   ├── MsgText.tsx       — Markdown-lite renderer
│   │   └── TypeWriter.tsx    — Letter-by-letter animation
│   └── dashboard/
│       ├── TopBar.tsx        — Search + user pill + settings button
│       ├── Sidebar.tsx       — Collapsible node tree
│       ├── NodeBoard.tsx     — Monday-like table for any node
│       ├── TaskDetail.tsx    — Expanded task view
│       ├── ChatPanel.tsx     — Agent chat with streaming
│       ├── SettingsPanel.tsx — Account, permissions, agent policies
│       ├── OpenClawPanel.tsx — Gateway capabilities page
│       ├── DesignGuide.tsx   — Brand guidelines + images
│       └── ThreeViz.tsx      — 3D neural network visualization
└── app/
    ├── dashboard/page.tsx    — Thin wrapper composing components
    └── api/
        ├── chat/route.ts     — OpenClaw proxy + Claude fallback
        ├── data/route.ts     — Generic CRUD for any Supabase table
        └── comments/route.ts — Comment CRUD
```

## 12.7 User flows principales

### Flow 1: Operador ejecuta un run pre-definido

```
1. Login → Command Center (dashboard general)
2. Navigate → Skills Library → seleccionar run existente
3. Revisar parámetros del run
4. Navigate → Run Builder → ver secuencia de skills
5. Click "Execute" → sistema entra en modo ejecución
6. Navigate → Live View → monitorear ejecución en tiempo real
7. Run completes → ver resultados en Data & Replay
```

### Flow 2: Ingeniero enseña un nuevo skill por teleop

```
1. Login → Teleop Mode
2. Conectar glove háptico
3. Click "Start Recording"
4. Ejecutar la manipulación deseada con el glove
5. Click "Stop Recording"
6. Revisar grabación en Data & Replay
7. Navigate → Skills Library → "Convert Recording to Skill"
8. Nombrar skill, asignar categoría, definir parámetros
9. Testear skill → Manual Control o Run Builder
```

### Flow 3: Admin configura integraciones

```
1. Login → Settings → Connections
2. Seleccionar integración (SAP, MES/SCADA)
3. Configurar endpoint, credenciales, mapeo de datos
4. "Test Connection" → verificar conectividad
5. Navigate → Integrations → activar integración
6. Monitorear logs de integración
```

### Flow 4: Ingeniero calibra el sistema

```
1. Login → Calibration Lab
2. Seleccionar tipo de calibración (sensores, actuadores, estimadores)
3. Ejecutar wizard de calibración
4. Sistema aplica estímulos controlados y registra respuestas
5. Revisar curvas de calibración
6. Ajustar parámetros si es necesario
7. Guardar perfil de calibración
8. Validar con test de coherencia
```

### Flow 5: Agente AI propone cambios

```
1. Ingeniero abre AI Planner
2. Selecciona agente (e.g., "Coder" o "Strategy")
3. Describe tarea en lenguaje natural
4. Agente recibe contexto completo del sistema (datos de Supabase en system prompt)
5. Agente responde con análisis y propone mutaciones
6. Si agentEditPolicy == 'approval':
   - Mutaciones van a cola de aprobación
   - Ingeniero revisa y aprueba/rechaza
7. Si agentEditPolicy == 'direct':
   - Mutaciones se aplican inmediatamente
8. Cambios se reflejan en los boards correspondientes
```

## 12.8 Diseño visual

| Aspecto | Valor |
|---|---|
| **Background principal** | #030308 (near-black con tinte azul) |
| **Background layers** | #060610, #0A0A18, #0E0E20 (gradación sutil) |
| **Borders** | #1A1A35 (bordes tenues) |
| **Acento primario (gold)** | #C8A74B |
| **Gold glow** | rgba(200,167,75,0.06) |
| **Texto primario** | #C8C4BC (warm off-white) |
| **Texto secundario** | #6E6A84 (muted purple) |
| **Texto terciario** | #444060 (very muted) |
| **Verde (success/active)** | #2D7A5D |
| **Rojo (error/critical)** | #8A3333 |
| **Ámbar (warning/high)** | #A78530 |
| **Azul (info/medium)** | #3A5A7A |
| **Cyan (low priority)** | #3A7A7A |

### Criticality colors

| Nivel | Color |
|---|---|
| critical | #8A3333 (rojo oscuro) |
| high | #A78530 (ámbar) |
| medium | #3A5A7A (azul) |
| low | #3A7A7A (cyan) |

### Status colors

| Estado | Color |
|---|---|
| active | #2D7A5D (verde) |
| planned | #3A5A7A (azul) |
| blocked | #8A3333 (rojo) |
| done | #444060 (gris) |
| todo | #6E6A84 (muted) |
| in_progress | #C8A74B (gold) |
| review | #A78530 (ámbar) |

---

# APENDICE A — GLOSARIO DE TERMINOS CLAVE

| Término | Definición |
|---|---|
| **DOGMA** | Nombre del proyecto. Manos humanoides biomiméticas musculoesqueléticas. |
| **McKibben** | Músculo artificial neumático de malla trenzada (braided pneumatic artificial muscle). |
| **Tendón** | Cable/cuerda que transmite fuerza del McKibben a la articulación. Relación 1:1 con músculo. |
| **DOF** | Degrees of Freedom — grados de libertad de movimiento. |
| **theta_hat** | Estimación del ángulo articular (sin encoder). |
| **omega_hat** | Estimación de velocidad angular articular. |
| **c_hat** | Estimación de contacto con objeto. |
| **T_obj_hat** | Estimación de par/torque aplicado al objeto. |
| **w_hat** | Estimación de rigidez o peso del objeto. |
| **p** | Presión interna del músculo McKibben (medida). |
| **p*** | Presión de referencia (deseada) — comando de M2 a M1. |
| **\|F\|** | Magnitud de fuerza en tendón (medida). |
| **F*** | Fuerza de referencia — comando de M7 a M2. |
| **K*** | Rigidez de impedancia deseada. |
| **D*** | Amortiguamiento de impedancia deseado. |
| **x_tac** | Señal del sensor táctil. |
| **SkillCmd** | Comando de skill de M8 a M7. |
| **meta-actions** | Acciones de nivel meta de M9 (cambio de modo, recalibración). |
| **EWMA** | Exponentially Weighted Moving Average — filtro de suavizado. |
| **Active Inference** | Framework de Karl Friston para percepción y acción basado en minimización de energía libre. Hipótesis en DOGMA. |
| **BUS SENSORS** | Bus de señales sensoriales crudas (p, \|F\|, x_tac). |
| **BUS STATE** | Bus de variables de estado estimadas (theta_hat, omega_hat, etc.). |
| **BUS LIMITS** | Bus de restricciones y umbrales operativos. |
| **BUS COMMANDS** | Bus de comandos y referencias (p*, F*, K*, D*, SkillCmd, meta-actions). |
| **rosbridge** | Paquete ROS que expone topics/servicios via WebSocket. |
| **ROS 2 Jazzy** | Distribución de ROS 2 usada en DOGMA. |
| **Supabase** | Backend-as-a-Service (Postgres, Auth, Realtime) usado por la aplicación Control OS. |
| **OpenClaw** | Gateway de AI local (localhost:18789) para los agentes de la aplicación. |
| **Run** | Secuencia de skills que se ejecuta como una misión completa. |
| **Skill** | Unidad de comportamiento del robot (e.g., "agarrar objeto", "mover a posición"). |
| **Sub-skill** | Componente primitivo de un skill. |

---

# APENDICE B — INDICE DE FUENTES DEL CORPUS

| ID | Fuente | Tipo | Ubicación | Contenido principal |
|---|---|---|---|---|
| SRC-01 | dogma_master_prompt_profesional.txt | Corpus principal | /dogma-os/ | Identidad, filosofía, naming, specs, control M0-M9, buses, HMI, skills, pricing, competencia |
| SRC-02 | ARCHITECTURE.md | Arquitectura software | /dogma-os/dogma-v3/ | Stack v3, file structure, key files |
| SRC-03 | MIGRATION.md | Plan de migración | /dogma-os/dogma-v3/ | 5 fases de refactorización, NodeBoard, TaskDetail, Settings, Agent integration |
| SRC-04 | nodes.ts | Código fuente | /dogma-os/src/lib/nodes.ts | Árbol de nodos, columnas de tablas, subsistemas |
| SRC-05 | types.ts | Código fuente | /dogma-os/src/lib/types.ts | Interfaces TypeScript: NodeDef, Task, Comment, ChatMessage, AgentDef, etc. |
| SRC-06 | theme.ts | Código fuente | /dogma-os/src/lib/theme.ts | Paleta de colores, criticality/status colors |

---

**FIN DEL DOCUMENTO**

**Versión:** 1.0
**Compilado:** 2026-03-24
**Nodos L1:** 34 | **Nodos L2:** 115 | **Nodos L3:** 42 | **Total:** 191
**Conflictos abiertos:** 5
**Datos faltantes catalogados:** 48+
**Fuentes del corpus:** 6
**Marcador de integridad:** Ningún dato inventado. Todos los datos marcados con nivel de certeza.
