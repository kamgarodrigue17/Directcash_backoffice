import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloabalServiceService } from '../gloabal-service.service';
import { Merchant } from 'src/app/modal/merchant';
@Injectable({
  providedIn: 'root'
})
export class SuperAgentService {

  constructor(private http: HttpClient, private globalService:GloabalServiceService) {

   }
   superAgents(listeId:string): Observable<Merchant[]> {
  
    return this.http.get<Merchant[]>(this.globalService.baseUrl+"/api/Users/GetReportList?id=tabetsing&listeId="+listeId);
  }
  // passer l id
  update(data:Merchant): Observable<String> {
    
    return this.http.post<String>(this.globalService.baseUrl+"/api/Users/AddEditMerchant",data);
  }
  //id=null car l api  est generique
  create(data:any): Observable<String> {
    
    return this.http.post<String>(this.globalService.baseUrl+"/api/Users/AddEditMerchant",data);
  }
  Agences(): Observable<any> {
  
    return this.http.get<any>(this.globalService.baseUrl+"/api/Administration/Agence/all?adminId="+localStorage.getItem("id"));
  }
  newEditAgence(data:any): Observable<any> {
    
    return this.http.post<any>(this.globalService.baseUrl+"/api/Administration/Agence/newEdit",data);
  }
}
