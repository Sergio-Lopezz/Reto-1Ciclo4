import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { CaseCategoryModel } from 'src/app/models/case-category.model';
import { CaseCategoryService } from 'src/app/services/case-category.service';

@Component({
  selector: 'app-case-category',
  templateUrl: './case-category.component.html',
  styleUrls: ['./case-category.component.css']
})
export class CaseCategoryComponent implements OnInit {
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: CaseCategoryModel[] = [];

  constructor( private service: CaseCategoryService ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: CaseCategoryModel[]) =>{
        this.recordList = data;
        this.total = this.recordList.length;
      }
    });
  }
}
