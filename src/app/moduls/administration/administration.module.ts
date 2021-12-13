import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { CreateConsultantComponent } from './consultant/create-consultant/create-consultant.component';
import { EditConsultantComponent } from './consultant/edit-consultant/edit-consultant.component';
import { ListConsultantComponent } from './consultant/list-consultant/list-consultant.component';
import { CreateCaseComponent } from './case/create-case/create-case.component';
import { EditCaseComponent } from './case/edit-case/edit-case.component';
import { ListCaseComponent } from './case/list-case/list-case.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateConsultantComponent,
    EditConsultantComponent,
    ListConsultantComponent,
    CreateCaseComponent,
    EditCaseComponent,
    ListCaseComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdministrationModule { }
