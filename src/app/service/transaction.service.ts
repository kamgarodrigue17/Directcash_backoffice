import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchant } from 'src/app/modal/merchant';
import { GloabalServiceService } from '../services/gloabal-service.service';
import { Transaction } from '../modal/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
constructor(private http: HttpClient, private globalService:GloabalServiceService) {}

getTransaction(id:string,trxType:string,startDate:string,forWho:string,endDate:string): Observable<any> {
  console.log(this.globalService.baseUrl+`/api/Operations/GetTransactions?id=${id}&trxType=${trxType}&forWho=${forWho}&startDate=${startDate}&endDate=${endDate}`);
  return this.http.get<any[]>(this.globalService.baseUrl+`/api/Operations/GetTransactions?id=${id}&trxType=${trxType}&forWho=${forWho}&startDate=${startDate}&endDate=${endDate}`);
}

// passer l id
update(data:any): Observable<String> {
    
  return this.http.post<String>(this.globalService.baseUrl+"api/Monnetique/CreerMonnaie",data);
}
}
