import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloabalServiceService } from '../gloabal-service.service';
import { Entreprise } from 'src/app/modal/entreprise.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private http: HttpClient, private globalService: GloabalServiceService) { }

  /**
   * Recuperer la liste des entreprises
   * @returns
   */
  index(): Observable<any> {
    let url = this.globalService.baseUrl + "";
    return this.http.get<any>(url);
  }

  /**
   * Ajouter une entreprise dans la BD
   * @param entreprise
   * @returns
   */
  create(entreprise: Entreprise){
    let url = this.globalService.baseUrl + "";
    return this.http.post<any>(url, entreprise);
  }

  /**
   * Modifier une entreprise
   * @param entreprise
   * @returns
   */
  edit(entreprise: Entreprise){
    let url = this.globalService.baseUrl + "";
    return this.http.post<any>(url, entreprise);
  }

  /**
   * Modifier une entreprise | si l'entreprise n'existe pas on cree
   * @param entreprise
   * @returns
   */
  createOrUpdate(entreprise: Entreprise){
    let url = this.globalService.baseUrl + "";
    return this.http.post<any>(url, entreprise);
  }

  /**
   * Supprimmer une entreprise
   * @param entreprise
   * @returns
   */
  delete(entreprise: Entreprise){
    let url = this.globalService.baseUrl + "";
    return this.http.delete<any>(url);
  }
}
