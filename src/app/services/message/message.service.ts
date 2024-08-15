import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  getHttpMessage(code: number): string {
    let message = "";
    switch (code) {
      case 401:
        message = "Vous n'êtes pas autorisé a effectuer cette opération."
        break;

      default:
        break;
    }

    return message;
  }
}
