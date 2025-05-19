import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RespirationListComponent } from './components/Respiration/respiration-list/respiration-list.component';
import { RespirationPracticeComponent } from './components/Respiration/respiration-practice/respiration-practice.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import {ArticleDetailComponent} from './components/article-detail/article-detail.component';
import {ArticleFormComponent} from './components/article-form/article-form.component';
import { PersonalExerciseListComponent } from './components/PersonalExercise/personal-exercise-list/personal-exercise-list.component';
import { PersonalExerciseFormComponent } from './components/PersonalExercise/personal-exercise-form/personal-exercise-form.component';
import { PersonalExerciseDetailComponent } from './components/PersonalExercise/personal-exercise-detail/personal-exercise-detail.component';

@NgModule({
  declarations: [
    // Vide car vous semblez utiliser des composants autonomes (standalone)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    HomeComponent,
    LoginComponent,
    RespirationListComponent,
    RespirationPracticeComponent,
    // Ajout des nouveaux composants d'articles
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleFormComponent,
    PersonalExerciseListComponent,
    PersonalExerciseFormComponent,
    PersonalExerciseDetailComponent
  ],
  providers: [],
  //bootstrap: [AppComponent]
})
export class AppModule { }
