# Finanzas — App de finanzas personales

Next.js 14 + Tailwind CSS + Supabase. Dashboard, plan de ahorro, deudas, tabla de ahorro mensual, gastos por categoría y metas.

## 1. Crear el proyecto en Supabase

1. Ve a https://supabase.com y crea un proyecto gratuito.
2. En el **SQL Editor**, pega y ejecuta todo el contenido de `supabase/schema.sql`.
3. Ve a **Project Settings → API** y copia:
   - `Project URL`
   - `anon public key`

## 2. Configurar el proyecto localmente

```bash
npm install
cp .env.local.example .env.local
```

Edita `.env.local` y pega tu URL y anon key de Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

```bash
npm run dev
```

Abre http://localhost:3000

## 3. Desplegar en línea (para poder abrirla desde tu iPhone)

La forma más simple es con **Vercel** (gratis):

1. Sube esta carpeta a un repositorio de GitHub.
2. Entra a https://vercel.com, conecta tu cuenta de GitHub e importa el repo.
3. En "Environment Variables" agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (los mismos valores de tu `.env.local`).
4. Despliega. Vercel te da una URL pública, ej: `https://finanzas-tuusuario.vercel.app`.

## 4. Instalar como app en tu iPhone

1. Abre la URL de Vercel en **Safari** (no Chrome).
2. Toca el ícono de **Compartir**.
3. Toca **"Agregar a pantalla de inicio"**.

Como el proyecto ya incluye `manifest.json` y las etiquetas de PWA, se abrirá en pantalla completa como una app real, y tus datos vivirán en Supabase — no se pierden aunque borres el ícono o cambies de celular.

## 5. Íconos de la app (opcional)

Agrega tus propios íconos en `public/icon-192.png` y `public/icon-512.png` (192×192 y 512×512 px) para que se vean en la pantalla de inicio del iPhone en vez del ícono genérico.

## Estructura del proyecto

```
app/
  page.js          → Dashboard
  ahorro/page.js   → Plan de ahorro
  deudas/page.js   → Tarjetas de crédito
  tabla/page.js    → Tabla de ahorro mensual
  gastos/page.js   → Gastos por categoría
  metas/page.js    → Metas de ahorro
components/
  Shell.jsx        → Navegación (sidebar / barra inferior)
  ui.jsx           → Card, Input reutilizables
lib/
  supabaseClient.js
  constants.js
supabase/
  schema.sql       → Tablas y políticas de Supabase
```

## Siguientes pasos sugeridos

- Agregar autenticación de Supabase si vas a usar la app con más de una persona.
- Soportar sueldo distinto por mes en la tabla de ahorro.
- Notificaciones push para fechas límite de pago de tarjetas.
