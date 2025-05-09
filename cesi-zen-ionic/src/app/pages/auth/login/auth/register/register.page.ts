// src/app/pages/auth/register/register.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import {AuthService} from "../../../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  passwordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.registerForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tabs']);
    }
  }

  // Validation personnalisée pour vérifier que les mots de passe correspondent
  checkPasswords(group: FormGroup) {
    const password = group.get('motDePasse')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Inscription en cours...',
      spinner: 'circles'
    });
    await loading.present();

    // Créer l'objet utilisateur à envoyer à l'API
    const userData = {
      nom: this.registerForm.value.nom,
      prenom: this.registerForm.value.prenom,
      email: this.registerForm.value.email,
      motDePasse: this.registerForm.value.motDePasse,
      dateNaissance: this.registerForm.value.dateNaissance,
      roleId: 1 // Rôle utilisateur standard
    };

    this.authService.register(userData).subscribe({
      next: async () => {
        loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Inscription réussie',
          message: 'Votre compte a été créé avec succès.',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.router.navigate(['/login']);
            }
          }]
        });
        await alert.present();
      },
      error: async (error) => {
        loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Erreur',
          message: error.error?.message || 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
