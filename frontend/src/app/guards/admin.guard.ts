// src/app/guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Supposons que votre AuthService a une méthode pour vérifier si l'utilisateur est administrateur
    // Si ce n'est pas le cas, vous devrez l'ajouter
    if (this.authService.isAdmin()) {
      return true;
    }

    // Rediriger vers la page d'accueil si l'utilisateur n'est pas administrateur
    this.router.navigate(['/']);
    return false;
  }
}
