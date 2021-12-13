import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaseCategoryComponent } from './case-category/case-category/case-category.component';
import { CreateCaseCategoryComponent } from './case-category/create-case-category/create-case-category.component';
import { CaseCategoryRemoveComponent } from './case-category/case-category-remove/case-category-remove.component';
import { EditCaseCategoryComponent } from './case-category/edit-case-category/edit-case-category.component';


@NgModule({
  declarations: [
    CaseCategoryComponent,
    CreateCaseCategoryComponent,
    EditCaseCategoryComponent,
    CaseCategoryRemoveComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ParametersModule { }
