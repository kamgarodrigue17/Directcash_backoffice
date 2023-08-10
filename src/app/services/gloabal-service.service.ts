import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GloabalServiceService {
  public baseUrl: string = 'https://apibackoffice.alliancefinancialsa.com';
  constructor() { }
   formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  getFirstDayOfWeek(date: Date): string {
    const dayOfWeek = date.getDay(); // Récupérer le jour de la semaine (0 pour dimanche, 1 pour lundi, ...)
    const firstDay = new Date(date.getTime()); // Créer une copie de la date
  
    // Soustraire le nombre de jours correspondant au jour de la semaine actuel
    firstDay.setDate(firstDay.getDate() - dayOfWeek);
  
    return this.formatDate(firstDay);
  }
   getFirstDayOfMonth(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Crée une nouvelle date en utilisant l'année et le mois de la date d'origine
    const firstDayOfMonth = new Date(year, month, 1);
    
    return this.formatDate(firstDayOfMonth);
  }
}
