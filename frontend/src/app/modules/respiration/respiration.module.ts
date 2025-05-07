import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RespirationListComponent } from './components/Respiration/respiration-list/respiration-list.component';
import { RespirationPracticeComponent } from './components/Respiration/respiration-practice/respiration-practice.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    RespirationListComponent,
    RespirationPracticeComponent
  ]
})
export class RespirationModule { }
