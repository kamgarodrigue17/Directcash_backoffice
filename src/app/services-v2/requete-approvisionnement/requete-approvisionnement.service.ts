import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequeteEmission } from 'src/app/modal/requete-emission';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { AdminService } from '../admin-plateforme/admin.service';

@Injectable({
  providedIn: 'root'
})
export class RequeteApprovisionnementService {

  constructor(
    private _http: HttpClient,
    private _globalService: GloabalServiceService,
    private _userService: AdminService
  ) { }

  /**
   * Recuperer la liste des requetes d'approvisionnements
   * @returns
   */
  index(): Observable<any> {
    let data = {
      "vWho": `${this._userService.getLocalUser().data.UserName}`,
      "vFilterStatus": "",
      "vFilterFournisseur": "",
      "vFilterTraiterPar": "",
      "vFilterCreerPar": ""
    }
    let url = this._globalService.baseUrl2 + "/Merchant/Supply/list";
    return this._http.post<any>(url, data);
  }

  /**
   * Ajouter une requete d'approvisionnement
   * @param entreprise
   * @returns
   */
  create(requete: any) {
    let url = this._globalService.baseUrl2 + "/Merchant/Supply";
    return this._http.post<any>(url, requete);
  }

  /**
   * Valider une requete d'approvisionnement
   * @param data 
   * @returns 
   */
  validate(data: any) {
    let url = this._globalService.baseUrl2 + "/Merchant/Supply/Validate";
    return this._http.post<any>(url, data);
  }

  /**
   * Modifier une requete d'emission
   * @param entreprise
   * @returns
   */
  edit(requete: RequeteEmission) {
    let url = this._globalService.baseUrl2 + "";
    return this._http.post<any>(url, requete);
  }

}
