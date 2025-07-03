import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { routes } from './app-routing.module';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';

export const appConfig: ApplicationConfig =
  {
    providers: [
      provideRouter(routes),
      provideHttpClient(withFetch()),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
      provideClientHydration(),
      provideAnimations(),
      { provide: APP_BASE_HREF, useValue: '/emilien-dev/' }
    ],
  };
