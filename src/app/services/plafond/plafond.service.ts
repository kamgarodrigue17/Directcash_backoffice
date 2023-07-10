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
  
    return this.http.get<any>(this.globalService.baseUrl+"api/Monnetique/Stock/ServiceStock");
  }
}
