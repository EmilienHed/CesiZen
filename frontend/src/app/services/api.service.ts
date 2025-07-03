import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

/*  getUsers(): Observable<any[]> {
    //return this.http.get<any[]>(`${this.baseUrl}/Users`);
    return this.http.get<UserListComponent[]>(`${this.baseUrl}/User`);
  }*/

  getUsers(): Observable<any[]> {
    //return this.http.get<any[]>(this.baseUrl);
    return this.http.get<User[]>(`${this.baseUrl}/Users`);  }

/*  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Users`, user);
  }*/


}
