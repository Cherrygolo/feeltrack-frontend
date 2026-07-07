import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { coldStartInterceptor } from './core/interceptors/cold-start.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      errorInterceptor, coldStartInterceptor
    ])),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    // Configuration of ng2-charts to include default chart types and features
    provideCharts(withDefaultRegisterables())
  ]
};
