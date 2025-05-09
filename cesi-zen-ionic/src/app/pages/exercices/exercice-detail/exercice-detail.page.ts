
// src/app/pages/exercises/exercise-detail/exercise-detail.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespirationService, RespirationExercise } from '../../../services/respiration.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';

enum BreathState {
  Ready = 'Prêt',
  Inspire = 'Inspirez',
  Hold = 'Retenez',
  Expire = 'Expirez',
  Paused = 'Pause'
}

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit, OnDestroy {
  exercise: RespirationExercise | null = null;
  loading = false;
  error = '';

  // États de l'exercice
  isRunning = false;
  currentState: BreathState = BreathState.Ready;
  secondsRemaining = 0;
  cycleCount = 0;
  totalCycles = 5;
  circleSize = 100;

  private timerSubscription?: Subscription;
  private animationFrameId?: number;

  // Pour accéder à l'enum dans le template
  get breathStateEnum() {
    return BreathState;
  }

  constructor(
    private route: ActivatedRoute,
    private respirationService: RespirationService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadExercise(+id);
    } else {
      this.error = 'Aucun exercice spécifié.';
    }
  }

  ngOnDestroy() {
    this.stopExercise();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  async loadExercise(id: number) {
    const loading = await this.loadingController.create({
      message: 'Chargement de l\'exercice...',
      spinner: 'circles'
    });
    await loading.present();

    this.respirationService.getExercise(id).subscribe({
      next: (data) => {
        this.exercise = data;
        loading.dismiss();
      },
      error: (error) => {
        this.error = 'Impossible de charger l\'exercice. Veuillez réessayer.';
        console.error(error);
        loading.dismiss();
      }
    });
  }

  startExercise() {
    if (!this.exercise) return;

    this.isRunning = true;
    this.cycleCount = 0;
    this.startBreathCycle();
  }

  stopExercise() {
    this.isRunning = false;
    this.currentState = BreathState.Ready;
    this.circleSize = 100;

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  async pauseExercise() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    const alert = await this.alertController.create({
      header: 'Exercice en pause',
      message: 'Souhaitez-vous reprendre ou arrêter l\'exercice ?',
      buttons: [
        {
          text: 'Reprendre',
          handler: () => {
            this.resumeExercise();
          }
        },
        {
          text: 'Arrêter',
          handler: () => {
            this.stopExercise();
          }
        }
      ]
    });

    await alert.present();
  }

  resumeExercise() {
    // Reprendre l'exercice selon l'état actuel
    if (this.currentState === BreathState.Inspire) {
      this.startInspirePhase(this.secondsRemaining);
    } else if (this.currentState === BreathState.Hold) {
      this.startHoldPhase(this.secondsRemaining);
    } else if (this.currentState === BreathState.Expire) {
      this.startExpirePhase(this.secondsRemaining);
    }
  }

  startBreathCycle() {
    if (!this.exercise || !this.isRunning) return;

    this.cycleCount++;
    this.startInspirePhase();
  }

  startInspirePhase(remainingSeconds?: number) {
    if (!this.exercise || !this.isRunning) return;

    this.currentState = BreathState.Inspire;
    this.secondsRemaining = remainingSeconds || this.exercise.inspirationDuration;

    this.animateBreath(
      this.secondsRemaining,
      100,
      200,
      () => {
        if (this.exercise?.holdDuration && this.exercise.holdDuration > 0) {
          this.startHoldPhase();
        } else {
          this.startExpirePhase();
        }
      }
    );
  }

  startHoldPhase(remainingSeconds?: number) {
    if (!this.exercise || !this.isRunning) return;

    this.currentState = BreathState.Hold;
    this.secondsRemaining = remainingSeconds || this.exercise.holdDuration;

    this.timerSubscription = interval(1000)
      .pipe(take(this.secondsRemaining))
      .subscribe({
        next: () => {
          this.secondsRemaining--;
        },
        complete: () => {
          if (this.isRunning) {
            this.startExpirePhase();
          }
        }
      });
  }

  startExpirePhase(remainingSeconds?: number) {
    if (!this.exercise || !this.isRunning) return;

    this.currentState = BreathState.Expire;
    this.secondsRemaining = remainingSeconds || this.exercise.expirationDuration;

    this.animateBreath(
      this.secondsRemaining,
      200,
      100,
      () => {
        if (this.isRunning) {
          if (this.cycleCount < this.totalCycles) {
            this.startBreathCycle();
          } else {
            this.completeExercise();
          }
        }
      }
    );
  }

  animateBreath(duration: number, startSize: number, endSize: number, onComplete: () => void) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    const frameCount = duration * 10; // 10 frames par seconde
    const sizeStep = (endSize - startSize) / frameCount;
    let frame = 0;

    this.circleSize = startSize;

    const animate = () => {
      if (!this.isRunning) return;

      frame++;
      this.circleSize += sizeStep;

      if (frame % 10 === 0) {
        this.secondsRemaining--;
      }

      if (frame < frameCount) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);

    // Timer parallèle pour garantir la précision
    this.timerSubscription = interval(1000)
      .pipe(take(duration))
      .subscribe({
        next: () => {
          this.secondsRemaining--;
        },
        complete: () => {
          if (this.isRunning) {
            onComplete();
          }
        }
      });
  }

  async completeExercise() {
    this.stopExercise();

    const alert = await this.alertController.create({
      header: 'Exercice terminé',
      message: 'Félicitations ! Vous avez terminé l\'exercice avec succès.',
      buttons: ['OK']
    });

    await alert.present();
  }

  setCycles(count: number) {
    this.totalCycles = count;
  }
}
