import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { AdminService } from '../admin-plateforme/admin.service';

@Injectable({
  providedIn: 'root'
})
export class MouchardService {

  constructor(
    private http: HttpClient,
    private globalService: GloabalServiceService,
    private _userService: AdminService
  ) { }

  /**
   * Recuperer la liste des actions effectuees
   * @param dateFrom // 2024-08-19
   * @param dateTo // 2024-08-19
   * @returns 
   */
  getAll(dateFrom: string, dateTo: string): Observable<any> {
    let url = this.globalService.baseUrl2 + `/Mouchard/read?forWho=${this._userService.getLocalUser().data.UserName}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    return this.http.get<any>(url);
  }

}
