// src/app/pages/profile/profile.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { LoadingController, AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Interface étendue pour gérer des structures utilisateur différentes
interface ApiUser {
  id?: number;
  idUtilisateur?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  prenom?: string;
  nom?: string;
  dateOfBirth?: Date;
  dateNaissance?: string;
  createdAt?: Date;
  updatedAt?: Date;
  dateCreation?: Date;
  roleId?: number;
  [key: string]: any; // Pour les autres propriétés potentielles
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, RouterModule]
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  user: ApiUser | null = null;
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

  ionViewWillEnter() {
    // Rafraîchir les données à chaque entrée dans la page
    this.loadUserProfile();
  }

  async refreshProfile(event?: any) {
    await this.loadUserProfile();
    if (event) {
      event.target.complete();
    }
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
      // Utiliser le service pour récupérer les données
      const response = await this.userService.getUserById(currentUser.userId).toPromise();
      
      // Vérifier si la réponse existe
      if (response) {
        // Convertir la réponse en type ApiUser
        const userData = response as ApiUser;
        console.log('Données utilisateur reçues:', userData);
        
        this.user = userData;
        
        // Remplir les champs du formulaire avec les valeurs existantes
        // Pour l'API qui utilise prenom/nom
        if (userData.prenom && userData.nom) {
          this.profileForm.patchValue({
            firstName: userData.prenom,
            lastName: userData.nom
          });
        } 
        // Pour l'API qui utilise firstName/lastName
        else if (userData.firstName && userData.lastName) {
          this.profileForm.patchValue({
            firstName: userData.firstName,
            lastName: userData.lastName
          });
        }
        
        console.log('Formulaire rempli avec:', this.profileForm.value);
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

    // Créer un objet qui préserve les propriétés existantes de l'utilisateur
    const userData = { ...this.user };
    
    // Mettre à jour les champs prenom/nom si l'API les utilise
    if ('prenom' in userData) {
      userData.prenom = this.profileForm.value.firstName;
      userData.nom = this.profileForm.value.lastName;
    } 
    // Sinon, utiliser firstName/lastName
    else {
      userData.firstName = this.profileForm.value.firstName;
      userData.lastName = this.profileForm.value.lastName;
    }

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
