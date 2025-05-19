import {RouterModule, Routes } from "@angular/router";
import { RespirationListComponent } from "../../components/Respiration/respiration-list/respiration-list.component";
import { RespirationPracticeComponent } from "../../components/Respiration/respiration-practice/respiration-practice.component";
import { RespirationCustomComponent } from "../../components/Respiration/respiration-custom/respiration-custom.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const respirationRoutes: Routes = [
  { path: '', component: RespirationListComponent },
  { path: 'practice/:id', component: RespirationPracticeComponent },
  { path: 'custom', component: RespirationCustomComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RespirationCustomComponent,
    RouterModule.forChild(respirationRoutes)
  ],
  exports: [RouterModule]
})
export class RespirationModule { }
