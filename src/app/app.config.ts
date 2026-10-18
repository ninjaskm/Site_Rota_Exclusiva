import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Endereços limpos (/plano/turismo). O Google ignora tudo depois do "#", então o
    // hash (/#/plano/turismo) impediria a indexação de cada página.
    // A hospedagem precisa devolver o index.html (ou o HTML pré-renderizado) nesses caminhos.
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
  ],
};
