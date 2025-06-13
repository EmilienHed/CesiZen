import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalExerciseService } from '../../../services/personal-exercise.service';
import { RespirationExercise } from '../../../Models/respiration-exercise.model';

@Component({
  selector: 'app-personal-exercise-list',
  templateUrl: './personal-exercise-list.component.html',
  styleUrls: ['./personal-exercise-list.component.css']
})
export class PersonalExerciseListComponent implements OnInit {
  exercises: RespirationExercise[] = [];
  loading = true;
  error = '';

  constructor(
    private exerciseService: PersonalExerciseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.loading = true;
    this.exerciseService.getPublicExercises().subscribe({
      next: (data: RespirationExercise[]) => {
        this.exercises = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Erreur lors du chargement des exercices';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  startExercise(exercise: RespirationExercise): void {
    this.router.navigate(['/personal-exercise', exercise.id]);
  }

  createNewExercise(): void {
    this.router.navigate(['/personal-exercise/new']);
  }

  editExercise(exercise: RespirationExercise): void {
    this.router.navigate(['/personal-exercise/edit', exercise.id]);
  }

  deleteExercise(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet exercice ?')) {
      this.exerciseService.deleteExercise(id).subscribe({
        next: () => {
          this.exercises = this.exercises.filter(ex => ex.id !== id);
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression de l\'exercice';
          console.error('Erreur:', err);
        }
      });
    }
  }
} 