import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    // Si on a un token, l'ajouter aux en-têtes
    if (token) {
      console.log('Intercepteur: Ajout du token à la requête');
      
      // Corriger le format avec un espace après "Bearer"
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('En-tête Authorization modifié:', `Bearer ${token}`);
    }

    // Continuer avec la requête modifiée
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gestion des erreurs d'authentification (401, 403)
        if (error.status === 401) {
          console.error('Intercepteur: Erreur 401 Unauthorized');
          console.log('Token utilisé:', token);
          // Déboguer l'état d'authentification
          this.authService.debugAuthState();
        }
        
        return throwError(() => error);
      })
    );
  }
} 