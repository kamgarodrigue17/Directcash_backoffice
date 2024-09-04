import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private globalService: GloabalServiceService,
    private _router: Router
  ) { }

  USER_ID_LENGHT = 10;
  USER_PASSWORD_LENGHT = 10;
  private USER_KEY = "directcash-user-key";
  private USER_PASSWORD_KEY = "directcash-user-password-key";

  /**
   * Variable de l'utlilisateur connecter
   */
  user: any;

  /**
   * Recupere le user connecter
   * @returns 
   */
  getLocalUser() {
    let user_str = localStorage.getItem(this.USER_KEY);
    let userJson: any = null;
    if (user_str) {
      userJson = JSON.parse(user_str);
    }
    return userJson;
  }

  /**
   * Recuperer le mot de passe de l'utilisateur
   * @returns 
   */
  getUserPassword() {
    let pass_str = localStorage.getItem(this.USER_PASSWORD_KEY);
    return pass_str;
  }

  /**
   * Enregistrer l'utilisateur
   * @param user 
   */
  setUser(user: any) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  /**
   * Genere un sequence alpha numerique pour l'identifiant d'un utilisateur
   * @returns 
   */
  generateID(length: number): string {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
    }

    return result;
  }

  /**
  * Recuperer la liste des administrateurs
  * @returns
  */
  index(): Observable<any> {
    let url = this.globalService.baseUrl2 + "/Users/list";
    return this.http.get<any>(url);
  }

  /**
   * Creer un admin de la plateforme
   * @param data 
   * @returns 
   */
  create(data: any): Observable<any> {
    let url = this.globalService.baseUrl2 + "/Users/newEdit";
    return this.http.post<any>(url, data);
  }

  /**
   * Renitialiser le mot de passe d'un admin
   * @param data 
   * @returns 
   */
  resetPassword(data: any): Observable<any> {
    let url = this.globalService.baseUrl2 + "/Users/newEdit";
    return this.http.post<any>(url, data);
  }

  /**
   * Changer le mot de passe d'un utilisateur
   * @param userID 
   * @param oldpassword 
   * @param newPassword 
   * @returns 
   */
  changePassword(userID: string, oldpassword: string, newPassword: string) {
    let data = {
      "vUserID": `${userID}`,
      "vOldPass": `${oldpassword}`,
      "vNewPass": `${newPassword}`
    }

    let url = this.globalService.baseUrl2 + "/changePassword";
    return this.http.post<any>(url, data);
  }

  /**
   * Modifier un admin
   * @param data 
   * @returns 
   */
  edit(data: any): Observable<any> {
    let url = this.globalService.baseUrl2 + "/Users/newEdit";
    return this.http.post<any>(url, data);
  }

  login(userId: string, password: string): Observable<any> {
    let data = {
      "vUserID": `${userId}`,
      "vPassword": `${password}`
    }
    let url = this.globalService.baseUrl2 + "/authenticate";
    return this.http.post<any>(url, data);
  }

  logout() {
    // clear local storage
    localStorage.clear();

    // go to login page
    this._router.navigateByUrl('/');
  }
}
