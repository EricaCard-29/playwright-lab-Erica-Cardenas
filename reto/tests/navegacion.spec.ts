import { test, expect } from '@playwright/test';
import { InicioPage } from '../pages/InicioPage';
import { DocsPage } from '../pages/DocsPage';
import { evidenciaElemento } from '../../utils/acciones';

// HU-01: Navegación principal desde la portada
test.describe('HU-01 Navegacion principal', () => {
  let inicio: InicioPage;
  let docs: DocsPage;

  test.beforeEach(async ({ page }) => {
    inicio = new InicioPage(page);
    docs = new DocsPage(page);
    await inicio.goto();
  });

  test('CP-01 Portada muestra titulo y menu principal',
    { tag: '@smoke', annotation: { type: 'HU', description: 'HU-01' } },
    async ({ page }) => {
      await expect(page).toHaveTitle(/The Cat API/);
      await expect(inicio.titulo).toBeVisible();
      await evidenciaElemento(inicio.titulo, 'Verificar el titulo de la portada');

      await expect(inicio.menuDocs).toBeVisible();
      await expect(inicio.menuApiReference).toBeVisible();
      await expect(inicio.menuBlog).toBeVisible();
      await evidenciaElemento(inicio.menuDocs, 'Verificar el menu principal');
    });

  test('CP-02 Menu Docs lleva a Primeros pasos',
    { tag: '@smoke', annotation: { type: 'HU', description: 'HU-01' } },
    async ({ page }) => {
      await inicio.irADocs();

      await expect(page).toHaveURL(/\/es\/docs\/intro/);
      await expect(docs.titulo).toHaveText('Primeros pasos');
      await evidenciaElemento(docs.titulo, 'Verificar que se abrio Primeros pasos');
    });

  test('CP-03 Menu API Reference lleva a la referencia',
    { annotation: { type: 'HU', description: 'HU-01' } },
    async ({ page }) => {
      await inicio.irAApiReference();

      await expect(page).toHaveURL(/\/es\/reference/);
      await expect(docs.titulo).toContainText('TheCatAPI');
      await evidenciaElemento(docs.titulo, 'Verificar que se abrio la referencia de la API');
    });

  test('CP-04 Menu Blog lleva a la pagina del blog',
    { annotation: { type: 'HU', description: 'HU-01' } },
    async ({ page }) => {
      await inicio.irABlog();

      await expect(page).toHaveURL(/\/es\/blog/);
      await expect(page).toHaveTitle(/Blog/);
    });
});
