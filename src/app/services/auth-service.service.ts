import { Injectable } from '@angular/core';
import { GloabalServiceService } from './gloabal-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    public globalService:GloabalServiceService,
    private http: HttpClient
  ) {
    
   }
   Login(data:any): Observable<any> {
    console.log(this.globalService.baseUrl);
    return this.http.post<any>(this.globalService.baseUrl+"/api/Authentication/authenticate",data);
  }
  getMenu(): Observable<any[]> {
    return this.http.get<any>(this.globalService.baseUrl+"/api/Authentication/getMenus?id=<string>");
  }
}
