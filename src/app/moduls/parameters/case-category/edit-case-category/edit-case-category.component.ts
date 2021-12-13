import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseCategoryModel } from 'src/app/models/case-category.model';
import { CaseCategoryService } from 'src/app/services/case-category.service';

@Component({
  selector: 'app-edit-case-category',
  templateUrl: './edit-case-category.component.html',
  styleUrls: ['./edit-case-category.component.css']
})
export class EditCaseCategoryComponent implements OnInit {
  Form: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CaseCategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    //this.SearchRecord();
  }
  
  CreateForm(){
    this.Form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  get GetForm(): { [key: string]: AbstractControl }{
    return this.Form.controls;
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next:(data:CaseCategoryModel) =>{
        this.GetForm['id'].value(data.id);
        this.GetForm['name'].value(data.name);
      }
    });
  }

  SaveRecord(){
    let model = new CaseCategoryModel();
    model.id = this.GetForm['id'].value;
    model.name = this.GetForm['name'].value;
    this.service.EditRecord(model).subscribe({
      next:(data: CaseCategoryModel)=>{
        console.log(data);
        this.router.navigate(["/parameters/case-category-list"])
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }
}
