// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { User } from '../models/user.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoginResponse | null>;
  public currentUser: Observable<LoginResponse | null>;
  private apiUrl = `${environment.apiUrl}/api/Auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    const storedUser = await this.storage.get('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public get currentUserValue(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  public getToken(): string | null {
    const user = this.currentUserValue;
    return user ? user.token : null;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('Tentative de connexion avec:', credentials);
    console.log('URL de l\'API:', `${this.apiUrl}/login`);

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap({
          next: (user) => {
            console.log('Connexion réussie:', user);
            this.storage.set('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          },
          error: (error) => {
            console.error('Erreur de connexion:', error);
          }
        })
      );
  }

  register(userData: any): Observable<any> {
    console.log('Tentative d\'inscription avec:', userData);
    console.log('URL de l\'API:', `${environment.apiUrl}/api/Users/create`);
    return this.http.post<any>(`${environment.apiUrl}/api/Users/create`, userData).pipe(
      tap({
        next: (response) => {
          console.log('Inscription réussie:', response);
        },
        error: (error) => {
          console.error('Erreur d\'inscription:', error);
          console.error('Détails de l\'erreur:', {
            status: error.status,
            statusText: error.statusText,
            message: error.message,
            url: error.url
          });
        }
      })
    );
  }

  logout(): Observable<void> {
    return from(this.storage.remove('currentUser')).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
      })
    );
  }

  // Ajoutez cette méthode à votre AuthService

// Ajoutez cette méthode à votre AuthService
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
  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}
