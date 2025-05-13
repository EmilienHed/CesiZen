// src/app/pages/tabs/tabs-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'exercises',
        loadChildren: () => import('../exercices/exercice-list/exercice-list.module').then(m => m.ExerciceListPageModule)
      },
      {
        path: 'exercises/:id',
        loadChildren: () => import('../exercices/exercice-detail/exercice-detail.module').then(m => m.ExerciceDetailPageModule)
      },
      {
        path: 'articles',
        loadChildren: () => import('../articles/article-list/article-list.module').then(m => m.ArticleListPageModule)
      },
      {
        path: 'articles/:id',
        loadChildren: () => import('../articles/article-detail/article-detail.module').then(m => m.ArticleDetailPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/exercises',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/exercises',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
