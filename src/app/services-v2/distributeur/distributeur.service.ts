import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { AdminService } from '../admin-plateforme/admin.service';

@Injectable({
  providedIn: 'root'
})
export class DistributeurService {

  constructor(
    private http: HttpClient,
    private globalService: GloabalServiceService,
    private _userService: AdminService
  ) { }
  /**
   * Recuperer la liste des habilitations
   * @returns 
   */
  getAll(): Observable<any> {
    let data = {
      "vIsDistributor": 1,// 0 pour les merchant
      "vWhoAsk": `${this._userService.getLocalUser().data.UserName}`
    }
    let url = this.globalService.baseUrl2 + "/Users/getDistributeur";
    return this.http.post<any>(url, data);
  }

  /**
   * 
   * @param data Ajouter / modifier un distributeur
   * @returns 
   */
  create(data: any): Observable<any> {
    let url = this.globalService.baseUrl2 + "/addMerchantWithKyc";
    return this.http.post<any>(url, data);
  }



}
