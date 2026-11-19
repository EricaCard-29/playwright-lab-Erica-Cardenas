import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // ---- Ajustes para un PC lento o una conexión lenta ----
  timeout: 120_000,                 // tiempo máximo por prueba (antes: 30 s por defecto)
  expect: { timeout: 15_000 },      // tiempo máximo que espera cada expect(...)
  workers: 1,                       // una prueba a la vez: no compiten por CPU y memoria
  fullyParallel: false,
  retries: 0,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  use: {
    actionTimeout: 30_000,          // clic, fill, etc.
    navigationTimeout: 60_000,      // page.goto, esperas de navegación
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',     // más liviano; cambia a 'on' solo para la entrega final
    trace: 'retain-on-failure',     // más liviano; cambia a 'on' solo para la entrega final
  },

  projects: [
    {
      name: 'reto',                           // The Cat API (docs)
      testDir: './reto/tests',
      // OJO: la URL base termina en /es/ (con la barra final).
      // En las páginas se usa goto('./') o goto('docs/intro'), NUNCA goto('/'),
      // porque '/' apunta a la raíz del sitio (inglés), no a /es/.
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://docs.thecatapi.com/es/',
        // Si el Chromium de Playwright no logra conectarse (antivirus, proxy, firewall),
        // descomenta la siguiente línea para usar el Google Chrome instalado en tu PC:
        // channel: 'chrome',
      },
    },
  ],
});
