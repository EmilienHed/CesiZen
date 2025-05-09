import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:5016'; // Assurez-vous que c'est la bonne URL de votre backend

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    let userData = null;
    if (this.isBrowser) {
      userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }

    this.currentUserSubject = new BehaviorSubject<any>(userData);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Ajout d'une méthode pour récupérer le token
  public getToken(): string {
    const user = this.currentUserValue;
    return user ? user.token : null;
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/Auth/login`, credentials)
      .pipe(map(user => {
        // Stocker les détails de l'utilisateur et le token JWT dans le stockage local
        if (this.isBrowser) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(userData: UserCreateDto): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/Users/create`, userData);
  }

  // Méthode pour demander la réinitialisation du mot de passe
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/Users/forgot-password`, { email });
  }

  // Méthode pour réinitialiser le mot de passe avec un token
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/Users/reset-password`, {
      token,
      newPassword
    });
  }

  // Récupérer les informations d'un utilisateur par ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/Users/${id}`);
  }

  // Récupérer la liste des utilisateurs (pour les admins)
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/api/Users`);
  }

  logout() {
    // Supprimer l'utilisateur du stockage local
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Méthode ajoutée pour vérifier si l'utilisateur est administrateur
  isAdmin(): boolean {
    const user = this.currentUserValue;
    if (!user) {
      console.log('isAdmin: pas d\'utilisateur connecté');
      return false;
    }

    console.log('isAdmin - user:', user);
    console.log('isAdmin - roleId:', user.roleId);
    console.log('isAdmin - role:', user.role);

    // Vérifier si l'utilisateur a le roleId Admin (2) ou le rôle 'Admin' (pour rétrocompatibilité)
    if (user.roleId === 2) {
      return true;
    }
    
    // Rétrocompatibilité si roleId n'est pas défini mais role l'est
    if (user.roleId === undefined && user.role === 'Admin') {
      return true;
    }
    
    return false;
  }

  // Méthode ajoutée pour la compatibilité avec les composants
  getCurrentUser(): any {
    return this.currentUserValue;
  }

  // Méthode pour déboguer l'état d'authentification
  debugAuthState(): void {
    console.log('Debug AuthState - CurrentUser:', this.currentUserValue);
    console.log('Debug AuthState - Token:', this.getToken());
    if (this.isBrowser) {
      console.log('Debug AuthState - LocalStorage:', localStorage.getItem('currentUser'));
    }
  }
}

// Interface pour le modèle de création d'utilisateur
export interface UserCreateDto {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  dateNaissance?: Date;
}
