import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GloabalServiceService } from '../gloabal-service.service';
import { Observable } from 'rxjs';
import { RequeteEmission } from 'src/app/modal/requete-emission.model';

@Injectable({
  providedIn: 'root'
})
export class RequeteEmissionService {

  constructor(private http: HttpClient, private globalService: GloabalServiceService) { }


  /**
   * Recuperer la liste des requetes d'emission
   * @returns
   */
  index(): Observable<any> {
    let url = this.globalService.baseUrl + "";
    return this.http.get<any>(url);
  }

  /**
   * Ajouter une requete d'emission dans la BD
   * @param entreprise
   * @returns
   */
  create(requete: RequeteEmission) {
    let url = this.globalService.baseUrl + "/api/Monnetique/CreerMonnaie";
    return this.http.post<any>(url, requete);
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
}
