import { Page, Locator } from '@playwright/test';
import { clic, evidenciaPantalla } from '../../utils/acciones';

// Page Object de la portada: https://docs.thecatapi.com/es/
export class InicioPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly subtitulo: Locator;

  // Barra de navegación superior
  readonly menuDocs: Locator;
  readonly menuApiReference: Locator;
  readonly menuBlog: Locator;
  readonly selectorIdioma: Locator;
  readonly opcionEnglish: Locator;

  // Cuerpo de la portada
  readonly botonLeerDocumentacion: Locator;
  readonly tarjetaRazas: Locator;
  readonly tarjetaVotos: Locator;
  readonly tarjetaImagenes: Locator;

  constructor(page: Page) {
    this.page = page;
    const barra = page.getByRole('navigation').first();

    this.titulo = page.getByRole('heading', { level: 1, name: 'The Cat API' });
    this.subtitulo = page.getByText('Breed data, images and photo analysis for cat apps');

    this.menuDocs = barra.getByRole('link', { name: 'Docs', exact: true });
    this.menuApiReference = barra.getByRole('link', { name: 'API Reference', exact: true });
    this.menuBlog = barra.getByRole('link', { name: 'Blog', exact: true });

    // Menú desplegable de idioma (Docusaurus): el botón muestra el idioma actual
    this.selectorIdioma = page.locator('.navbar__item.dropdown .navbar__link', { hasText: 'Español' });
    this.opcionEnglish = page.locator('.dropdown__link', { hasText: 'English' });

    this.botonLeerDocumentacion = page.getByRole('link', { name: 'Leer la documentación' });
    this.tarjetaRazas = page.getByRole('link', { name: /Explora razas de gatos/ });
    this.tarjetaVotos = page.getByRole('link', { name: /Vota y marca favoritos/ });
    this.tarjetaImagenes = page.getByRole('link', { name: /imágenes de gatos públicas/ });
  }

  async goto() {
    // 'domcontentloaded' no espera a Google Tag Manager, imágenes ni fuentes:
    // evita el timeout en PC o conexiones lentas.
    await this.page.goto('./', { waitUntil: 'domcontentloaded' });
    await evidenciaPantalla(this.page, 'Abrir la portada');
  }

  async irADocs() {
    await clic(this.menuDocs, 'Clic en el menu Docs');
  }

  async irAApiReference() {
    await clic(this.menuApiReference, 'Clic en el menu API Reference');
  }

  async irABlog() {
    await clic(this.menuBlog, 'Clic en el menu Blog');
  }

  async abrirTarjetaRazas() {
    await clic(this.tarjetaRazas, 'Clic en la tarjeta Explora razas de gatos');
  }

  async cambiarAEnglish() {
    await clic(this.selectorIdioma, 'Abrir el selector de idioma');
    await clic(this.opcionEnglish, 'Elegir English');
  }
}
