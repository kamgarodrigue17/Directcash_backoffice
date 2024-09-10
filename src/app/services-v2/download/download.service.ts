import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DateTime {
  date!: string
  time!: string
}

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Telecharger un fichier en tant que blob
   * @param url url du fichier a telecharger
   * @returns 
   */
  downloadFile(url: string) {
    return this.http.get(url, { responseType: 'blob' as 'json' });
  }

}