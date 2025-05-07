import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { RespirationPracticeComponent } from './components/Respiration/respiration-practice/respiration-practice.component';

// Exporter les routes pour qu'elles soient utilisables dans d'autres fichiers
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'respiration/practice/:id',
    component: RespirationPracticeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'respiration',
    loadChildren: () => import('./modules/respiration/respiration.module').then(m => m.RespirationModule),
    canActivate: [AuthGuard]
  },
  // Routes pour les articles - utilisation du module d'articles
  {
    path: 'articles',
    loadChildren: () => import('./modules/articles/articles.module').then(m => m.ArticlesModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
