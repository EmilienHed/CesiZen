import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RespirationExercise } from '../Models/respiration-exercise.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class RespirationService {
  private apiUrl: string;
  private isServer: boolean;

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isServer = isPlatformServer(platformId);
    this.apiUrl = `${this.environmentService.apiUrl}/RespirationExercises`;
    console.log(`RespirationService: Initialisation avec apiUrl = ${this.apiUrl}`);
  }

  getExercises(): Observable<RespirationExercise[]> {
    // Si on est sur le serveur pendant le SSR, retourner un tableau vide
    if (this.isServer) {
      console.log('SSR: Skipping API call to RespirationExercises');
      return of([]);
    }

    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.$values ?? response),
      catchError(error => {
        console.error('Erreur lors de la récupération des exercices:', error);
        return of([]);
      })
    );
  }

  getExercise(id: number): Observable<RespirationExercise> {
    // Si on est sur le serveur pendant le SSR, retourner un objet vide
    if (this.isServer) {
      console.log(`SSR: Skipping API call to RespirationExercises/${id}`);
      return of({} as RespirationExercise);
    }

    return this.http.get<RespirationExercise>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Erreur lors de la récupération de l'exercice ${id}:`, error);
        return of({} as RespirationExercise);
      })
    );
  }

  createExercise(exercise: Omit<RespirationExercise, 'id'>): Observable<RespirationExercise> {
    if (this.isServer) {
      console.log('SSR: Skipping API call to create RespirationExercise');
      return of({} as RespirationExercise);
    }

    return this.http.post<RespirationExercise>(this.apiUrl, exercise).pipe(
      catchError(error => {
        console.error('Erreur lors de la création de l\'exercice:', error);
        return of({} as RespirationExercise);
      })
    );
  }
}
