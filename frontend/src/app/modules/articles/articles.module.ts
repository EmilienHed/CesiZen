import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminGuard } from '../../guards/admin.guard';
import {ArticleListComponent} from '../../components/article-list/article-list.component';
import {ArticleDetailComponent} from '../../components/article-detail/article-detail.component';
import {ArticleFormComponent} from '../../components/article-form/article-form.component';

// Définissez les routes du module
const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'create', component: ArticleFormComponent, canActivate: [AdminGuard] },
  { path: 'edit/:id', component: ArticleFormComponent, canActivate: [AdminGuard] },
  { path: ':id', component: ArticleDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleFormComponent
  ]
})
export class ArticlesModule { }
