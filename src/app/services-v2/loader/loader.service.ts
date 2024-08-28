import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  /**
   * Variable permettant de manipuler l'etat d'un loader
   */
  isProgressHidden = true;
}
