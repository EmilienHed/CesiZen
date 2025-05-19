// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'tabs',
    children: [
      {
        path: 'articles',
        loadChildren: () => import('./pages/articles/article-list/article-list.module').then(m => m.ArticleListPageModule)
      },
      {
        path: 'articles/:id',
        loadChildren: () => import('./pages/articles/article-detail/article-detail.module').then(m => m.ArticleDetailPageModule)
      },
      {
        path: 'exercises',
        loadChildren: () => import('./pages/exercices/exercice-list/exercice-list.module').then(m => m.ExerciceListPageModule)
      },
      {
        path: 'exercises/:id',
        loadChildren: () => import('./pages/exercices/exercice-detail/exercice-detail.module').then(m => m.ExerciceDetailPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'tabs/articles/:id',
        loadChildren: () => import('./pages/articles/article-detail/article-detail.module').then(m => m.ArticleDetailPageModule)
      },
    ]
  },
  {
    path: 'articles',
    redirectTo: '/tabs/articles',
    pathMatch: 'full'
  },
  {
    path: 'articles/:id',
    redirectTo: '/tabs/articles/:id',
    pathMatch: 'prefix'
  },
  {
    path: 'exercices',
    redirectTo: '/tabs/exercises',
    pathMatch: 'full'
  },
  {
    path: 'exercices/:id',
    redirectTo: '/tabs/exercises/:id',
    pathMatch: 'prefix'
  },
  {
    path: 'profil',
    redirectTo: '/tabs/profile',
    pathMatch: 'full'
  },
  {
    path: 'article-create',
    loadComponent: () => import('./pages/articles/article-create/article-create.page').then(m => m.ArticleCreatePage),
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
