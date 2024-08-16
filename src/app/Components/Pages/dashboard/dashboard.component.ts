import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
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
    private _agentService: AgentServiceService
  ) { }

  // ------------------------------------ Variables
  admin_user = 0;
  myDirectCash_user = 0;
  directCash_user = 0;

  isAdminUserLoading = false;
  isMyDirectcashUserLoading = false;
  isDirectcashUserLoading = false;

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
  }


  // ------------------------------------ Init
  ngOnInit() {
    this.getAdminsUser();
    this.getMyDirectCashUser();
  }

}
