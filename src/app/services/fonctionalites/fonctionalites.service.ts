import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GloabalServiceService } from '../gloabal-service.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FonctionalitesService {

  constructor(
    public globalService:GloabalServiceService,
    private http: HttpClient
  ) { }
  
  fonctionalites(habilitation:String): Observable<any> {
  
    return this.http.get<any>(this.globalService.baseUrl2+"/Habilitations/functionnalities/"+habilitation);
  }
  HabilitationAddOption(data:any): Observable<any> {
    /*{
      "userId":"",
      "option":"",
      "habilitation":""
  }*/
    return this.http.post<any>(this.globalService.baseUrl2+"/api/Administration/Habilitation/AddOption", data);
  }
}
