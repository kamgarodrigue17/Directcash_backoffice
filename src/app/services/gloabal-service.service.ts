import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GloabalServiceService {
  public baseUrl: string = 'Valor inicial';
  constructor() { }
}
