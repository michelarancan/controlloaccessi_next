import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { userInterceptor } from './shared/interceptors/user.interceptor';
import { AuthService } from './features/auth/services/auth.service';
import { authInitializer } from './features/auth/auth.initializer';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([userInterceptor])),

    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authInitializer(authService)();
    })
  ]
};
