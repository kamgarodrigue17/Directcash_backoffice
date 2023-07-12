import { Injectable } from '@angular/core';
import { GloabalServiceService } from './gloabal-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fees } from '../modal/fees';
@Injectable({
  providedIn: 'root'
})
export class FeesService {

  constructor(private http: HttpClient, private globalService:GloabalServiceService) { 

  }
  //xfert,xfertintl,eneo,camwater
  getfees(serviceId:string): Observable<any> {
  
    return this.http.get<any>(this.globalService.baseUrl+`/api/Operations/GetServiceFees?serviceId=${serviceId}&who=${localStorage.getItem('id')}`);
  }
}
