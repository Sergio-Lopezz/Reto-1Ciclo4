import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseCategoryModel } from 'src/app/models/case-category.model';
import { CaseCategoryService } from 'src/app/services/case-category.service';

@Component({
  selector: 'app-create-case-category',
  templateUrl: './create-case-category.component.html',
  styleUrls: ['./create-case-category.component.css']
})
export class CreateCaseCategoryComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('')
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private caseCategoryService: CaseCategoryService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  get GetForm(): { [key: string]: AbstractControl }{
    return this.form.controls;
  }

  CreateForm(){
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  SaveRecord(){
    let model = new CaseCategoryModel();
    let name = this.GetForm['name'].value;
    this.caseCategoryService.SaveRecord(model).subscribe({
      next:(data:CaseCategoryModel)=>{
        console.log("Guardando");
        this.router.navigate(['parameters/case-category-list']);
      },
      error:(err:any)=>{
        console.log(err)
      }
    });
  }
}
