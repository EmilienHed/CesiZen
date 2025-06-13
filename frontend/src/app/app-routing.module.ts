import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { RespirationPracticeComponent } from './components/Respiration/respiration-practice/respiration-practice.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { UserFormComponent } from './components/admin/user-form/user-form.component';
import { PersonalExerciseFormComponent } from './components/PersonalExercise/personal-exercise-form/personal-exercise-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'respiration/practice/:id',
    component: RespirationPracticeComponent,
  },
  {
    path: 'respiration',
    loadChildren: () => import('./modules/respiration/respiration.module').then(m => m.RespirationModule),
  },
  // Nouvel exercice personnalisé
  {
    path: 'personal-exercise/new',
    component: PersonalExerciseFormComponent
  },
  // Routes pour les articles
  {
    path: 'articles',
    component: ArticleListComponent,
  },
  {
    path: 'articles/:id',
    component: ArticleDetailComponent,
  },
  {
    path: 'admin/articles/create',
    component: ArticleFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/articles/edit/:id',
    component: ArticleFormComponent,
    canActivate: [AuthGuard]
  },
  // Routes pour l'administration
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/users',
    component: UserManagementComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/users/edit/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
