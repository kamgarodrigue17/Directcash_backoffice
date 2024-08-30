import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GloabalServiceService } from '../gloabal-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(
    public globalService:GloabalServiceService,
    private http: HttpClient
  ) { }
  validations(): Observable<any> {
  
    return this.http.get<any>(this.globalService.baseUrl+"/api/Administration/Validations/getAll?adminId="+localStorage.getItem("id"));
  }
 
  getAdmin(): Observable<any> {
  
    return this.http.get<any>(this.globalService.baseUrl+"/api/Administration/Users/list?adminId="+localStorage.getItem("id"));
  }
  Edit(data:any): Observable<any> {
  
    return this.http.post<any>(this.globalService.baseUrl+"/api/Administration/Users/newEdit", data);
  }
  suplyvalidate(data:any): Observable<any> {
  
    return this.http.post<any>(this.globalService.baseUrl+"/api/Monnetique/Merchant/Supply/Validate", data);
  }
  
  initdemandeAprovisionenm(data:any): Observable<any> {
  
    return this.http.post<any>(this.globalService.baseUrl+"/api/Monnetique/Merchant/Supply", data);
  }
}
