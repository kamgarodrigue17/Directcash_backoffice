import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GloabalServiceService } from '../gloabal-service.service';
import { Observable } from 'rxjs';
import { RequeteEmission } from 'src/app/modal/requete-emission';

@Injectable({
  providedIn: 'root'
})
export class RequeteEmissionService {

  constructor(private http: HttpClient, private globalService: GloabalServiceService) { }

  /**
   * ==============================================================================
   * API POUR LA GESTION DE MONNAIE
   * ==============================================================================
   */

  /**
   * Recuperer la liste des requetes d'emission
   * @returns
   */
  index(): Observable<any> {
    let url = this.globalService.baseUrl + "/api/Monnetique/getPending?who=" + localStorage.getItem("id");
    return this.http.get<any>(url);
  }

  /**
   * Ajouter une requete d'emission dans la BD
   * @param entreprise
   * @returns
   */
  create(requete: any) {
    let url = this.globalService.baseUrl + "/api/Monnetique/InitierEmission";
    return this.http.post<any>(url, requete);
  }

  /**
   * Valider une requete d'emission
   * @param data 
   * @returns 
   */
  validate(data: any) {
    let url = this.globalService.baseUrl + "/api/Monnetique/validateEmission?admin=" + localStorage.getItem("id");
    return this.http.post<any>(url, data);
  }

  /**
   * Modifier une requete d'emission
   * @param entreprise
   * @returns
   */
  edit(requete: RequeteEmission) {
    let url = this.globalService.baseUrl + "";
    return this.http.post<any>(url, requete);
  }

  updateStatut(id_requete: number, statut: string) {
    let url = this.globalService.baseUrl + "";
    return this.http.patch<any>(url, {
      'id_requete': id_requete,
      'statut': statut
    });
  }

  /**
   * Supprimmer une requete d'emission
   * @param entreprise
   * @returns
   */
  delete(requete: RequeteEmission) {
    let url = this.globalService.baseUrl + "";
    return this.http.delete<any>(url);
  }

  // ============================================================================= Affectation

  /**
   * Recuperer les info sur les stock de monnaie
   * @returns
   */
  getInfo(): Observable<any> {
    let url = this.globalService.baseUrl + "/api/Monnetique/getMonnaieInfo?admin=tabetsing";
    return this.http.get<any>(url);
  }

  /**
   * affecter la monnaie sur DirectCash (et le reste ira automatiquement sur MyDirecCash)
   * @param data 
   * @returns 
   */
  affecterMonnaie(data: any): Observable<any> {
    let url = this.globalService.baseUrl + "/api/Monnetique/affecterMonnaie";
    return this.http.post<any>(url, data);
  }
}
