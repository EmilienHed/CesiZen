// src/app/pages/profile/profile.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { LoadingController, AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
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

    try {
      const userData = await this.userService.getUserById(currentUser.userId).toPromise();
      console.log('Données utilisateur reçues:', userData);
      
      if (userData) {
        this.user = userData;
        this.profileForm.patchValue({
          firstName: userData.firstName,
          lastName: userData.lastName
        });
      } else {
        this.error = 'Impossible de récupérer les données utilisateur';
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      this.error = 'Impossible de charger le profil. Veuillez réessayer.';
    } finally {
      loading.dismiss();
    }
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
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName
    };

    try {
      await this.userService.updateUser(currentUser.userId, userData).toPromise();
      
      const alert = await this.alertController.create({
        header: 'Profil mis à jour',
        message: 'Votre profil a été mis à jour avec succès.',
        buttons: ['OK']
      });
      await alert.present();
      
      // Recharger les données utilisateur après la mise à jour
      await this.loadUserProfile();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Une erreur s\'est produite lors de la mise à jour du profil. Veuillez réessayer.',
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      loading.dismiss();
    }
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
