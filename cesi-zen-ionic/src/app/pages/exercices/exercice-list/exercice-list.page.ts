// src/app/pages/exercices/exercice-list/exercice-list.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespirationService } from '../../../services/respiration.service';
import { RespirationExercise } from '../../../models/respiration-exercise.model';
import { LoadingController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercice-list.page.html',
  styleUrls: ['./exercice-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ExerciseListPage implements OnInit {
  exercises: RespirationExercise[] = [];
  loading = false;
  error = '';

  constructor(
    private respirationService: RespirationService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    await this.loadExercises();
  }

  async loadExercises() {
    const loading = await this.loadingController.create({
      message: 'Chargement des exercices...',
      spinner: 'circles'
    });
    await loading.present();

    this.respirationService.getExercises().subscribe({
      next: (data) => {
        this.exercises = data;
        loading.dismiss();
      },
      error: (error) => {
        this.error = 'Impossible de charger les exercices. Veuillez réessayer.';
        console.error(error);
        loading.dismiss();
      }
    });
  }

  startExercise(id: number) {
    this.router.navigate(['/tabs/exercises', id]);
  }

  doRefresh(event: any) {
    this.loadExercises().then(() => {
      event.target.complete();
    });
  }
}
