import { Injectable } from '@angular/core';
import { GloabalServiceService } from './gloabal-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../modal/user';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    public globalService: GloabalServiceService,
    private http: HttpClient
  ) {

  }
  Login(data: any): Observable<any> {
    console.log(this.globalService.baseUrl);
    return this.http.post<any>(this.globalService.baseUrl + "/api/Authentication/authenticate", data);
  }
  refreshToken(): any {
    let data: any = localStorage.getItem("user")

    this.http.post<any>(this.globalService.baseUrl + "/api/Authentication/refreshToken?id=" + localStorage.getItem("id"), JSON.parse(data)).subscribe(ress => {
      localStorage.setItem("token", ress.data.token);

    });
  }
  getMenu(): Observable<any[]> {
    return this.http.get<any>(this.globalService.baseUrl + "/api/Authentication/getMenus?id=<string>");
  }
}
