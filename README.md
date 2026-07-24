# Sistema CRM -- Frontend Portal Institucional

> **GUIA DE DESPLIEGUE PASO A PASO:**
> Consulta la [Guia de Despliegue (deployment.md)](deployment.md) para publicar el Frontend en Docker, Vercel u otro proveedor de hosting.

**Portal Web Institucional de la Carrera de Computacion · UPS Cuenca**, construido con **React 19**, **TypeScript**, **Vite** y **Tailwind CSS v4**. Consume el backend **Strapi v5** para contenido dinamico y formularios de contacto.

---

## Stack Tecnológico

| Tecnología | Uso |
|---|---|
| React 18 | UI declarativa con hooks |
| TypeScript | Tipado estático en todo el proyecto |
| Vite | Bundler y servidor de desarrollo |
| Tailwind CSS | Utilidades CSS |
| React Router v6 | Enrutamiento SPA con carga diferida |
| Fetch API nativa | Comunicación con el backend |

---

## Inicio Rápido

```bash
npm install
cp .env.example .env.local     # Edita con la URL del backend
npm run dev
```

El sitio queda disponible en: `http://localhost:5173`

---

## Scripts Disponibles

```bash
npm run dev           # Servidor de desarrollo con HMR
npm run build         # Build de producción en dist/
npm run preview       # Previsualiza el build de producción localmente
npm run lint          # ESLint en todo el proyecto
npm run type-check    # Verifica TypeScript sin emitir
```

---

## Variables de Entorno

| Variable | Descripción | Valor en desarrollo | Valor en producción |
|---|---|---|---|
| `VITE_API_BASE_URL` | URL base del backend Strapi (con o sin `/api`) | `http://localhost:1337/api` | `https://api.tu-dominio.com/api` |

> En producción, si `VITE_API_BASE_URL` apunta a `localhost` o `127.0.0.1`, el sistema lo ignora y usa `/api` relativo automáticamente.

---

## Estructura del Proyecto

