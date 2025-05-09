// src/app/pages/profile/profile.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  user: User | null = null;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.profileForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.loadUserProfile();
  }

  async loadUserProfile() {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      this.error = 'Utilisateur non connecté';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Chargement du profil...',
      spinner: 'circles'
    });
    await loading.present();

    this.userService.getUserById(currentUser.userId).subscribe({
      next: (data) => {
        this.user = data;
        this.profileForm.patchValue({
          nom: this.user.nom,
          prenom: this.user.prenom
        });
        loading.dismiss();
      },
      error: (error) => {
        this.error = 'Impossible de charger le profil. Veuillez réessayer.';
        console.error(error);
        loading.dismiss();
      }
    });
  }

  async onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !this.user) {
      this.error = 'Utilisateur non connecté';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Mise à jour du profil...',
      spinner: 'circles'
    });
    await loading.present();

    const userData = {
      ...this.user,
      nom: this.profileForm.value.nom,
      prenom: this.profileForm.value.prenom
    };

    this.userService.updateUser(currentUser.userId, userData).subscribe({
      next: async () => {
        loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Profil mis à jour',
          message: 'Votre profil a été mis à jour avec succès.',
          buttons: ['OK']
        });
        await alert.present();
      },
      error: async (error) => {
        loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Erreur',
          message: 'Une erreur s\'est produite lors de la mise à jour du profil. Veuillez réessayer.',
          buttons: ['OK']
        });
        await alert.present();
        console.error(error);
      }
    });
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Déconnexion',
      message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Déconnexion',
          handler: () => {
            this.authService.logout().subscribe();
          }
        }
      ]
    });

    await alert.present();
  }
}
