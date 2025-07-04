import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private isBrowser: boolean;
  private isServer: boolean;
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private environmentService: EnvironmentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isServer = isPlatformServer(this.platformId);
    this.apiUrl = `${this.environmentService.apiUrl}`;

    let userData = null;
    if (this.isBrowser) {
      userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }

    this.currentUserSubject = new BehaviorSubject<any>(userData);
    this.currentUser = this.currentUserSubject.asObservable();
    
    console.log(`AuthService: Initialisation avec apiUrl = ${this.apiUrl}`);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Ajout d'une méthode pour récupérer le token
  public getToken(): string {
    const user = this.currentUserValue;
    return user ? user.token : null;
  }

  // Méthode privée pour gérer les erreurs HTTP
  private handleError(error: HttpErrorResponse) {
    console.error('Erreur HTTP:', error);
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Erreur côté client:', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Code d'erreur ${error.status}, ` +
        `Corps: ${JSON.stringify(error.error)}`);
    }
    
    // Retourner un message d'erreur convivial
    return throwError(() => error);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log('SSR: Skipping API call to login');
      return of(null);
    }
    
    console.log(`AuthService: Tentative de connexion à ${this.apiUrl}/Auth/login avec email: ${credentials.email}`);
    return this.http.post<any>(`${this.apiUrl}/Auth/login`, credentials)
      .pipe(
        tap(response => console.log('Réponse brute du serveur:', response)),
        map(user => {
          // Vérifier si la réponse est valide
          if (user && user.token) {
            console.log('Connexion réussie, token reçu');
            // Stocker les détails de l'utilisateur et le token JWT dans le stockage local
            if (this.isBrowser) {
              localStorage.setItem('currentUser', JSON.stringify(user));
            }
            this.currentUserSubject.next(user);
            return user;
          } else {
            console.error('Réponse de connexion invalide:', user);
            return null;
          }
        }),
        catchError(error => {
          console.error('Erreur lors de la connexion:', error);
          
          // Si l'erreur est 401 Unauthorized, c'est probablement des identifiants invalides
          if (error.status === 401) {
            return throwError(() => new Error('Email ou mot de passe incorrect'));
          }
          
          return throwError(() => new Error('Erreur de connexion au serveur'));
        })
      );
  }

  register(userData: UserCreateDto): Observable<any> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log('SSR: Skipping API call to register');
      return of(null);
    }
    
    return this.http.post<any>(`${this.apiUrl}/Users/create`, userData)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de l\'inscription:', error);
          return of(null);
        })
      );
  }

  // Méthode pour demander la réinitialisation du mot de passe
  requestPasswordReset(email: string): Observable<any> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log('SSR: Skipping API call to request password reset');
      return of(null);
    }
    
    return this.http.post<any>(`${this.apiUrl}/Users/forgot-password`, { email })
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la demande de réinitialisation de mot de passe:', error);
          return of(null);
        })
      );
  }

  // Méthode pour réinitialiser le mot de passe avec un token
  resetPassword(token: string, newPassword: string): Observable<any> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log('SSR: Skipping API call to reset password');
      return of(null);
    }
    
    return this.http.post<any>(`${this.apiUrl}/Users/reset-password`, {
      token,
      newPassword
    }).pipe(
      catchError(error => {
        console.error('Erreur lors de la réinitialisation du mot de passe:', error);
        return of(null);
      })
    );
  }

  // Récupérer les informations d'un utilisateur par ID
  getUserById(id: number): Observable<any> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log(`SSR: Skipping API call to get user ${id}`);
      return of(null);
    }
    
    return this.http.get<any>(`${this.apiUrl}/Users/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
          return of(null);
        })
      );
  }

  // Récupérer la liste des utilisateurs (pour les admins)
  getAllUsers(): Observable<any[]> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log('SSR: Skipping API call to get all users');
      return of([]);
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/Users`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
          return of([]);
        })
      );
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
