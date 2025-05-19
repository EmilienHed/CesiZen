import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespirationExercise } from '../Models/respiration-exercise.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RespirationService {
  private apiUrl = 'http://localhost:5016/api/RespirationExercises';

  constructor(private http: HttpClient) { }

  getExercises(): Observable<RespirationExercise[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.$values ?? response)
    );
  }

  getExercise(id: number): Observable<RespirationExercise> {
    return this.http.get<RespirationExercise>(`${this.apiUrl}/${id}`);
  }

  createExercise(exercise: Omit<RespirationExercise, 'id'>): Observable<RespirationExercise> {
    return this.http.post<RespirationExercise>(this.apiUrl, exercise);
  }
}
