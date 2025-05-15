/*
// src/app/pages/exercices/exercice-detail/exercice-detail.page.ts
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespirationService } from '../../../services/respiration.service';
import { LoadingController, AlertController, IonicModule } from '@ionic/angular';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { RespirationExercise } from "../../../models/respiration-exercise.model";
import { CommonModule } from '@angular/common';

enum BreathState {
  Ready = 'Prêt',
  Inspire = 'Inspirez',
  Hold = 'Retenez',
  Expire = 'Expirez',
  Paused = 'Pause'
}

@Component({
  selector: 'app-exercice-detail',
  templateUrl: './exercice-detail.page.html',
  styleUrls: ['./exercice-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ExerciceDetailPage implements OnInit, OnDestroy {
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
  isPaused = false;

  private timerSubscription?: Subscription;
  private animationFrameId?: number;
  private lastTimestamp = 0;
  private animationSpeed = 1000 / 60; // 60 FPS

  // Pour accéder à l'enum dans le template
  get breathStateEnum() {
    return BreathState;
  }

  constructor(
    public route: ActivatedRoute,
    private respirationService: RespirationService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private ngZone: NgZone
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
        this.error = `Impossible de charger l'exercice: ${error.message || 'Erreur inconnue'}`;
        console.error('Détail de l\'erreur:', error);
        loading.dismiss();
      }
    });
  }

  startExercise() {
    if (!this.exercise) return;

    this.isRunning = true;
    this.isPaused = false;
    this.cycleCount = 0;
    this.currentState = BreathState.Ready;
    this.circleSize = 100;
    this.startBreathCycle();
  }

  stopExercise() {
    this.isRunning = false;
    this.isPaused = false;
    this.currentState = BreathState.Ready;
    this.circleSize = 100;
    this.cycleCount = 0;
    this.secondsRemaining = 0;

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  async pauseExercise() {
    if (!this.isRunning || this.isPaused) return;

    this.isPaused = true;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    const alert = await this.alertController.create({
      header: 'Exercice en pause',
      message: 'Souhaitez-vous reprendre ou arrêter l\'exercice ?',
      buttons: [
        {
          text: 'Reprendre',
          handler: () => {
            this.isPaused = false;
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
    if (!this.isRunning || !this.isPaused) return;

    switch (this.currentState) {
      case BreathState.Inspire:
        this.startInspirePhase(this.secondsRemaining);
        break;
      case BreathState.Hold:
        this.startHoldPhase(this.secondsRemaining);
        break;
      case BreathState.Expire:
        this.startExpirePhase(this.secondsRemaining);
        break;
    }
  }

  startBreathCycle() {
    if (!this.exercise || !this.isRunning || this.isPaused) return;

    this.cycleCount++;
    this.startInspirePhase();
  }

  startInspirePhase(remainingSeconds?: number) {
    if (!this.exercise || !this.isRunning || this.isPaused) return;

    this.currentState = BreathState.Inspire;
    this.secondsRemaining = remainingSeconds || this.exercise.inspirationDuration;

    this.animateBreath(
      this.secondsRemaining,
      100,
      200,
      () => {
        if (this.isRunning && !this.isPaused && this.exercise?.holdDuration && this.exercise.holdDuration > 0) {
          this.startHoldPhase();
        } else if (this.isRunning && !this.isPaused) {
          this.startExpirePhase();
        }
      }
    );
  }

  startHoldPhase(remainingSeconds?: number) {
    if (!this.exercise || !this.isRunning || this.isPaused) return;

    this.currentState = BreathState.Hold;
    this.secondsRemaining = remainingSeconds || this.exercise.holdDuration;

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = timer(0, 1000)
      .pipe(take(this.secondsRemaining + 1))
      .subscribe({
        next: (count) => {
          this.ngZone.run(() => {
            this.secondsRemaining = this.secondsRemaining - count;
          });
        },
        complete: () => {
          if (this.isRunning && !this.isPaused) {
            this.ngZone.run(() => {
              this.startExpirePhase();
            });
          }
        }
      });
  }

  startExpirePhase(remainingSeconds?: number) {
    if (!this.exercise || !this.isRunning || this.isPaused) return;

    this.currentState = BreathState.Expire;
    this.secondsRemaining = remainingSeconds || this.exercise.expirationDuration;

    this.animateBreath(
      this.secondsRemaining,
      200,
      100,
      () => {
        if (this.isRunning && !this.isPaused) {
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

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    const totalFrames = duration * 60; // 60 FPS
    const sizeStep = (endSize - startSize) / totalFrames;
    let frame = 0;
    this.lastTimestamp = 0;
    this.circleSize = startSize;

    const animate = (timestamp: number) => {
      if (!this.isRunning || this.isPaused) return;

      if (!this.lastTimestamp) this.lastTimestamp = timestamp;
      const elapsed = timestamp - this.lastTimestamp;

      if (elapsed >= this.animationSpeed) {
        this.lastTimestamp = timestamp;
        frame++;

        this.ngZone.run(() => {
          this.circleSize += sizeStep;
          if (frame % 60 === 0) { // Mise à jour du compteur chaque seconde
            this.secondsRemaining--;
          }
        });
      }

      if (frame < totalFrames && this.isRunning && !this.isPaused) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else if (this.isRunning && !this.isPaused) {
        this.ngZone.run(() => {
          if (onComplete) onComplete();
        });
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);

    // Timer parallèle pour garantir la précision du compteur
    this.timerSubscription = timer(0, 1000)
      .pipe(take(duration + 1))
      .subscribe({
        next: (count) => {
          this.ngZone.run(() => {
            this.secondsRemaining = duration - count;
          });
        },
        complete: () => {
          if (this.isRunning && !this.isPaused) {
            this.ngZone.run(() => {
              if (onComplete) onComplete();
            });
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
*/




