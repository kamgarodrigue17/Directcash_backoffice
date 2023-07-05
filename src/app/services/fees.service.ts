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
  getTransaction(serviceId:string): Observable<Fees[]> {
  
    return this.http.get<Fees[]>(this.globalService.baseUrl+`/api/Operations/GetServiceFees?serviceId=${serviceId}`);
  }
}
