import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { AdminService } from '../admin-plateforme/admin.service';

@Injectable({
  providedIn: 'root'
})
export class KycService {

  constructor(
    private http: HttpClient,
    private globalService: GloabalServiceService,
    private _userService: AdminService
  ) { }
  /**
   * Recuperer les info relatifs aux kyc d'un client
   * @returns 
   */
  getKyc(id: string): Observable<any> {
    let url = this.globalService.baseUrl2 + "/searchKyc/" + id;
    return this.http.get<any>(url);
  }

}
