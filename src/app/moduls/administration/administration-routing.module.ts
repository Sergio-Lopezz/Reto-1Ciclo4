import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCaseComponent } from './case/create-case/create-case.component';
import { EditCaseComponent } from './case/edit-case/edit-case.component';
import { ListCaseComponent } from './case/list-case/list-case.component';
import { CreateConsultantComponent } from './consultant/create-consultant/create-consultant.component';
import { EditConsultantComponent } from './consultant/edit-consultant/edit-consultant.component';
import { ListConsultantComponent } from './consultant/list-consultant/list-consultant.component';

const routes: Routes = [
  {
    path: "case-create",
    component: CreateCaseComponent
  },
  {
    path: "case-edit",
    component: EditCaseComponent
  },
  {
    path: "case",
    component: ListCaseComponent
  },
  {
    path: "consultant-create",
    component: CreateConsultantComponent
  },
  {
    path: "consultant-edit",
    component: EditConsultantComponent
  },
  {
    path: "consultant",
    component: ListConsultantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
