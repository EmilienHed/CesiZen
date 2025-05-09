import {RouterModule, Routes } from "@angular/router";
import { RespirationListComponent } from "../../components/Respiration/respiration-list/respiration-list.component";
import { RespirationPracticeComponent } from "../../components/Respiration/respiration-practice/respiration-practice.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const respirationRoutes: Routes = [
  { path: '', component: RespirationListComponent },
  { path: 'practice/:id', component: RespirationPracticeComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(respirationRoutes)
  ],
  exports: [RouterModule]
})
export class RespirationModule { }
