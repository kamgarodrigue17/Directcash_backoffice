import { Injectable } from '@angular/core';
import { Agent } from 'src/app/modal/agent';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloabalServiceService } from '../gloabal-service.service';

@Injectable({
  providedIn: 'root'
})
export class AgentServiceService {

  constructor(private http: HttpClient, private globalService: GloabalServiceService) { }

  Agents(listid: string): Observable<any> {

    return this.http.get<any>(this.globalService.baseUrl + "/api/Users/GetReportList?id=tabetsing&listeId=" + listid);
  }
  // passer l id
  update(data: Agent): Observable<String> {
    // hola

    return this.http.post<String>(this.globalService.baseUrl + "/api/Users/AddEditAgent", data);
  }
  //id=null car l api  est generique
  create(data: Agent): Observable<String> {

    return this.http.post<String>(this.globalService.baseUrl + "/api/Users/AddEditAgent", data);
  }
}
