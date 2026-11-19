import { test, expect } from '@playwright/test';
import { InicioPage } from '../pages/InicioPage';
import { DocsPage } from '../pages/DocsPage';
import { evidenciaElemento } from '../../utils/acciones';

// HU-02: Explorar los ejemplos de la documentación
test.describe('HU-02 Explorar ejemplos de la documentacion', () => {
  test('CP-05 Tarjeta de razas abre el ejemplo de razas',
    { tag: '@smoke', annotation: { type: 'HU', description: 'HU-02' } },
    async ({ page }) => {
      const inicio = new InicioPage(page);
      const docs = new DocsPage(page);

      await inicio.goto();
      await inicio.abrirTarjetaRazas();

      await expect(page).toHaveURL(/\/es\/docs\/examples\/breeds/);
      await expect(docs.titulo).toHaveText('Trabajando con Razas');
      await evidenciaElemento(docs.titulo, 'Verificar que se abrio Trabajando con Razas');
    });

  test('CP-06 Enlace Siguiente pasa de Razas a Votos y Favoritos',
    { annotation: { type: 'HU', description: 'HU-02' } },
    async ({ page }) => {
      const docs = new DocsPage(page);

      await docs.goto('docs/examples/breeds', 'Abrir la pagina Trabajando con Razas');
      await docs.irASiguiente();

      await expect(page).toHaveURL(/\/es\/docs\/examples\/votes-favourites/);
      await expect(docs.titulo).toHaveText('Votos y Favoritos');
      await evidenciaElemento(docs.titulo, 'Verificar que se abrio Votos y Favoritos');
    });

  test('CP-07 Enlace Anterior regresa de Votos y Favoritos a Razas',
    { annotation: { type: 'HU', description: 'HU-02' } },
    async ({ page }) => {
      const docs = new DocsPage(page);

      await docs.goto('docs/examples/votes-favourites', 'Abrir la pagina Votos y Favoritos');
      await docs.irAAnterior();

      await expect(page).toHaveURL(/\/es\/docs\/examples\/breeds/);
      await expect(docs.titulo).toHaveText('Trabajando con Razas');
      await evidenciaElemento(docs.titulo, 'Verificar que se regreso a Trabajando con Razas');
    });
});
