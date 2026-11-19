import { Page, Locator } from '@playwright/test';
import { clic, evidenciaPantalla } from '../../utils/acciones';

// Page Object de cualquier página de documentación (Primeros pasos, Razas, Votos...)
export class DocsPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly enlaceSiguiente: Locator;
  readonly enlaceAnterior: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titulo = page.getByRole('heading', { level: 1 });
    // El enlace de paginación contiene "Siguiente" / "Anterior" + el título de la página vecina
    this.enlaceSiguiente = page.getByRole('link', { name: /Siguiente/ }).last();
    this.enlaceAnterior = page.getByRole('link', { name: /Anterior/ }).last();
  }

  // ruta relativa a la URL base, por ejemplo: 'docs/examples/breeds'
  async goto(ruta: string, descripcion: string) {
    await this.page.goto(ruta, { waitUntil: 'domcontentloaded' });
    await evidenciaPantalla(this.page, descripcion);
  }

  async irASiguiente() {
    await clic(this.enlaceSiguiente, 'Clic en el enlace Siguiente');
  }

  async irAAnterior() {
    await clic(this.enlaceAnterior, 'Clic en el enlace Anterior');
  }
}
