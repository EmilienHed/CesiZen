// File: respiration.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RespirationExercise {
  id: number;
  name: string;
  inspirationDuration: number;
  holdDuration: number;
  expirationDuration: number;
  description: string;
  isDefault: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RespirationService {
  private baseUrl = 'http://localhost:5016';

  constructor(private http: HttpClient) { }

  getExercises(): Observable<RespirationExercise[]> {
    return this.http.get<RespirationExercise[]>(`${this.baseUrl}/api/RespirationExercises`);
  }

  getDefaultExercises(): Observable<RespirationExercise[]> {
    return this.http.get<RespirationExercise[]>(`${this.baseUrl}/api/RespirationExercises/defaults`);
  }

  getExercise(id: number): Observable<RespirationExercise> {
    return this.http.get<RespirationExercise>(`${this.baseUrl}/api/RespirationExercises/${id}`);
  }

  createExercise(exercise: Omit<RespirationExercise, 'id' | 'isDefault'>): Observable<RespirationExercise> {
    return this.http.post<RespirationExercise>(`${this.baseUrl}/api/RespirationExercises`, exercise);
  }

  updateExercise(exercise: RespirationExercise): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/RespirationExercises/${exercise.id}`, exercise);
  }

  deleteExercise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/RespirationExercises/${id}`);
  }
}
