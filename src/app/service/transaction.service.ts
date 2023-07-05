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
constructor(private http: HttpClient, private globalService:GloabalServiceService) {

}
getTransaction(id:string,trxType:string,startDate:string,forWho:string,endDate:string): Observable<Transaction[]> {
  
  return this.http.get<Transaction[]>(this.globalService.baseUrl+`/api/Operations/GetTransactions?id=${id}&trxType=${trxType}&forWho=${forWho}&startDate=${startDate}&endDate=${endDate}`);
}
}
