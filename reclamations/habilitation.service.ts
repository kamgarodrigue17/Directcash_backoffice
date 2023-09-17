import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GloabalServiceService } from '../gloabal-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilitationService {

  constructor(
    public globalService:GloabalServiceService,
    private http: HttpClient
  ) { }
  habilitations(): Observable<any> {
  
    return this.http.get<any>(this.globalService.baseUrl+"/api/Administration/Habilitations/getAll");
  }
  reclamations(endate:string): Observable<any> {
  console.log(this.globalService.baseUrl+`/api/Administration/Reclamation/all?adminId=${localStorage.getItem('id')}&startDate=20230731&endDate=${endate}`)
    return this.http.get<any>(this.globalService.baseUrl+`/api/Administration/Reclamation/all?adminId=${localStorage.getItem('id')}&startDate=20230731&endDate=${endate}`);
  }
  newEdit(data:any): Observable<any> {
  
    return this.http.post<any>(this.globalService.baseUrl+"/api/Administration/Reclamation/newEdit", data);
  }
 
}
