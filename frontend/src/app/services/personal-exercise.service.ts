import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RespirationExercise } from '../Models/respiration-exercise.model';
import { AuthService } from './auth.service';
import { EnvironmentService } from './environment.service';
import { isPlatformServer } from '@angular/common';

// Type pour la création/mise à jour des exercices
interface ExerciseDTO {
  name: string;
  description: string;
  inspirationDuration: number;
  holdDuration: number;
  expirationDuration: number;
  isDefault?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PersonalExerciseService {
  private apiUrl: string;
  private isServer: boolean;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private environmentService: EnvironmentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.apiUrl = `${this.environmentService.apiUrl}/PersonalExercises`;
    this.isServer = isPlatformServer(platformId);
  }

  // Récupérer tous les exercices personnalisés de l'utilisateur actuel
  getUserExercises(): Observable<RespirationExercise[]> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log('SSR: Skipping API call to get user exercises');
      return of([]);
    }
    
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return of([]);
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
    // Skip API calls during SSR
    if (this.isServer) {
      console.log(`SSR: Skipping API call to get exercise ${id}`);
      return of({} as RespirationExercise);
    }
    
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
          return of({} as RespirationExercise);
        })
      );
  }

  // Créer un nouvel exercice personnalisé
  createExercise(exercise: ExerciseDTO): Observable<RespirationExercise> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log('SSR: Skipping API call to create exercise');
      return of({} as RespirationExercise);
    }
    
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return of({} as RespirationExercise);
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
          return of({} as RespirationExercise);
        })
      );
  }

  // Mettre à jour un exercice personnalisé
  updateExercise(id: number, exercise: ExerciseDTO): Observable<RespirationExercise> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log(`SSR: Skipping API call to update exercise ${id}`);
      return of({} as RespirationExercise);
    }
    
    return this.http.put<RespirationExercise>(`${this.apiUrl}/${id}`, exercise)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la mise à jour de l'exercice ${id}`, error);
          return of({} as RespirationExercise);
        })
      );
  }

  // Supprimer un exercice personnalisé
  deleteExercise(id: number): Observable<any> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log(`SSR: Skipping API call to delete exercise ${id}`);
      return of({});
    }
    
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression de l'exercice ${id}`, error);
          return of({});
        })
      );
  }

  // Récupérer tous les exercices publics (sans authentification)
  getPublicExercises(): Observable<RespirationExercise[]> {
    // Skip API calls during SSR
    if (this.isServer) {
      console.log('SSR: Skipping API call to get public exercises');
      return of([]);
    }
    
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
