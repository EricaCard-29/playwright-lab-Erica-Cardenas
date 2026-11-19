import { test, expect } from '@playwright/test';
import { InicioPage } from '../pages/InicioPage';
import { evidenciaElemento } from '../../utils/acciones';

// HU-03: Cambiar el idioma de la documentación
test.describe('HU-03 Cambio de idioma', () => {
  test('CP-08 Cambiar de Espanol a English',
    { tag: '@smoke', annotation: { type: 'HU', description: 'HU-03' } },
    async ({ page }) => {
      const inicio = new InicioPage(page);

      await inicio.goto();
      await inicio.cambiarAEnglish();

      // La versión en inglés vive en la raíz del sitio (sin /es/)
      await expect(page).toHaveURL(/^https:\/\/docs\.thecatapi\.com\/?$/);
      await expect(inicio.titulo).toBeVisible();
      await evidenciaElemento(inicio.titulo, 'Verificar la portada en ingles');
    });
});

// HU-04: Páginas inexistentes (caso negativo)
test.describe('HU-04 Pagina inexistente', () => {
  test('CP-09 Una ruta que no existe muestra pagina de error',
    { annotation: { type: 'HU', description: 'HU-04' } },
    async ({ page }) => {
      const respuesta = await page.goto('esta-pagina-no-existe', { waitUntil: 'domcontentloaded' });

      // Docusaurus muestra una página 404 con un encabezado "Page Not Found" / "Página no encontrada".
      // Si el hosting responde 200 en vez de 404, eso sería un hallazgo para el README.
      const encabezado = page.getByRole('heading', { level: 1 });
      await expect(encabezado).toHaveText(/no encontrad|not found/i);
      await evidenciaElemento(encabezado, 'Verificar el mensaje de pagina no encontrada');
      expect(respuesta?.status()).toBe(404);
    });
});
