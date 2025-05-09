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
        loadChildren: () => import('../exercises/exercise-list/exercise-list.module').then(m => m.ExerciseListPageModule)
      },
      {
        path: 'exercises/:id',
        loadChildren: () => import('../exercises/exercise-detail/exercise-detail.module').then(m => m.ExerciseDetailPageModule)
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
