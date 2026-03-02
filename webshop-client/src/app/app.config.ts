import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './common/interceptors/auth-interceptor';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CustomErrorHandler } from '@common/services/error/error-handler';
import { categories, PRODUCT_CATEGORIES, SVG_TYPES, svgTypes } from '@common/injection-tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
    { provide: ErrorHandler, useClass: CustomErrorHandler },

    // Injection Tokens
    { provide: SVG_TYPES, useValue: svgTypes },
    { provide: PRODUCT_CATEGORIES, useValue: categories },
  ],
};