```
src/
│
├── app/                               ─── Punto de entrada y enrutamiento
│   ├── App.tsx                         Rutas, providers, Suspense + lazy loading
│   ├── main.tsx                        ReactDOM.createRoot → monta la SPA
│   └── pages/
│       └── NotFoundPage.tsx            Página 404
│
├── features/                           ─── Módulos por dominio de negocio
│   │
│   ├── landing/                        Portal institucional público
│   │   ├── components/
│   │   │   ├── Hero.tsx                Banner con carrusel de imágenes + typing animation
│   │   │   ├── ViveLaCarrera.tsx       Carrusel de publicaciones académicas
│   │   │   ├── CasosExito.tsx          Cards de testimonios de egresados
│   │   │   ├── GruposInvestigacion.tsx Grupos de investigación de la carrera
│   │   │   ├── Agrupaciones.tsx        Grupos ASU (Asociación de Estudiantes)
│   │   │   ├── Alianzas.tsx            Logos de alianzas académicas
│   │   │   ├── Empresas.tsx            Carrusel de empresas colaboradoras
│   │   │   └── SocialLinks.tsx         Botones de redes sociales reutilizable
│   │   ├── hooks/
│   │   │   ├── useLandingData.ts       Carga centralizada de TODOS los datos
│   │   │   └── useCarouselControls.ts  Scroll circular + animaciones FLIP
│   │   ├── pages/
│   │   │   └── HomePage.tsx            Ensamble de todas las secciones
│   │   ├── services/
│   │   │   └── landing.service.ts      Fetch: slides, publicaciones, grupos, etc.
│   │   └── types/
│   │       └── landing.types.ts        Interfaces de dominio
│   │
│   ├── admisiones/                     Captación de interesados
│   │   ├── components/
│   │   │   └── SolicitudInformacion.tsx Formulario con validación + estados
│   │   ├── hooks/
│   │   │   └── useAdmisiones.ts        useAsyncSubmit + registrarInteresado
│   │   ├── pages/
│   │   │   └── InteresadosPage.tsx     Vista completa con layout
│   │   ├── services/
│   │   │   └── admisiones.service.ts   Sanitiza → POST /leads/submit
│   │   └── types/
│   │       └── admisiones.types.ts     InteresadoFormData
│   │
│   └── vinculacion/                    Vinculación empresarial
│       ├── components/
│       │   └── TrabajaConNosotros.tsx   Formulario de vinculación
│       ├── hooks/
│       │   └── useVinculacion.ts       useAsyncSubmit + registrarEmpresa
│       ├── services/
│       │   └── vinculacion.service.ts  Sanitiza → POST /company-requests
│       └── types/
│           └── vinculacion.types.ts    EmpresaFormData
│
├── components/                         ─── Componentes compartidos
│   ├── common/
│   │   ├── SeoHead.tsx                 Meta tags SEO dinámicos por página
│   │   └── ToastContainer.tsx          Notificaciones toast (éxito/error/warning/info)
│   └── layout/
│       ├── Navbar.tsx                  Navegación + menú móvil + modo oscuro
│       ├── Footer.tsx                  Pie de página institucional
│       ├── ScrollToTop.tsx             Auto-scroll en cambio de ruta
│       └── ScrollToTopButton.tsx       Botón flotante "volver arriba"
│
├── lib/                                ─── Infraestructura técnica reutilizable
│   ├── api/
│   │   ├── client.ts                   Cliente HTTP: fetch + timeout + AbortController
│   │   ├── endpoints.ts                Rutas de API (fuente única de verdad)
│   │   ├── strapi.ts                   Tipos y helpers para Strapi v5
│   │   └── index.ts                    Barrel de exportaciones
│   ├── config/
│   │   ├── env.ts                      Normalización inteligente de VITE_API_BASE_URL
│   │   └── constants.ts                Datos institucionales, nav items, hero config
│   ├── hooks/
│   │   ├── useAsyncSubmit.ts           Hook genérico: idle → loading → success | error
│   │   ├── useFormState.ts             Estado de formularios + validación por campo
│   │   └── index.ts                    Barrel
│   ├── notifications/
│   │   ├── NotificationContext.tsx     Provider global de toasts
│   │   ├── notification-context.ts     Definición del contexto
│   │   ├── useNotifications.ts         Hook consumidor
│   │   └── index.ts                    Barrel
│   ├── security/
│   │   └── sanitize.ts                 sanitizeText · sanitizeEmail · sanitizePhone
│   ├── types/
│   │   └── api.types.ts                AsyncState, ApiError
│   └── validation/
│       ├── rules.ts                    required, email, minLength, digits, maxLength
│       ├── schemas.ts                  admisionesSchema · vinculacionSchema
│       └── index.ts                    Barrel
│
├── styles/
│   └── index.css                       Tailwind v4, tokens, dark mode, responsive fixes
│
├── public/                             Favicon, logo UPS, imágenes estáticas
├── index.html                          Plantilla HTML base (meta SEO, Google Fonts)
├── vite.config.ts                      Plugins: React + Tailwind, alias @/ → src/
├── vercel.json                         Rewrites SPA + security headers (CSP, HSTS)
├── tsconfig.json                       Configuración TypeScript
└── .env.example                        Plantilla de variables de entorno
```

---

## Features — Descripción Detallada

### `features/landing`

Página principal del sitio web institucional. Carga y muestra contenido dinámico desde el backend Strapi.

**Secciones que consume:**

| Sección | Endpoint Strapi | Descripción |
|---|---|---|
| Hero / Banner | `/hero-slides` | Diapositivas del banner principal con imágenes |
| Grupos de Investigación | `/research-groups` | Listado ordenado por `orden` |
| Grupos ASU | `/asu-groups` | Grupos de la Asociación de Estudiantes |
| Alianzas | `/alliances` | Empresas e instituciones aliadas |
| Empresas colaboradoras | `/companies` | Directorio de empresas |
| Casos de éxito | `/success-cases` | Testimonios de egresados |
| Publicaciones | `/publications` | Publicaciones académicas recientes |
| Contenido dinámico | `/landing-content` | Textos y configuración de secciones |

