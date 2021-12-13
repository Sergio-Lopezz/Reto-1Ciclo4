import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseCategoryRemoveComponent } from './case-category/case-category-remove/case-category-remove.component';
import { CaseCategoryComponent } from './case-category/case-category/case-category.component';
import { CreateCaseCategoryComponent } from './case-category/create-case-category/create-case-category.component';
import { EditCaseCategoryComponent } from './case-category/edit-case-category/edit-case-category.component';

const routes: Routes = [
  {
    path: "case-category-list",
    component: CaseCategoryComponent
  },
  {
    path: "case-category-create",
    component: CreateCaseCategoryComponent
  },
  {
    path: "case-category-edit",
    component: EditCaseCategoryComponent
  },
  {
    path: "case-category-remove",
    component: CaseCategoryRemoveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
