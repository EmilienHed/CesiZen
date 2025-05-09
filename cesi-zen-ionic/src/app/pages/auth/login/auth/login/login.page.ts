// src/app/pages/auth/login/login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import {AuthService} from "../../../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  passwordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Si déjà connecté, rediriger vers les tabs
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tabs']);
    }
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Connexion en cours...',
      spinner: 'circles'
    });
    await loading.present();

    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe({
      next: () => {
        loading.dismiss();
        this.router.navigate(['/tabs']);
      },
      error: async (error) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Erreur de connexion',
          message: error.error?.message || 'Identifiants incorrects. Veuillez réessayer.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
