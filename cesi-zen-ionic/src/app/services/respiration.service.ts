// services/respiration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "../../environments/environment";

export interface RespirationExercise {
  id: number;
  name: string;
  description: string;
  inspirationDuration: number;
  holdDuration: number;
  expirationDuration: number;
  isDefault: boolean;
}

interface ApiResponse<T> {
  $id: string;
  $values: T[];
}

@Injectable({
  providedIn: 'root'
})
export class RespirationService {
  private apiUrl = `${environment.apiUrl}/api/RespirationExercises`;

  constructor(private http: HttpClient) { }

  getExercises(): Observable<RespirationExercise[]> {
    console.log('Tentative de récupération des exercices depuis:', this.apiUrl);
    return this.http.get<ApiResponse<RespirationExercise>>(this.apiUrl)
      .pipe(
        tap(data => console.log('Réponse brute de l\'API:', data)),
        map(response => response.$values),
        tap(data => console.log('Exercices transformés:', data)),
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération des exercices:', error);
          if (error.status === 0) {
            console.log('Utilisation des données mockées car pas de connexion à l\'API');
            return of(this.getMockExercises());
          }
          return throwError(() => error);
        })
      );
  }

  getExercise(id: number): Observable<RespirationExercise> {
    console.log('Tentative de récupération de l\'exercice:', id);
    return this.http.get<RespirationExercise>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(data => console.log('Exercice reçu:', data)),
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération de l\'exercice:', error);
          if (error.status === 0) {
            console.log('Utilisation des données mockées car pas de connexion à l\'API');
            return of(this.getMockExercise(id));
          }
          return throwError(() => error);
        })
      );
  }

  // Pour le développement, des données mockées
  private getMockExercises(): RespirationExercise[] {
    return [
      {
        id: 1,
        name: 'Respiration 4-7-8',
        description: 'Cette technique aide à réduire l\'anxiété et favorise l\'endormissement.',
        inspirationDuration: 4,
        holdDuration: 7,
        expirationDuration: 8,
        isDefault: true
      },
      {
        id: 2,
        name: 'Cohérence cardiaque',
        description: 'Équilibre le système nerveux et réduit le stress avec un rythme régulier.',
        inspirationDuration: 5,
        holdDuration: 0,
        expirationDuration: 5,
        isDefault: false
      },
      {
        id: 3,
        name: 'Respiration carrée',
        description: 'Parfaite pour la concentration et la gestion du stress.',
        inspirationDuration: 4,
        holdDuration: 4,
        expirationDuration: 4,
        isDefault: false
      },
      {
        id: 4,
        name: 'Respiration profonde',
        description: 'Simple et efficace pour la relaxation immédiate.',
        inspirationDuration: 4,
        holdDuration: 2,
        expirationDuration: 6,
        isDefault: false
      }
    ];
  }

  private getMockExercise(id: number): RespirationExercise {
    const exercises = this.getMockExercises();
    const exercise = exercises.find(ex => ex.id === id);
    return exercise || {
      id: id,
      name: 'Exercice par défaut',
      description: 'Description non disponible',
      inspirationDuration: 4,
      holdDuration: 4,
      expirationDuration: 4,
      isDefault: false
    };
  }
}
