// src/app/pages/exercises/exercise-list/exercise-list.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespirationService, RespirationExercise } from '../../../services/respiration.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.page.html',
  styleUrls: ['./exercise-list.page.scss'],
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
