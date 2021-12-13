import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from '../config/general-data';
import { CaseCategoryModel } from '../models/case-category.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CaseCategoryService {

  url: string = GeneralData.BUSSINESS_URL;
  token: string = "";

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { 
    this.token = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<CaseCategoryModel[]>{
    return this.http.get<CaseCategoryModel[]>(`${(this.url)}/case-categories`);
  }

  SaveRecord(data: CaseCategoryModel): Observable<CaseCategoryModel>{
    return this.http.post<CaseCategoryModel>(
      `${(this.url)}/case-categories`, {
        name: data.name
      });
  }

  SearchRecord(id: number): Observable<CaseCategoryModel>{
    return this.http.get<CaseCategoryModel>(`${(this.url)}/case-categories/${id}`)
  }

  EditRecord(data: CaseCategoryModel): Observable<CaseCategoryModel>{
    return this.http.put<CaseCategoryModel>(
      `${(this.url)}/case-categories/${data.id}`, {
        id: data.id,
        name: data.name
      });
  }

  RemoveRecord(id: number): Observable<any>{
    return this.http.delete(
      `${(this.url)}/case-categories/${id}`);
  }
}
