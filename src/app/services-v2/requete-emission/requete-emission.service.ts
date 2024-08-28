import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequeteEmission } from 'src/app/modal/requete-emission';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { AdminService } from '../admin-plateforme/admin.service';

@Injectable({
  providedIn: 'root'
})
export class RequeteEmissionService {

  constructor(
    private _http: HttpClient,
    private _globalService: GloabalServiceService,
    private _userService: AdminService
  ) { }

  /**
   * Recuperer la liste des requetes d'emission
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
    let url = this._globalService.baseUrl2 + "/getPending";
    return this._http.post<any>(url, data);
  }

  /**
   * Ajouter une requete d'emission dans la BD
   * @param entreprise
   * @returns
   */
  create(requete: any) {
    let url = this._globalService.baseUrl2 + "/initieremission";
    return this._http.post<any>(url, requete);
  }

  /**
   * Valider une requete d'emission
   * @param data 
   * @returns 
   */
  validate(data: any) {
    let url = this._globalService.baseUrl2 + "/validateEmission";
    return this._http.post<any>(url, data);
  }

  /**
   * Modifier une requete d'emission
   * @param entreprise
   * @returns
   */
  edit(requete: RequeteEmission) {
    let url = this._globalService.baseUrl + "";
    return this._http.post<any>(url, requete);
  }

}
