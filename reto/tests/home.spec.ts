import { test, expect } from '@playwright/test';

// Primera prueba del laboratorio (sin Page Objects), conservada como punto de partida.
test.describe('Pagina principal de The Cat API (es)', () => {
  test.beforeEach(async ({ page }) => {
    // './' es la URL base (/es/). 'domcontentloaded' evita esperar scripts externos lentos.
    await page.goto('./', { waitUntil: 'domcontentloaded' });
  });

  test('Muestra el titulo y el encabezado principal', async ({ page }) => {
    await expect(page).toHaveTitle(/The Cat API/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'The Cat API' })
    ).toBeVisible();
  });

  test('La barra de navegacion tiene los enlaces principales', async ({ page }) => {
    const nav = page.getByRole('navigation').first();

    await expect(nav.getByRole('link', { name: 'Docs', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'API Reference' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Blog' })).toBeVisible();
  });

  test('Leer la documentacion lleva a la introduccion', async ({ page }) => {
    await page.getByRole('link', { name: 'Leer la documentación' }).click();

    await expect(page).toHaveURL(/\/es\/docs\/intro/);
  });
});
