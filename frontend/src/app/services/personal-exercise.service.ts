import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RespirationExercise, RespirationExerciseDTO } from '../Models/respiration-exercise.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalExerciseService {
  private baseUrl = 'http://localhost:5016';
  private apiUrl = `${this.baseUrl}/api/PersonalExercises`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Récupérer tous les exercices personnalisés de l'utilisateur actuel
  getUserExercises(): Observable<RespirationExercise[]> {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return throwError(() => new Error('Utilisateur non connecté'));
    }

    return this.http.get<any>(`${this.apiUrl}/user/${currentUser.userId}`)
      .pipe(
        map((response: any) => {
          // Extraire le tableau d'exercices de la réponse
          if (response && response.$values) {
            return response.$values;
          } else if (Array.isArray(response)) {
            return response;
          }
          return [];
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des exercices personnalisés', error);
          // En cas d'erreur, retourner un tableau vide
          return of([]);
        })
      );
  }

  // Récupérer un exercice personnalisé par son ID
  getExerciseById(id: number): Observable<RespirationExercise> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response: any) => {
          // Pour un exercice individuel
          if (response && response.$values && response.$values.length > 0) {
            return response.$values[0];
          }
          return response;
        }),
        catchError(error => {
          console.error(`Erreur lors de la récupération de l'exercice ${id}`, error);
          return throwError(() => error);
        })
      );
  }

  // Créer un nouvel exercice personnalisé
  createExercise(exercise: RespirationExerciseDTO): Observable<RespirationExercise> {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return throwError(() => new Error('Utilisateur non connecté'));
    }

    // Ajouter l'ID de l'utilisateur
    const exerciseToCreate = {
      ...exercise,
      userId: currentUser.userId,
      isDefault: false
    };

    return this.http.post<RespirationExercise>(`${this.apiUrl}`, exerciseToCreate)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la création de l\'exercice', error);
          return throwError(() => error);
        })
      );
  }

  // Mettre à jour un exercice personnalisé
  updateExercise(id: number, exercise: RespirationExerciseDTO): Observable<RespirationExercise> {
    return this.http.put<RespirationExercise>(`${this.apiUrl}/${id}`, exercise)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la mise à jour de l'exercice ${id}`, error);
          return throwError(() => error);
        })
      );
  }

  // Supprimer un exercice personnalisé
  deleteExercise(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression de l'exercice ${id}`, error);
          return throwError(() => error);
        })
      );
  }

  // Récupérer tous les exercices publics (sans authentification)
  getPublicExercises(): Observable<RespirationExercise[]> {
    return this.http.get<any>(`${this.apiUrl}/public`)
      .pipe(
        map((response: any) => {
          if (response && response.$values) {
            return response.$values;
          } else if (Array.isArray(response)) {
            return response;
          }
          return [];
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des exercices publics', error);
          return of([]);
        })
      );
  }
}
