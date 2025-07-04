import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { routes } from './app-routing.module';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './services/auth-interceptor.service';

// Déterminer le baseHref en fonction de l'environnement
function getBaseHref(): string {
  // En développement local, utiliser '/'
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/';
  }
  
  // Sur le serveur de production
  if (window.location.hostname === 'rasphubert.ddns.net') {
    // Si le chemin commence par /emilien-dev, c'est l'environnement de développement
    if (window.location.pathname.startsWith('/emilien-dev')) {
      return '/emilien-dev/';
    }
    // Si le chemin commence par /emilien-prod, c'est l'environnement de production
    else if (window.location.pathname.startsWith('/emilien-prod')) {
      return '/emilien-prod/';
    }
    // Sinon, c'est l'environnement par défaut
    return '/';
  }
  
  // Par défaut
  return '/';
}

// Configuration de l'application
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    provideClientHydration(),
    provideAnimations(),
    {
      provide: APP_BASE_HREF,
      useFactory: () => {
        try {
          return getBaseHref();
        } catch (e) {
          console.error('Erreur lors de la détermination du baseHref:', e);
          return '/';
        }
      }
    }
  ],
};
