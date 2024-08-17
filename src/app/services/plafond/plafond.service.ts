import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GloabalServiceService } from '../gloabal-service.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlafondService {

  constructor(
    public globalService:GloabalServiceService,
    private http: HttpClient
  ) { }
  plafonds(): Observable<any> {
  
    return this.http.get<any>(this.globalService.baseUrl+"/api/Monnetique/Stock/ServiceStock");
  }

   data= {
    "id": "85251865",
    "merchant": "202463001",
    "amount": "100",
    "statut": "En attente",
    "creerPar": "tabetsing",
    "creerLe": "11/24/2021 11:53:02 AM",
    "traiterPar": null,
    "traiterLe": null
};
changeplafond(data:any): Observable<any> {
  
  return this.http.post<any>(this.globalService.baseUrl+"/api/Monnetique/Stock/changePlafond",data);
}
  getDemandeAprov(): Observable<any> {
  
    return this.http.get<any>(this.globalService.baseUrl+`/api/Monnetique/Merchant/Supply/Pendingrequest?userId=${localStorage.getItem('id')}&filterStatus=&filterMerchant=&filterTraiterPar=&filterCreerPar=`);
  }
}
