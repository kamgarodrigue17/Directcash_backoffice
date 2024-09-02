import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { AdminService } from '../admin-plateforme/admin.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient,
    private globalService: GloabalServiceService,
    private _userService: AdminService
  ) { }
  /**
   * Recuperer la liste des transactions
   *  "type": "airtime" //xfert,airtime,ommomo,bills
   * @returns 
   */
  getAll(dateTo: string, dateFrom: string, type: "airtime" | "xfert" | "ommomo" | "bills"): Observable<any> {
    let data = {
      "vDateFrom": dateFrom,
      "vDateTo": dateTo,
      "vWhoAsk": this._userService.getLocalUser().data.UserName,
      "type": type
    }
    let url = this.globalService.baseUrl2 + "/operation/GetTransactions";
    return this.http.post<any>(url, data);
  }

}
