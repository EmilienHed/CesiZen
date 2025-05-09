/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:5016'; // Assurez-vous que c'est la bonne URL de votre backend

export interface RespirationExercise {
  id: number;
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
export class RespirationService {

  // Données de démonstration si l'API n'est pas encore disponible
  private demoExercises: RespirationExercise[] = [
    {
      id: 1,
      name: 'Cohérence cardiaque 748',
      description: 'Technique de respiration pour réduire rapidement le niveau de stress',
      inspirationDuration: 7,
      holdDuration: 4,
      expirationDuration: 8,
      isDefault: true
    },
    {
      id: 2,
      name: 'Équilibre 55',
      description: 'Respiration équilibrée pour la méditation et la relaxation',
      inspirationDuration: 5,
      holdDuration: 0,
      expirationDuration: 5,
      isDefault: true
    },
    {
      id: 3,
      name: 'Détente 46',
      description: 'Technique avec expiration prolongée pour apaiser le système nerveux',
      inspirationDuration: 4,
      holdDuration: 0,
      expirationDuration: 6,
      isDefault: true
    }
  ];

  constructor(private http: HttpClient) { }

  getExercises(): Observable<RespirationExercise[]> {
    // Essayer d'abord d'utiliser l'API
    return this.http.get<RespirationExercise[]>(`${API_URL}/api/RespirationExercises`)
      .pipe(
        catchError(error => {
          console.warn('API error, using demo data', error);
          // En cas d'erreur, utiliser les données de démo
          return of(this.demoExercises);
        })
      );
  }

  getExercise(id: number): Observable<RespirationExercise> {
    // Essayer d'abord d'utiliser l'API
    return this.http.get<RespirationExercise>(`${API_URL}/api/RespirationExercises/${id}`)
      .pipe(
        catchError(error => {
          console.warn('API error, using demo data', error);
          // En cas d'erreur, chercher dans les données de démo
          const exercise = this.demoExercises.find(ex => ex.id === id);
          if (exercise) {
            return of(exercise);
          }
          throw new Error('Exercice non trouvé');
        })
      );
  }

  // Vous pouvez ajouter d'autres méthodes ici (create, update, delete) selon vos besoins
}
*/

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


export interface RespirationExercise {
  id: number;
  name: string;
  inspirationDuration: number;
  holdDuration: number;
  expirationDuration: number;
  description: string;
  isDefault: boolean;
}

export interface RespirationExerciseDto {
  id?: number;
  name: string;
  inspirationDuration: number;
  holdDuration: number;
  expirationDuration: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class RespirationService {
  //private apiUrl = 'api/RespirationExercises';
  private baseUrl = 'http://localhost:5016';
  private apiUrl = `${this.baseUrl}/api/RespirationExercises`;

  constructor(private http: HttpClient) { }

  getExercises(): Observable<RespirationExercise[]> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        map((response: any) => {
          // Extraire le tableau d'exercices de la réponse
          if (response && response.$values) {
            return response.$values;
          }
          return [];
        })
      );
  }

  getExercise(id: number): Observable<RespirationExercise> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response: any) => {
          // Pour un exercice individuel, la réponse contient directement les propriétés
          return {
            id: response.id,
            name: response.name,
            inspirationDuration: response.inspirationDuration,
            holdDuration: response.holdDuration,
            expirationDuration: response.expirationDuration,
            description: response.description,
            isDefault: response.isDefault
          };
        })
      );
  }

  getDefaultExercises(): Observable<RespirationExercise[]> {
    return this.http.get<any>(`${this.apiUrl}/defaults`)
      .pipe(
        map((response: any) => {
          // Extraire le tableau d'exercices de la réponse
          if (response && response.$values) {
            return response.$values;
          }
          return [];
        })
      );
  }

  createExercise(exercise: RespirationExerciseDto): Observable<RespirationExercise> {
    return this.http.post<RespirationExercise>(this.apiUrl, exercise);
  }

  updateExercise(id: number, exercise: RespirationExerciseDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, exercise);
  }

  deleteExercise(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
