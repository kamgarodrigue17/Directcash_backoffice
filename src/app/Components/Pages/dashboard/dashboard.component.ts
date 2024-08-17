import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HabilitationService } from 'reclamations/habilitation.service';
import { catchError, throwError } from 'rxjs';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { RequeteEmissionService } from 'src/app/services/requete-emission/requete-emission.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private _userService: ValidationService,
    private _matSnackBar: MatSnackBar,
    private _agentService: AgentServiceService,
    private _habilitationService: HabilitationService,
    private _requeteemissionService: RequeteEmissionService
  ) { }

  // ------------------------------------ Variables
  admin_user = 0;
  myDirectCash_user = 0;
  directCash_user = 0;
  nbr_habilitation = 0;
  stock_monnaie = 0;
  stock_directcash = 0;
  stock_mydirectcash = 0;

  isAdminUserLoading = false;
  isMyDirectcashUserLoading = false;
  isDirectcashUserLoading = false;
  isProfilLoading = false;
  isEncourLoading = false;

  // ------------------------------------ Fonctions

  /**
   * Recuperer la liste des admins (on s'attardera sur le nombre)
   */
  getAdminsUser() {
    // code ...
    try {
      // start loading
      this.isAdminUserLoading = true;

      // send request
      this._userService.getAdmin().subscribe(res => {
        // get list
        let admins: any[] = res.data;

        // get admin number
        this.admin_user = admins.length;

        // stop loading
        this.isAdminUserLoading = false;
      });
    } catch (error) {
      // log error
      console.log('--- ERREUR ---');
      console.log(error);

      // display snackbar
      this._matSnackBar.open("Une erreur est survenue lors de la récupération des administrateurs")._dismissAfter(3000);
    }

  }

  /**
   * Recuperer la liste des user my directcash du reseau
   */
  getMyDirectCashUser() {
    // code ...
    try {
      // start loading
      this.isMyDirectcashUserLoading = true;

      // send request
      this._agentService.Agents("Clients").subscribe(res => {
        // get list
        let myDirectacshUser: any[] = res.data;

        // get mydirectcash user number
        this.myDirectCash_user = myDirectacshUser.length;

        // stop loading
        this.isMyDirectcashUserLoading = false;
      });

    } catch (error) {
      // log error
      console.log('--- ERREUR ---');
      console.log(error);

      // display snackbar
      this._matSnackBar.open("Une erreur est survenue lors de la récupération des utilisateurs MyDirectCash")._dismissAfter(3000);
    }
  }

  /**
   * Recuperer la liste des user directcash du reseau
   */
  getDirectCashUser() {
    // code ...
    try {
      // start loading
      this.isDirectcashUserLoading = true;

      this._agentService.Agents("Agents").subscribe(res => {

        // stop loading
        this.isDirectcashUserLoading = false;

        // get data
        let agents: any[] = res.data;
        this.directCash_user = agents.length;
      });
    } catch (error) {
      // stop loading
      this.isDirectcashUserLoading = false;

      // log error
      console.log('--- ERREUR GET AGENTS ---');
      console.log(error);
    }
  }

  /**
   * Recuperer le nombre d'habiliattions/profil dans la plateforme
   */
  getHabilitation() {
    try {
      // start loading
      this.isProfilLoading = true;

      this._habilitationService.habilitations().subscribe(res => {
        // stop loading
        this.isProfilLoading = false;

        // get data
        let profils: any[] = res.data;

        // set number
        this.nbr_habilitation = profils.length;
      });
    } catch (error) {

      // stop loading
      this.isProfilLoading = false;

      // log error
      console.log('--- ERREUR GET PROFILS ---');
      console.log(error);
    }

  }

  /**
   * Pour chaque habilitation, recuperer les users
   */
  getUserHabiliation() {

  }

  /**
   * Recuperer le nbr de transactions et les classer en reussie / echouer
   */
  getTransactions() {

  }

  /**
   * Recuperer les valeur d'encours de la monnaie 
   */
  getEncoursMonnaie() {
    try {
      // start loading
      this.isEncourLoading = true;

      // send request
      this._requeteemissionService.getInfo().pipe(
        catchError((error: HttpErrorResponse) => {
          this.isEncourLoading = false;
          if (error.status !== 200) {

            // log response
            console.log('--- ERREUR GET ENCOURS MONNAIE ---');
            console.log(error.message);
          }
          return throwError(error);
        })
      ).subscribe(res => {
        // stop loading
        this.isEncourLoading = false;

        // assign values
        this.stock_directcash = res.data.soldeDirectcash;
        this.stock_mydirectcash = res.data.soldeMd;
        this.stock_monnaie = res.data.soldeFournisseur;
      })
    } catch (error) {
      // log error
      console.log('--- ERREUR GET ENCOURS MONNAIE ---');
      console.log(error);

      // stop loading
      this.isEncourLoading = false;
    }
  }


  // ------------------------------------ Init
  ngOnInit() {
    this.getAdminsUser();
    this.getMyDirectCashUser();
    this.getDirectCashUser();
    this.getHabilitation();
    this.getEncoursMonnaie();
  }

}
