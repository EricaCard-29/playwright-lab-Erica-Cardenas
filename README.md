# Laboratorio de automatización con Playwright y TypeScript

## Datos del estudiante
- Nombre: Erica Yulied Cardenas Ortiz
- Asignatura: Ingeniería de Software III - Universidad Libre

## 1. Lo que hicimos en clase
En clase desarrollamos la guía de laboratorio en siete partes, usando como aplicación de práctica SauceDemo (https://www.saucedemo.com), una tienda en línea ficticia. Cada parte se apoyó en la anterior: empezamos con una prueba sencilla y terminamos con una suite organizada, mantenible y con evidencias.

## 2. Reto integrador
## 2.1 Página escogida
- URL: https://docs.thecatapi.com/es/
- Por qué: es un sitio de documentación público, estable, sin CAPTCHA ni inicio de sesión, con navegación clara (menú superior, tarjetas, barra lateral, paginación y cambio de idioma). No requiere datos personales ni credenciales.

## 2.2 Historias de usuario

**HU-01 Navegación principal**
Como desarrollador que visita la documentación
Quiero usar el menú superior (Docs, API Reference, Blog)
Para llegar rápido a la sección que necesito

Criterios de aceptación:
- Escenario: portada visible. Dado que abro la portada, entonces veo el título "The Cat API" y el menú con Docs, API Reference y Blog.
- Escenario: ir a Docs. Cuando hago clic en "Docs", entonces veo la página "Primeros pasos".
- Escenario: ir a API Reference. Cuando hago clic en "API Reference", entonces veo la referencia "TheCatAPI".
- Escenario: ir al Blog. Cuando hago clic en "Blog", entonces veo la página del blog.

**HU-02 Explorar los ejemplos**
Como desarrollador
Quiero abrir los ejemplos desde la portada y moverme entre páginas vecinas
Para aprender cómo se usa cada endpoint

Criterios de aceptación:
- Escenario: tarjeta de razas. Cuando hago clic en "Explora razas de gatos", entonces veo "Trabajando con Razas".
- Escenario: siguiente. Dado que estoy en "Trabajando con Razas", cuando hago clic en "Siguiente", entonces veo "Votos y Favoritos".
- Escenario: anterior. Dado que estoy en "Votos y Favoritos", cuando hago clic en "Anterior", entonces veo "Trabajando con Razas".

**HU-03 Cambio de idioma**
Como desarrollador que prefiere inglés
Quiero cambiar el idioma de la documentación
Para leerla en mi idioma

Criterios de aceptación:
- Escenario: de español a inglés. Cuando elijo "English" en el selector de idioma, entonces la URL deja de tener `/es/` y veo la portada en inglés.

**HU-04 Página inexistente (negativo)**
Como visitante
Quiero ver un mensaje claro si abro una ruta que no existe
Para saber que me equivoqué de dirección

Criterios de aceptación:
- Escenario: ruta inválida. Cuando abro `/es/esta-pagina-no-existe`, entonces veo una página de error "no encontrada" y el servidor responde 404.

## 2.3 Casos de prueba

| ID | HU | Nombre | Datos | Resultado esperado | Resultado obtenido |
|----|----|--------|-------|--------------------|--------------------|
| CP-01 | HU-01 | Portada muestra título y menú | URL `/es/` | Título "The Cat API" y enlaces Docs, API Reference, Blog visibles | |
| CP-02 | HU-01 | Menú Docs | Clic en "Docs" | URL `/es/docs/intro` y h1 "Primeros pasos" | |
| CP-03 | HU-01 | Menú API Reference | Clic en "API Reference" | URL `/es/reference` y h1 que contiene "TheCatAPI" | |
| CP-04 | HU-01 | Menú Blog | Clic en "Blog" | URL `/es/blog` y título de pestaña con "Blog" | |
| CP-05 | HU-02 | Tarjeta de razas | Clic en "Explora razas de gatos" | URL `/es/docs/examples/breeds` y h1 "Trabajando con Razas" | |
| CP-06 | HU-02 | Siguiente | Desde Razas, clic en "Siguiente" | h1 "Votos y Favoritos" | |
| CP-07 | HU-02 | Anterior | Desde Votos, clic en "Anterior" | h1 "Trabajando con Razas" | |
| CP-08 | HU-03 | Español a English | Selector de idioma, "English" | URL `https://docs.thecatapi.com/` (sin `/es/`) | |
| CP-09 | HU-04 | Ruta inexistente | `/es/esta-pagina-no-existe` | Encabezado "no encontrada" y HTTP 404 | |

## 2.4 Cómo está construido

```
entregable-playwright/
├── playwright.config.ts      <- project 'reto' (timeouts ampliados)
├── utils/acciones.ts         <- acciones con evidencia (clic, escribir, capturas)
└── reto/
    ├── pages/
    │   ├── InicioPage.ts     <- portada: menú, tarjetas, selector de idioma
    │   └── DocsPage.ts       <- páginas de documentación: título, Siguiente, Anterior
    └── tests/
        ├── navegacion.spec.ts  <- CP-01 a CP-04 (HU-01)
        ├── ejemplos.spec.ts    <- CP-05 a CP-07 (HU-02)
        └── idioma.spec.ts      <- CP-08 (HU-03) y CP-09 (HU-04)
```


### 2.5 Evidencias
Después de ejecutar, las capturas quedan en `evidencias/<nombre de la prueba>/`. Agrega aquí las imágenes que quieras mostrar, por ejemplo:

```markdown
![Paso 1](evidencias/CP-02%20Menu%20Docs%20lleva%20a%20Primeros%20pasos/01%20-%20Abrir%20la%20portada.png)
```


## 3. Cómo ejecutar el proyecto
```powershell
npm install
npx playwright install chromium
npm test
npm run report
```
(Este reto no necesita credenciales; `.env.example` solo documenta que no hay variables.)

## 4. Dificultades y cómo las resolví

**1. `Test timeout of 30000ms exceeded while running "beforeEach" hook`**
- Qué significaba: `page.goto` no terminaba de cargar la página dentro de los 30 s por defecto. Fallaban incluso las pruebas de ejemplo que abren playwright.dev, lo que apunta a un problema de conexión del navegador de Playwright o de lentitud del equipo, no de la página.
- Cómo lo resolví: amplié `timeout`, `navigationTimeout` y `expect.timeout` en `playwright.config.ts`, usé `waitUntil: 'domcontentloaded'` y `workers: 1`. _(Agrega aquí la causa final que encuentres: red, proxy, antivirus, etc.)_

**2. `Cannot find module '../../utils/acciones'`**
- Qué significaba: los Page Objects importaban `utils/acciones.ts`, pero esa carpeta no existía y los archivos estaban en `tests/` y `pages/` en lugar de `reto/tests/` y `reto/pages/`.
- Cómo lo resolví: creé `utils/acciones.ts` y reorganicé las carpetas según la guía, para que las rutas relativas (`../../utils/acciones`) coincidieran.