// src/app/pages/exercices/exercice-detail/exercice-detail.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespirationService } from '../../../services/respiration.service';
import { LoadingController, AlertController, IonicModule } from '@ionic/angular';
import { Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { RespirationExercise } from "../../../models/respiration-exercise.model";
import { CommonModule } from '@angular/common';

enum BreathState {
  Ready = 'Prêt',
  Inspire = 'Inspirez',
  Hold = 'Retenez',
  Expire = 'Expirez',
  Paused = 'Pause'
}

@Component({
  selector: 'app-exercice-detail',
  templateUrl: './exercice-detail.page.html',
  styleUrls: ['./exercice-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ExerciceDetailPage implements OnInit, OnDestroy {
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

  // Pour accéder à l'enum dans le template
  get breathStateEnum() {
    return BreathState;
  }

  constructor(
    public route: ActivatedRoute,
    private respirationService: RespirationService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    console.log('Initialisation de la page d\'exercice');
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadExercise(+id);
    } else {
      this.error = 'Aucun exercice spécifié.';
    }
  }

  ngOnDestroy() {
    this.stopExercise();
  }

  async loadExercise(id: number) {
    console.log('Chargement de l\'exercice:', id);
    const loading = await this.loadingController.create({
      message: 'Chargement de l\'exercice...',
      spinner: 'circles'
    });
    await loading.present();

    this.respirationService.getExercise(id).subscribe({
      next: (data) => {
        console.log('Exercice reçu:', data);
        // Ajouter isDefault si nécessaire pour éviter l'erreur de typage
        this.exercise = {
          ...data,
          isDefault: data.isDefault !== undefined ? data.isDefault : false
        };
        this.loading = false;
        loading.dismiss();
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'exercice:', error);
        this.error = `Impossible de charger l'exercice: ${error.message || 'Erreur inconnue'}`;
        this.loading = false;
        loading.dismiss();
      }
    });
  }

  startExercise() {
    if (!this.exercise) return;
    console.log('Démarrage de l\'exercice');

    this.isRunning = true;
    this.cycleCount = 0;
    this.startBreathCycle();
  }

  stopExercise() {
    console.log('Arrêt de l\'exercice');
    this.isRunning = false;
    this.currentState = BreathState.Ready;
    this.circleSize = 100;

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  async pauseExercise() {
    console.log('Pause de l\'exercice');
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
    console.log('Reprise de l\'exercice');
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
    console.log('Démarrage d\'un nouveau cycle');

    this.cycleCount++;
    this.startInspirePhase();
  }

  startInspirePhase(remainingSeconds?: number) {
    if (!this.exercise || !this.isRunning) return;
    console.log('Phase d\'inspiration');

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
    console.log('Phase de rétention');

    this.currentState = BreathState.Hold;
    this.secondsRemaining = remainingSeconds || this.exercise.holdDuration;

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

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
    console.log('Phase d\'expiration');

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
    console.log(`Animation: ${duration}s, de ${startSize} à ${endSize}`);

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    const frameCount = duration * 10; // 10 frames par seconde
    const sizeStep = (endSize - startSize) / frameCount;
    let frame = 0;

    this.circleSize = startSize;

    this.timerSubscription = interval(100) // 100ms = 10fps
      .pipe(take(frameCount))
      .subscribe({
        next: () => {
          frame++;
          this.circleSize += sizeStep;

          if (frame % 10 === 0) { // Décrémenter le compteur chaque seconde (10 frames à 100ms)
            this.secondsRemaining--;
          }
        },
        complete: () => {
          if (this.isRunning) {
            onComplete();
          }
        }
      });
  }

  async completeExercise() {
    console.log('Exercice terminé');
    this.stopExercise();

    const alert = await this.alertController.create({
      header: 'Exercice terminé',
      message: 'Félicitations ! Vous avez terminé l\'exercice avec succès. Prenez un moment pour apprécier le calme et la détente.',
      buttons: ['Merci'],
      cssClass: 'zen-alert'
    });

    await alert.present();
  }

  setCycles(count: number) {
    console.log('Nombre de cycles défini à:', count);
    this.totalCycles = count;
  }
}
