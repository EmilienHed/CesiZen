import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      // L'utilisateur est connecté, autorise l'accès
      return true;
    }

    // L'utilisateur n'est pas connecté, redirige vers la page de connexion avec l'URL de retour
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