**Páginas:**
- `HomePage.tsx` — Ensamble completo de la landing con todas las secciones

**Servicio:**
- `landing.service.ts` — Métodos `getHeroSlides()`, `getResearchGroups()`, `getPublications()`, etc.

---

### `features/admisiones`

Formulario de solicitud de información para futuros estudiantes interesados en la carrera.

**Flujo:**
1. El usuario completa el formulario (nombre, correo, teléfono, interés, institución)
2. El frontend valida y sanitiza los datos antes de enviar
3. Se hace `POST /api/leads/submit` al backend
4. El backend guarda el prospecto, envía confirmación al usuario y notifica al equipo de admisiones
5. El frontend muestra un mensaje de éxito o error

**Campos del formulario:**

| Campo | Validación |
|---|---|
| Nombre completo | Requerido, mínimo 3 caracteres |
| Teléfono | Requerido, 10 dígitos numéricos |
| Correo electrónico | Requerido, formato email válido |
| Dónde nos conociste (evento) | Requerido |
| Institución educativa | Opcional |
| Programa de interés | Opcional |
| Observaciones | Opcional, máximo 1000 caracteres |

**Componentes:**
- `SolicitudInformacion.tsx` — Formulario completo con validación y estados de carga/éxito/error

**Hook:**
- `useAdmisiones.ts` — Envuelve `useAsyncSubmit` con `registrarInteresado`

**Servicio:**
- `admisiones.service.ts` — Sanitiza y normaliza el payload, llama a `ENDPOINTS.ADMISIONES.CREATE`

**Página:**
- `InteresadosPage.tsx` — Vista completa del formulario con layout

---

### `features/vinculacion`

Formulario para empresas e instituciones que deseen vincularse con la Carrera de Computación.

**Flujo:**
1. La empresa completa el formulario (empresa, contacto, correo, teléfono, mensaje)
2. El frontend valida y sanitiza los datos
3. Se hace `POST /api/company-requests` al backend
4. El backend guarda la solicitud, envía confirmación a la empresa y notifica al responsable de vinculación
5. El frontend muestra un mensaje de éxito o error

**Campos del formulario:**

| Campo | Validación |
|---|---|
| Nombre de la empresa | Requerido |
| Nombre del contacto | Requerido |
| Correo electrónico | Requerido, formato email válido |
| Teléfono | Requerido, 10 dígitos numéricos |
| Mensaje / propuesta | Requerido, mínimo 10 caracteres |

**Componentes:**
- `TrabajaConNosotros.tsx` — Formulario de vinculación con validación y estados

**Servicio:**
- `vinculacion.service.ts` — Sanitiza el payload y llama a `ENDPOINTS.VINCULACION.CREATE`

---

## Capa `lib` — Descripción Detallada

### `lib/api/client.ts`

Cliente HTTP personalizado basado en `fetch` nativo.

- **Timeout automático**: 10 segundos (configurable por request)
- **AbortController**: cancela requests que exceden el timeout
- **Manejo de errores**: detecta errores de Strapi y los normaliza como `HttpApiError`
- **Content-Type automático**: agrega `application/json` si el body no es vacío
- **Sin credenciales de browser**: `credentials: 'omit'` para evitar envío de cookies

```typescript
// Uso
apiClient.get<TipoRespuesta>('/endpoint')
apiClient.post<TipoRespuesta>('/endpoint', payload)
```

### `lib/api/endpoints.ts`

Única fuente de verdad para las rutas de la API. Todos los servicios deben usar estas constantes en lugar de strings hardcodeados.

```typescript
ENDPOINTS.ADMISIONES.CREATE     // '/leads/submit'
ENDPOINTS.VINCULACION.CREATE    // '/company-requests'
ENDPOINTS.LANDING.HERO_SLIDES   // '/hero-slides'
// ... etc
```

