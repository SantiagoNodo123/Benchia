# Benchia — Real-Time Competitive Intelligence & Market Radar

Benchia es una plataforma moderna de inteligencia competitiva y radar de mercado en tiempo real diseñada para fundadores, directores de marketing (CMO) y estrategas de producto. Permite auditar cualquier nicho de mercado en segundos, monitorear anuncios activos en Meta Ad Library y Google Ads, rastrear posiciones orgánicas en Google SERP, geolocalizar competidores en Google Maps y generar contra-estrategias defensivas y ofensivas.

---

## ⚡ Capacidades Principales

1. **Radar de Mercado por Nicho en Tiempo Real**:
   - Análisis inmediato de tamaño de mercado (TAM), tasa de crecimiento (CAGR), nivel de saturación y CPC promedio.
   - Detección automatizada de líderes y retadores con cuota de mercado, velocidad de anuncios y tecnología subyacente.

2. **Comparativa Head-to-Head (Battlecards)**:
   - Matriz frente a frente entre 2 competidores auditando precios, volumen de tráfico, ángulos de pauta, puntos fuertes y vulnerabilidades.
   - Posibilidad de agregar competidores personalizados para comparar cualquier empresa en tiempo real.

3. **Inteligencia Publicitaria (Meta Ad Library & Google Ads)**:
   - Inspección de copys, formatos (UGC, Reels, Carrusel, Estáticos), ganchos psicológicos, llamadas a la acción (CTA) y días activos.
   - Enlace directo a la biblioteca oficial de anuncios de Meta para verificación.

4. **Auditoría SERP & Google Maps**:
   - Rastreo de posiciones orgánicas #1 a #10 en Google Search, Domain Authority y brechas de palabras clave de baja dificultad.
   - Mapeo geográfico interactivo de sedes, centros regionales y calificación promedio en reseñas de Google Maps.

5. **Predicciones & Señales de Alerta Temprana**:
   - Radar predictivo con proyecciones a 30-180 días de demanda, guerras de precios y cambios de canales.
   - Generador de contra-estrategias: produce titulares de alto impacto, copys para Google Search y guiones de video UGC en 1 clic.

6. **Benchia Copilot & Centro de Exportación**:
   - Asesor conversacional contextualizado con los datos del nicho.
   - Exportación de datasets a formato CSV (Excel / Google Sheets), JSON y resúmenes ejecutivos en Markdown.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Recharts
- **Backend / Servidor**: Node.js, Express, TSX, esbuild
- **Inteligencia Artificial & Grounding**: Google GenAI SDK (`@google/genai`), Gemini 3.7 Flash, Google Search Grounding

---

## 🚀 Inicio Rápido

### Requisitos Previos
- **Node.js** (v18 o superior)
- **npm** o gestor de paquetes compatible

### Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/SantiagoNodo123/Benchia.git
   cd Benchia
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura tu variable de entorno:
   Crea un archivo `.env` en la raíz (puedes basarte en `.env.example`):
   ```env
   GEMINI_API_KEY="tu_clave_de_api_de_gemini"
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre tu navegador en `http://localhost:3000`.

### Compilación para Producción

```bash
npm run build
npm start
```

