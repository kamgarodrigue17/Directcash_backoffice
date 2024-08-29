import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { AdminService } from '../admin-plateforme/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AffecterMonnaieService {

  constructor(
    private http: HttpClient,
    private globalService: GloabalServiceService,
    private _userService: AdminService
  ) { }
  /**
   * Recuperer la liste des habilitations
   * @returns 
   */
  getInfo(): Observable<any> {
    let url = this.globalService.baseUrl2 + "/getmonnaieinfo?vWho=" + this._userService.getLocalUser().data.UserName;
    return this.http.get<any>(url);
  }

  affecterMonnaie(data: any): Observable<any> {
    let url = this.globalService.baseUrl2 + "/affecterMonnaie";
    return this.http.post<any>(url, data);
  }

}