### `lib/api/strapi.ts`

Tipos TypeScript y helpers para trabajar con respuestas de Strapi v5:

| Export | Descripción |
|---|---|
| `StrapiSingleResponse<T>` | Tipo para respuestas de un solo item |
| `StrapiCollectionResponse<T>` | Tipo para listados con paginación |
| `StrapiCreatePayload<T>` | Tipo para body de creación `{ data: T }` |
| `strapiMediaUrl()` | Convierte URL relativa de media a URL absoluta |
| `withPopulate()` | Agrega `?populate=*` al endpoint |
| `withSort()` | Agrega parámetros de ordenamiento |

### `lib/hooks/useAsyncSubmit.ts`

Hook genérico para cualquier formulario con envío asíncrono.

```typescript
const { state, submitForm, reset } = useAsyncSubmit(serviceFn, {
  defaultErrorMessage: 'Error al enviar'
})

// state.status: 'idle' | 'loading' | 'success' | 'error'
// state.error: string | null
```

### `lib/hooks/useFormState.ts`

Hook para gestionar el estado de formularios con validación por campo.

### `lib/security/sanitize.ts`

Sanitización de datos antes de enviarlos al backend (primera capa — el backend también sanitiza):

```typescript
sanitizeText(value, maxLength)  // Elimina HTML, control chars, limita longitud
sanitizeEmail(value)            // sanitizeText + lowercase, máx 254 chars
sanitizePhone(value)            // sanitizeText + solo dígitos/+()- 
```

### `lib/validation/`

Sistema de validación declarativa por esquemas:

```typescript
// rules.ts — Reglas individuales reutilizables
rules.required('Mensaje de error')
rules.email()
rules.minLength(3, 'Mínimo 3 caracteres')
rules.digits(10, 'Debe tener 10 dígitos')

// schemas.ts — Esquemas completos por formulario
admisionesSchema   // Validaciones del formulario de interesados
vinculacionSchema  // Validaciones del formulario de empresas
```

---

## Enrutamiento

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `HomePage` | Landing page principal |
| `/interesados` | `InteresadosPage` | Formulario de solicitud de información |
| `*` | `NotFoundPage` | Página 404 |

Las páginas se cargan de forma diferida (`lazy`) para optimizar el tiempo de carga inicial.

---

## Producción

### Requisitos antes de desplegar

```bash
# 1. Verificar tipado sin errores
npm run type-check

# 2. Verificar calidad de código
npm run lint

# 3. Generar build
npm run build

# 4. Verificar el build localmente
npm run preview
```

### Variables de entorno en producción

```env
VITE_API_BASE_URL=https://api.tu-dominio.com/api
```

### Deploy en Vercel

El proyecto incluye `vercel.json` con headers de seguridad configurados. Solo necesitas conectar el repositorio en Vercel y configurar la variable `VITE_API_BASE_URL`.

---

## Seguridad

| Medida | Implementación |
|---|---|
| Sanitización de formularios | `lib/security/sanitize.ts` — antes de cada envío |
| Sin credenciales de browser | `credentials: 'omit'` en el cliente HTTP |
| Headers de seguridad | Configurados en `vercel.json` para producción |
| Timeout en peticiones | 10s por defecto, evita requests colgados |
| Validación client-side | `lib/validation/` — previene envíos inválidos |

---

## Agregar una Nueva Feature

1. Crear carpeta en `src/features/nueva-feature/` con:
   ```text
   components/    Componentes React del módulo
   hooks/         Hooks específicos del módulo
   services/      Lógica de comunicación con la API
   types/         Tipos TypeScript del módulo
   pages/         (opcional) Páginas/vistas
   index.ts       Barrel de exportaciones
   ```
2. Agregar el endpoint en `src/lib/api/endpoints.ts`
3. Agregar la ruta en `src/app/App.tsx` si es una página nueva
4. Usar helpers de `lib/` para sanitización, validación y estado del formulario
