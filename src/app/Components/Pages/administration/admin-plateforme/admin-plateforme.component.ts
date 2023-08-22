import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminDialogComponent } from 'src/app/Components/Modals/admin-dialog/admin-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { User } from 'src/app/modal/user';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { HabilitationService } from 'src/app/services/habilitation/habilitation.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-admin-plateforme',
  templateUrl: './admin-plateforme.component.html',
  styleUrls: ['./admin-plateforme.component.css']
})
export class AdminPlateformeComponent implements OnInit {
  displayedColumns: string[] = [];
  ELEMENT_DATA: User[] = [];
  habilitations: any[] = [];
  dataSource!: MatTableDataSource<User, MatTableDataSourcePaginator>

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: ValidationService,
    private habilitationService: HabilitationService,
    private globalService: GloabalServiceService
  ) { }
  selected_value: string = "";
  add_agent_form!: NgForm;
  snackbar_message!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // variable pour le loader du chargement des elements du tableau
  display = 'flex';

  // loader pour l'execution des requetes
  isProgressHidden = true;

  // message et type de l'alerte de la page
  alert_message = "";
  alert_type = "";

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
   * Fermeture de l'alerte
   */
  closeAlert() {
    const alert = document.getElementById("alert");
    alert?.classList.add("d-none");
  }

  /**
   * Ouverture de l'alerte
   */
  openAlert() {
    this.closeAlert();
    const alert = document.getElementById("alert");
    alert?.classList.remove("d-none");
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

  open_admin_dialog(mode: string, element: any) {
    const admin_dialog = this.dialog.open(AdminDialogComponent, {
      data: {
        mode: mode,
        data: element,
        habilitations: this.habilitations,
      }
    });

    admin_dialog.afterClosed().subscribe(result => {
      if (result != false) {
        // on recupere le contenu du formulaire
        let form_data = result;

        // on affiche les donnees du formulaire
        console.log(form_data);

        try {
          // on active la barre de progression
          this.isProgressHidden = false;

          // on envoi la requete
          let request = this.userService.Edit(result).subscribe(res => {

            // au retour de la reponse, on masque la barre de progression
            this.isProgressHidden = true;

            // et on definit le type d'alerte a afficher en fonction du code de retour
            let res_code = res.code;
            switch (+res_code) {
              case 400:
                this.alert_type = 'warning'
                break;
              default:
                this.alert_type = 'info'
                break;
            }
            this.alert_message = res.data;
            console.log(res);

            // lorsque le temps de reponse est au dessus du timeout (10s)
            setTimeout(() => {

              // on masque la barre de progression
              this.isProgressHidden = true;

              // on annule la requete si elle n'est pas encore terminer
              if (!request.closed) {

                // on annule la requete
                request.unsubscribe();

                this.alert_message = 'Le serveur a mis trop de temps à répondre. Réessayer ultérieurement.';
                this.alert_type = 'warning';
                this.closeAlert();
                this.openAlert();
              }

            }, this.globalService.timeout_time);

          }, error => {

            // on affiche les erreurs
            console.log(error.error.errors);

            // on masque la barre de progression
            this.isProgressHidden = true;

            // on affiche l'erreur
            this.alert_message = 'Une erreur est survenue.';
            this.alert_type = 'danger';
            this.closeAlert();
            this.openAlert();
          });

        } catch (error) {
          // on masque la barre de progression
          this.isProgressHidden = true;

          this.alert_type = 'danger';
          this.alert_message = error + '';
          this.closeAlert();
          this.openAlert();
        }

      }

    });

  }

  /**
   * Supprimer un admin
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

  reset_password(admin: any) {
    // on affiche le dialogue de confirmation
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Rénitialisation du mot de passe",
        message: "Le mot de passe de " + admin.userName + " sera rénitialiser à 12345. Continuer ?",
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      if (result) {
        try {
          // on affiche la barre de progression
          this.isProgressHidden = false;

          // consommation de l'api
          // au retour de la reponse, on masque la barre de progression
          this.isProgressHidden = true;

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
          this.alert_type = 'info';
          this.alert_message = 'Le mot de passe de ' + admin.userName + 'a été rénitialiser à 12345.';
          this.openAlert();

        } catch (error) {

          this.alert_type = 'warning';
          this.alert_message = error + '';
          this.openAlert();
        }
      }
    });

  }

  ngOnInit(): void {
    this.userService.getAdmin().subscribe(user => {
      this.ELEMENT_DATA = user.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Nom', 'Habilitation', 'Statut', 'Dernière connexion', 'Actions'];
      this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });

    // on recupere la liste des habilitation
    this.habilitationService.habilitations().subscribe(habilitations => {
      this.habilitations = habilitations.data;
    });

    this.displayedColumns = ['Nom', 'Habilitation', 'Statut', 'Dernière connexion', 'Actions'];
    this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  }
}


