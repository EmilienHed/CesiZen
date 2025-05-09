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
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(user => {
          this.storage.set('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Users/create`, userData);
  }

  logout(): Observable<void> {
    return from(this.storage.remove('currentUser')).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}
