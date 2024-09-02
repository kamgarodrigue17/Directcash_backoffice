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

 var data={
    "vDateFrom":"2023-05-01", "vDateTo":endDate, "vWhoAsk":localStorage.getItem('id'), "type":trxType
  }
  console.log(data)
  console.log(this.globalService.baseUrl+`/api/Operations/GetTransactions?id=${id}&trxType=${trxType}&forWho=${forWho}&startDate=${startDate}&endDate=${endDate}`);
  return this.http.post<any[]>(this.globalService.baseUrl+`/operation/GetTransactions`,data);
}

// passer l id
update(data:any): Observable<String> {
    
  return this.http.post<String>(this.globalService.baseUrl+"api/Monnetique/CreerMonnaie",data);
}
}
