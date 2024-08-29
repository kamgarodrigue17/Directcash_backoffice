import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';

@Injectable({
  providedIn: 'root'
})
export class HabilitationService {

  constructor(
    private http: HttpClient,
    private globalService: GloabalServiceService
  ) { }
  /**
   * Recuperer la liste des habilitations
   * @returns 
   */
  getAll(): Observable<any> {
    let url = this.globalService.baseUrl2 + "/Habilitations/getAll";
    return this.http.get<any>(url);
  }

  /**
   * Recuperer la liste des fonctionnalites d'une habilitation
   * @returns 
   */
  getFeatures(idHabilitation: number): Observable<any> {
    let url = this.globalService.baseUrl2 + "/Habilitations/functionnalities/" + idHabilitation;
    return this.http.get<any>(url);
  }

  /**
   * Creer une habilitation
   * @param data 
   * @returns 
   */
  create(data: any): Observable<any> {
    let url = this.globalService.baseUrl2 + "/Habilitations/newEdit";
    return this.http.post<any>(url, data);
  }

  /**
   * Mettre a jour une habilitation
   * @param data 
   * @returns 
   */
  edit(data: any): Observable<any> {
    let url = this.globalService.baseUrl2 + "/Habilitations/newEdit";
    return this.http.post<any>(url, data);
  }


}
