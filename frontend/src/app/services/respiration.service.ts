import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RespirationExercise, MOCK_EXERCISES } from '../Models/respiration-exercise.model';

@Injectable({
  providedIn: 'root'
})
export class RespirationService {
  private exercises: RespirationExercise[] = MOCK_EXERCISES;

  constructor() { }

  getExercises(): Observable<RespirationExercise[]> {
    return of(this.exercises);
  }

  getExercise(id: number): Observable<RespirationExercise> {
    const exercise = this.exercises.find(ex => ex.id === id);
    return of(exercise!);
  }

  createExercise(exercise: Omit<RespirationExercise, 'id'>): Observable<RespirationExercise> {
    const newExercise = {
      ...exercise,
      id: this.exercises.length + 1
    };
    this.exercises.push(newExercise);
    return of(newExercise);
  }
}
