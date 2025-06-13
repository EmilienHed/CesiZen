import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalExercise, PersonalExerciseService } from '../../../services/personal-exercise.service';

@Component({
  selector: 'app-personal-exercise-detail',
  templateUrl: './personal-exercise-detail.component.html',
  styleUrls: ['./personal-exercise-detail.component.css']
})
export class PersonalExerciseDetailComponent implements OnInit {
  exercise: PersonalExercise | null = null;
  loading = true;
  error = '';

  constructor(
    private exerciseService: PersonalExerciseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadExercise(+id);
    }
  }

  loadExercise(id: number): void {
    this.loading = true;
    this.exerciseService.getExercise(id).subscribe({
      next: (exercise) => {
        this.exercise = exercise;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de l\'exercice';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  startExercise(): void {
    // Implémenter la logique de démarrage de l'exercice
    console.log('Démarrage de l\'exercice:', this.exercise);
  }

  editExercise(): void {
    if (this.exercise) {
      this.router.navigate(['/personal-exercise/edit', this.exercise.id]);
    }
  }

  deleteExercise(): void {
    if (this.exercise && confirm('Êtes-vous sûr de vouloir supprimer cet exercice ?')) {
      this.exerciseService.deleteExercise(this.exercise.id).subscribe({
        next: () => {
          this.router.navigate(['/personal-exercises']);
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression de l\'exercice';
          console.error('Erreur:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/personal-exercises']);
  }
} 