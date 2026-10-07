# CENTRO TERAPÉUTICO SIGLO XXI
## Especificación de Proyecto & Plataforma Clínica Digital
**Ubicación:** Jr. Sociego, Chachapoyas (Barrio La Laguna), Amazonas - Perú  
**Contacto Directo:** +51 941 996 388  
**Enfoque:** Rehabilitación Funcional, Biomecánica Activa y Soporte Biopsicosocial del Dolor  

---

## 1. Misión y Visión Institucional

### Misión
Brindar servicios de fisioterapia, kinesiología y rehabilitación integral de vanguardia en la ciudad de Chachapoyas, combinando agentes físicos de alta gama, terapia manual avanzada y acompañamiento psicológico clínico para restaurar la función musculoesquelética sin dependencia prolongada de fármacos.

### Visión
Consolidarse como el centro de referencia en salud neuromuscular y bienestar en la región Amazonas, destacando por protocolos terapéuticos basados en evidencia científica, calidez humana e integración interdisciplinaria biopsicosocial.

---

## 2. Cartera de Servicios Clínicos

1. **Tratamiento de Dolor Ciático y Afecciones Lumbares:**
   - Descompresión radicular no invasiva.
   - Estabilización del core lumbopélvico y ejercicios de control motor.
   - Agentes bioeléctricos y magnéticos para reducción de edema perineural.

2. **Rehabilitación de Esguinces y Lesiones Articulares:**
   - Protocolo PEACE & LOVE para fases agudas y subagudas (tobillo, rodilla, muñeca).
   - Reeducación propioceptiva y neuromuscular en cadenas cinéticas abiertas y cerradas.
   - Drenaje de edema articular y regeneración ligamentosa guiada.

3. **Cervicalgias y Síndrome de Dolor Cuello-Hombro:**
   - Alivio de tortícolis, radiculopatías cervicales y síndrome cruzado superior.
   - Tratamiento de patologías de manguito rotador y capsulitis adhesiva.
   - Reeducación postural y descompresión cervicodorsal.

4. **Lesiones Deportivas y Readaptación Funcional:**
   - Desgarros miofasciales, contracturas deportivas, tendinopatías rotulianas y aquíleas.
   - Retorno seguro a la actividad (Return to Play) con reentrenamiento funcional excéntrico.
   - Prevención de recidivas y corrección biomecánica de gestos deportivos.

5. **Contracturas Musculares y Puntos Gatillo Miofasciales:**
   - Terapia manual instrumentalizada y percusión de tejido profundo.
   - Termoterapia profunda y desactivación de puntos gatillo activos y latentes.
   - Alivio de sobrecargas posturales de origen laboral o tensional.

---

## 3. Equipamiento Clínico de Alta Gama

| Equipo | Principio Fisioterapéutico | Aplicación Clínica y Beneficios |
| :--- | :--- | :--- |
| **Ecam Magnet** | Magnetoterapia pulsátil de baja y media frecuencia | Estimula la repolarización de la membrana celular, acelera la osteogénesis y callo óseo, potente efecto antiinflamatorio profundo y regeneración de cartílago y ligamentos. |
| **TENS 7000** | Electroestimulación transcutánea analgésica de precisión | Bloqueo aferente del estímulo del dolor en asta dorsal de la médula (Teoría de la Compuerta - Gate Control) y estimulación de endorfinas endógenas; electroanalgesia selectiva sin efectos secundarios. |
| **Pistolas de Percusión Miofascial** | Vibración terapéutica mecánica de alta frecuencia y penetración focal | Descompresión de la fascia muscular profunda, aumento del flujo sanguíneo local (hiperemia), disolución de adherencias y relajación de nódulos miofasciales tensionales. |

---

## 4. Equipo Profesional Interdisciplinario

- **Lic. en Terapia Física y Rehabilitación:**
  - Evaluación biomecánica funcional, goniometría, prescripción de kinesioterapia activa y dosificación de agentes físicos.
- **Lic. en Psicología Clínica:**
  - Abordaje cognitivo-conductual del dolor crónico, manejo de kinesiofobia (miedo al movimiento), técnicas de desensibilización central y modulación del estrés somatizado.
- **Técnico Auxiliar en Fisioterapia:**
  - Asistencia continua en la preparación del paciente, colocación de agentes físicos, monitorización de confort y seguimiento de ejercicios terapéuticos asistidos.

---

## 5. El Modelo Biopsicosocial: ¿Por qué Fisioterapia + Psicología?

El modelo biomédico tradicional trata el dolor como un daño mecánico puramente biológico. En el **Centro Terapéutico Siglo XXI**, entendemos que el dolor persistente involucra circuitos neurofisiológicos vinculados al estrés, la ansiedad y el catastrofismo del dolor. 
- La combinación de **biomecánica activa** con **regulación psicológica del sistema nervioso simpático** rompe el círculo vicioso:
  $$\text{Dolor} \rightarrow \text{Miedo/Estrés} \rightarrow \text{Tensión Muscular Aumentada} \rightarrow \text{Isquemia Local} \rightarrow \text{Más Dolor}$$
- Los pacientes logran un alivio más rápido, disminuyen el riesgo de cronificación y recuperan su autonomía funcional con mayor confianza y bienestar general.

---

## 6. Datos de Localización y Contacto

- **Dirección:** Jr. Sociego, Chachapoyas (Barrio La Laguna), Amazonas, Perú.
- **Teléfono / WhatsApp Oficial:** [+51 941 996 388](https://wa.me/51941996388)
- **Horarios:** Lunes a Viernes de 08:00 a 19:30 | Sábados de 08:30 a 14:00.
- **Modalidad:** Citas presenciales programadas con triage y valoración biomecánica inicial.

---

## 7. Arquitectura del Portal y Plataforma Web

- **Framework:** Next.js 16 (App Router, Turbopack, React 19).
- **Estilos:** Tailwind CSS v4 con paleta médica sobria (Slate, Emerald clínico, Azul noche naval).
- **Iconografía:** Lucide React.
- **Componentes Clave:**
  - *Navbar / Header institucional*: Navegación ancla + botón "Portal Paciente".
  - *Hero Section*: Propuesta de valor médica, credibilidad funcional y CTA triage.
  - *Triage / Pre-Evaluación Interactiva*: Selector anatómico-patológico + Escala EVA (1-10) con coloración dinámica y enlace inteligente a WhatsApp.
  - *Equipamiento de Alta Gama*: Fichas técnicas de Ecam Magnet, TENS 7000 y Percusión Miofascial.
  - *Enfoque Interdisciplinario*: Biomecánica + Psicoterapia para el manejo del dolor y desensibilización central.
  - *Servicios Clínicos Especializados*: Desglose de patologías tratadas.
  - *Sección Ubicación / Barrio La Laguna*: Datos de contacto, mapa y horarios.
  - *Footer institucional*: Políticas de consentimiento informado y confidencialidad médica.
