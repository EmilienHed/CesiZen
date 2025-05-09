
// src/app/services/respiration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RespirationExercise } from '../models/respiration-exercise.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RespirationService {
  private apiUrl = `${environment.apiUrl}/api/RespirationExercises`;

  constructor(private http: HttpClient) { }

  getExercises(): Observable<RespirationExercise[]> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        map((response: any) => {
          if (response && response.$values) {
            return response.$values;
          }
          return response;
        })
      );
  }

  getExercise(id: number): Observable<RespirationExercise> {
    return this.http.get<RespirationExercise>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response: any) => {
          if (response && response.$values && response.$values.length > 0) {
            return response.$values[0];
          }
          return response;
        })
      );
  }

  getDefaultExercises(): Observable<RespirationExercise[]> {
    return this.http.get<any>(`${this.apiUrl}/defaults`)
      .pipe(
        map((response: any) => {
          if (response && response.$values) {
            return response.$values;
          }
          return response;
        })
      );
  }
}
