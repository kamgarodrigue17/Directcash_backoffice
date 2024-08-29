import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AdminDialogComponent } from 'src/app/Components/Modals/admin-dialog/admin-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { User } from 'src/app/modal/user';
import { AdminService } from 'src/app/services-v2/admin-plateforme/admin.service';
import { AlertService } from 'src/app/services-v2/alert/alert.service';
import { DatetimeService } from 'src/app/services-v2/datetime/datetime.service';
import { HabilitationService } from 'src/app/services-v2/habilitation/habilitation.service';
import { LoaderService } from 'src/app/services-v2/loader/loader.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { MessageService } from 'src/app/services/message/message.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-admin-plateforme',
  templateUrl: './admin-plateforme.component.html',
  styleUrls: ['./admin-plateforme.component.css']
})
export class AdminPlateformeComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'habilitation', 'last-connection', 'action'];
  ELEMENT_DATA: User[] = [];
  habilitations: any[] = [];
  dataSource!: MatTableDataSource<any>

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService1: ValidationService,
    private _globalService: GloabalServiceService,
    private _userService: AdminService,
    private _habilitationService: HabilitationService,
    private _alertService: AlertService,
    protected _loaderService: LoaderService,
    protected _datetimeService: DatetimeService

  ) { }
  selected_value: string = "";
  add_agent_form!: NgForm;
  snackbar_message!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Fonction pour le filtre dynamique a un champs sur le tableau
   * @param event
   */
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Fonction d'exportation
   * Format disponible: CSV, PDF, EXCEL
   */
  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { selected_value: this.selected_value, title: "des Agents" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * Afficher, Modifier, ajouter un utilisateur
   * @param mode 
   * @param element 
   */
  open_admin_dialog(mode: string, element: any) {
    const admin_dialog = this.dialog.open(AdminDialogComponent, {
      data: {
        mode: mode,
        element: element,
        habilitations: this.habilitations,
        users: this.ELEMENT_DATA
      }, disableClose: true
    });

    admin_dialog.afterClosed().subscribe(result => {
      if (result != false) {

        // on affiche les donnees du formulaire
        console.log(result);

        try {
          // on active la barre de progression
          this._loaderService.isProgressHidden = false;

          // on envoi la requete
          this._userService.create(result).subscribe(res => {

            // // au retour de la reponse, on masque la barre de progression
            this._loaderService.isProgressHidden = true;

            // et on definit le type d'alerte a afficher en fonction du code de retour
            let res_code = res.code;
            switch (+res_code) {
              case 200:
                this._alertService.type = 'success'
                this._alertService.message = "Utilisateur ajouté avec succès.";

                // refresh data 
                this.getUsers();
                break;
              default:
                this._alertService.type = 'danger'
                this._alertService.message = "Une erreur est survenue.";
                break;
            }

            this._alertService.closeAlert();
            this._alertService.openAlert();

            console.log(res);

          }, error => {

            // on affiche les erreurs
            console.log(error.error.errors);

            // on masque la barre de progression
            this._loaderService.isProgressHidden = true;

            // on affiche l'erreur
            this._alertService.message = 'Une erreur est survenue.';
            this._alertService.type = 'danger';

            this._alertService.closeAlert();
            this._alertService.openAlert();
          });

        } catch (error) {
          // on masque la barre de progression
          this._loaderService.isProgressHidden = true;

          this._alertService.type = 'danger';
          this._alertService.message = error + '';

          this._alertService.closeAlert();
          this._alertService.openAlert();
        }

      }

    });

  }

  /**
   * Supprimer un utilisateur
   */
  open_del_admin_dialog() {
    const del_admin_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation de suppression",
        message: "Voulez - vous vraiment supprimer le compte de cette admin ?"
      }
    });

    del_admin_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  /**
   * Renitialiser le mot de passe d'un utilisateur
   * @param user 
   */
  reset_password(user: any) {
    // on affiche le dialogue de confirmation
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Rénitialisation du mot de passe",
        message: "Le mot de passe de " + user.userName + " sera rénitialiser à 12345. Continuer ?",
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      if (result) {
        try {
          // on affiche la barre de progression
          // consommation de l'api
          // au retour de la reponse, on masque la barre de progression
          // et on definit le type d'alerte a afficher en fonction du code de retour
          // let res_code = res.code;
          // switch (+res_code) {
          //   case 400:
          //     this.alert_type = 'warning'
          //     break;
          //   default:
          //     this.alert_type = 'info'
          //     break;
          // }
          // this.alert_message = res.data;
          this._alertService.type = 'info';
          this._alertService.message = 'Le mot de passe de ' + user.userName + 'a été rénitialiser à 12345.';
          this._alertService.closeAlert();
          this._alertService.openAlert();

        } catch (error) {

          this._alertService.type = 'warning';
          this._alertService.message = error + '';

          this._alertService.closeAlert();
          this._alertService.openAlert();
        }
      }
    });

  }

  /**
   * Recuperer la liste des utilisateurs
   */
  getUsers() {
    // start loading
    this._loaderService.isProgressHidden = false;

    // send request
    try {
      this._userService.index().subscribe(res => {

        console.log(res);


        // get data
        this.ELEMENT_DATA = res.data;

        // populate table
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

        // set up paginator
        this.dataSource.paginator = this.paginator;

        // stop loading
        this._loaderService.isProgressHidden = true;

      }, (error) => {
        // log error
        console.log('--- ERREUR GET USERS LIST ---');
        console.log(error);

        // stop loading
        this._loaderService.isProgressHidden = true;

        // show alert
        this._alertService.message = "Une erreur est survenue.";
        this._alertService.type = "danger";

        this._alertService.closeAlert();
        this._alertService.openAlert();
      });

    } catch (error) {

      // stop loading
      this._loaderService.isProgressHidden = true;

      // log error
      console.log('--- ERREUR ---');
      console.log(error);

      // show alert
      this._alertService.message = "Une erreur est survenue.";
      this._alertService.type = "danger";

      this._alertService.closeAlert();
      this._alertService.openAlert();
    }
  }

  /**
   * Recuperer la liste des habilitation
   */
  getHabilitations() {
    try {
      this._habilitationService.getAll().subscribe(res => {
        // get data
        this.habilitations = res.data;

        // log
        console.log('--- liste habilitation ---');
        console.log(this.habilitations);


      })

    } catch (error) {
      // log error
      console.log('--- ERREUR GET HABILITATION LIST ---');
      console.log(error);
    }

  }

  ngOnInit(): void {
    this.getUsers();
    this.getHabilitations();
  }
}


