import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { AdminService } from '../admin-plateforme/admin.service';

@Injectable({
  providedIn: 'root'
})
export class CLientMyDirectcashService {

  constructor(
    private http: HttpClient,
    private globalService: GloabalServiceService,
    private _userService: AdminService
  ) { }
  /**
   * Recuperer la liste des clients
   * @returns 
   */
  getAll(): Observable<any> {
    let url = this.globalService.baseUrl2 + "/Users/getclients?vWhoAsk=" + this._userService.getLocalUser().data.UserName;
    return this.http.get<any>(url);
  }

}
