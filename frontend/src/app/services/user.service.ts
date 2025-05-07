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

  // Méthode d'inscription mise à jour pour correspondre à l'API backend
  register(userData: UserCreateDto): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/Users/create`, userData);
  }

  // Récupérer les informations d'un utilisateur par ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/Users/${id}`);
  }

  // Récupérer la liste des utilisateurs (pour les admins)
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/api/Users`);
  }

  // Réinitialisation de mot de passe (à implémenter selon votre API backend)
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/Users/request-password-reset`, { email });
  }

  // Réinitialiser le mot de passe avec un token (à implémenter selon votre API backend)
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/Users/reset-password`, { token, newPassword });
  }

  logout() {
    // Supprimer l'utilisateur du stockage local
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
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
