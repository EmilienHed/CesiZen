import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RespirationService } from '../../../services/respiration.service';
import { RespirationExercise } from '../../../Models/respiration-exercise.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-respiration-list',
  templateUrl: './respiration-list.component.html',
  styleUrls: ['./respiration-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class RespirationListComponent implements OnInit {
  exercises: RespirationExercise[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private respirationService: RespirationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.respirationService.getExercises().subscribe({
      next: (exercises) => {
        this.exercises = exercises;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des exercices';
        this.loading = false;
        console.error('Erreur:', error);
      }
    });
  }

  startExercise(exercise: RespirationExercise): void {
    this.router.navigate(['/respiration/practice', exercise.id]);
  }

  createCustomExercise(): void {
    this.router.navigate(['/respiration/custom']);
  }
}
