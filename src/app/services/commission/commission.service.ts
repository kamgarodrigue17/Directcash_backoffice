import { Injectable } from '@angular/core';
import { GloabalServiceService } from '../gloabal-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommissionService  {

  constructor(
    public globalService:GloabalServiceService,
    private http: HttpClient
  ) { }
  commissions(): Observable<any> {
  
    return this.http.get<any>(this.globalService.baseUrl+"/api/Operations/GetCommissions?id="+localStorage.getItem("id"));
  }
  editcommissions(data:any): Observable<any> {
  
    return this.http.post<any>(this.globalService.baseUrl+"/api/Operations/Commissions/Edit?adminId="+`${localStorage.getItem('id')}`,data);
  }
  
}
