import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseCategoryModel } from 'src/app/models/case-category.model';
import { CaseCategoryService } from 'src/app/services/case-category.service';

@Component({
  selector: 'app-case-category-remove',
  templateUrl: './case-category-remove.component.html',
  styleUrls: ['./case-category-remove.component.css']
})
export class CaseCategoryRemoveComponent implements OnInit {
  id: string = "";
  name: string = "";
  constructor(
    private router: Router,
    private service: CaseCategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next:(data:CaseCategoryModel) =>{
        if(data.id && data.name){
          this.id = data.id;
          this.name = data.name;
        }
      }
    });
  }

  RemoveRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.RemoveRecord(id).subscribe({
      next:(data: CaseCategoryModel)=>{
        this.router.navigate(["/parameters/case-category-list"]);
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }
}
