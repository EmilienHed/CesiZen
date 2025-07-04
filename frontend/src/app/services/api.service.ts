import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../Models/user.model';
import { EnvironmentService } from './environment.service';
import { isPlatformServer } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string;
  private isServer: boolean;

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.baseUrl = this.environmentService.apiUrl;
    this.isServer = isPlatformServer(this.platformId);
    console.log(`ApiService: Initialisation avec baseUrl = ${this.baseUrl}`);
  }

/*  getUsers(): Observable<any[]> {
    //return this.http.get<any[]>(`${this.baseUrl}/Users`);
    return this.http.get<UserListComponent[]>(`${this.baseUrl}/User`);
  }*/

  getUsers(): Observable<any[]> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log('SSR: Skipping API call to getUsers');
      return of([]);
    }
    
    console.log(`ApiService: Appel à ${this.baseUrl}/Users`);
    return this.http.get<User[]>(`${this.baseUrl}/Users`);
  }

/*  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Users`, user);
  }*/


}
