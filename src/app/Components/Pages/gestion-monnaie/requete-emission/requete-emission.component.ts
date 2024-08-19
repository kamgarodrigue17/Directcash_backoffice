import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { catchError, throwError } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { RequeteEmissionDialogComponent } from 'src/app/Components/Modals/requete-emission-dialog/requete-emission-dialog.component';
import { RequeteEmission } from 'src/app/modal/requete-emission';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { MessageService } from 'src/app/services/message/message.service';
import { RequeteEmissionService } from 'src/app/services/requete-emission/requete-emission.service';

@Component({
  selector: 'app-requete-emission',
  templateUrl: './requete-emission.component.html',
  styleUrls: ['./requete-emission.component.css']
})
export class RequeteEmissionComponent {
  displayedColumns: string[] = ['ref', 'amount', 'statut', 'created_by', 'created_at', 'treated_by', 'treated_at', 'action'];

  ELEMENT_DATA: RequeteEmission[] = [];
  dataSource!: MatTableDataSource<any>
  stock_monnaie_actuel!: Number;
  myPassword!: string;
  myId!: number;
  nouvelle_requete: RequeteEmission | undefined = undefined;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _requeteEmissionService: RequeteEmissionService,
    private _messageService: MessageService,
    private _globalService:GloabalServiceService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // variable pour le loader du chargement des elements du tableau
  display = 'flex';

  // loader pour l'execution des requetes
  isProgressHidden = true;

  // message et type de l'alerte de la page
  alert_message = "";
  alert_type = "";

  closeAlert() {
    const alert = document.getElementById("alert");
    alert?.classList.add("d-none");
  }

  openAlert() {
    const alert = document.getElementById("alert");
    alert?.classList.remove("d-none");
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Recuperer la valeur actuelle du stock de monnaie (optionnelle)
   */
  getSTockActuel() {
    // code ...
    this.stock_monnaie_actuel = 100;
  }

  /**
   * Open requete dialog
   * mode: add, show, edit
   * @param mode 
   * @param requete 
   * @returns 
   */
  open_requete_dialog(mode: string, requete: RequeteEmission | undefined) {

    // si le mode d'ouverture est different de l'ajout et le statut de la requete est different de "En attente"
    if (mode != 'add' && requete != undefined && requete.statut != "En attente") {

      // set alert message
      this.alert_message = "Cette requête a été traitée. Elle ne peut donc plus être modifiée.";
      this.alert_type = "danger";
      this.closeAlert();
      this.openAlert();

      // return 
      return;
    }

    // on affiche le dialogue des requetes d'emission
    const requete_dialog = this._dialog.open(RequeteEmissionDialogComponent, {
      data: {
        requete: requete,
        stock_monnaie_actuel: this.stock_monnaie_actuel,
        mode: mode,
      }, disableClose: true
    });

    requete_dialog.afterClosed().subscribe(result => {
      if (result != false) {

        // on definit le corps de la requete
        let data: RequeteEmission = result;
        let data_request = {
          "id": `${data.id}`,
          "reference": `${data.reference}`,
          "jour": `${data.jour}`,
          "amount": `${data.amount}`,
          "fournisseur": "",
          "statut": "0",
          "s": 1,
          "pass": `${data.pass}`,
          "creerPar": `${data.creerPar}`,
          "creerLe": `${data.creerLe}`,
          "traiterPar": " ",
          "traiterLe": " "
        };

        // log data
        console.log('--- DATA ---');
        console.log(data_request);

        if (mode == 'add') {

          try {
            // on active la barre de progression de la requete
            this.isProgressHidden = false;

            // on envoi la requete d'ajout de la requete d'emission
            this._requeteEmissionService.create(data_request).pipe(
              catchError((error: HttpErrorResponse) => {
                this.isProgressHidden = true;
                if (error.status !== 200) {
                  this.alert_type = 'danger';

                  this.alert_message = this._messageService.getHttpMessage(error.status);

                  this.closeAlert();
                  this.openAlert();

                  // log response
                  console.log(error.message);
                }
                return throwError(error);
              })
            ).subscribe(res => {
              console.log(res);
              // au retour de la reponse, on desactive la barre de progression
              this.isProgressHidden = true;

              // on definit le type d'alerte  afficher en fonction du code de retour
              let res_code = res.code;
              switch (+res_code) {
                case 200:
                  this.alert_type = 'success'
                  this.alert_message = "La requête a été intiée avec succès.";
                  break;

                case 400:
                  this.alert_type = 'danger'
                  break;

                default:
                  this.alert_type = 'danger';
                  this.alert_message = "Une erreur est survenue.";
                  break;
              }
              this.openAlert();
            });
          } catch (error) {

            // log error
            console.log('--- ERREUR ---');
            console.log(error);

            // show error
            this.alert_message = "Une erreur est survenue."
            this.alert_type = "danger";
            this.closeAlert();
            this.openAlert();
          }

        } else if (mode == 'edit') {
          // code ...
          console.log('--- edit requete emission ---');

        }
      }
    });
  }

  /**
   * Valider une requete
   * @param requete
   */
  valider_requete(requete: any) {
    // log data
    console.log("--- requete a valider ---");
    console.log(requete);

    // check if request is pending (Dans le cas ou il est quand meme arriver ici hahaha)
    if (requete.statut != "En attente") {
      // set alert message
      this.alert_message = " Cette requête a déjà été traité."
      this.alert_type = "info";
      this.closeAlert();
      this.openAlert();

      return;
    }

    // check if is same user
    if (requete.creerPar == localStorage.getItem("id")) {
      // set alert
      this.alert_message = "Vous ne pouvez pas valider une requête que vous avez intié."
      this.alert_type = "warning";
      this.closeAlert();
      this.openAlert();

      return;
    }

    // get amount to formatte
    let amount: number = requete.amount;

    // open confirmation dialog
    let confirmation_dialog = this._dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Requête du " + new Date(requete.creerLe),
        message: "Valider l'émission de " + amount.toLocaleString('en-US') + " XAF ?"
      }
    });

    confirmation_dialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        try {

          // set data request
          let data_request = {
            "id": `${requete.id}`,
            "reference": `${requete.reference}`,
            "jour": `${requete.jour}`,
            "amount": `${requete.amount}`,
            "fournisseur": ``,
            "statut": "1",
            "s": 1,
            "pass": `12345`,
            "creerPar": `${requete.creerPar}`,
            "creerLe": `${requete.creerLe}`,
            "traiterPar": `${localStorage.getItem("id")}`,
            "traiterLe": `${this._globalService.formatDate(new Date)}`
          };

          // on active la barre de progression de la requete
          this.isProgressHidden = false;

          // on envoi la requete d'ajout de la requete d'emission
          this._requeteEmissionService.validate(data_request).pipe(
            catchError((error: HttpErrorResponse) => {
              this.isProgressHidden = true;
              if (error.status !== 200) {
                this.alert_type = 'danger';

                this.alert_message = this._messageService.getHttpMessage(error.status);

                this.closeAlert();
                this.openAlert();

                // log response
                console.log('--- ERREUR ---');
                console.log(error.message);
              }
              return throwError(error);
            })
          ).subscribe(res => {
            console.log(res);
            // au retour de la reponse, on desactive la barre de progression
            this.isProgressHidden = true;

            // on definit le type d'alerte  afficher en fonction du code de retour
            let res_code = res.code;
            switch (+res_code) {
              case 200:
                this.alert_type = 'success'
                this.alert_message = "La requête a été validée avec succès. Vous venez d'emettre " + amount.toLocaleString("en-US") + "Dans le système";
                break;

              case 400:
                this.alert_type = 'danger'
                break;

              default:
                this.alert_type = 'danger';
                this.alert_message = "Une erreur est survenue.";
                break;
            }

            this.closeAlert();
            this.openAlert();
          });

        } catch (error) {

          // log error
          console.log('--- ERREUR ---');
          console.log(error);

          // show alert
          this.alert_message = "Une erreur est survenue. Veuillez réessayer ulterieurement."
          this.alert_type = "danger";
          this.closeAlert();
          this.openAlert();
        }

      }
    });
  }

  /**
   * Rejeter uen requete d'emission
   * @param requete 
   */
  rejeter_requete(requete: RequeteEmission) {

    // si le statut de la requete est "En attente"
    if (requete.statut == "En attente") {
      // on affiche le dialogue de confirmation
      const confirmation_dialog = this._dialog.open(ConfirmationDialogComponent, {
        data: {
          title: "Annuler la requête",
          message: `Voulez vous vraiment annuler cette requête?`,
        }
      });

      confirmation_dialog.afterClosed().subscribe(result => {
        if (result) {

          // on met  jour le statut de la requete d'emission a validee
          let statut = "Rejetée";

          // on active la barre de progression de la requete
          this.isProgressHidden = false;

          // on envoi la requete d'annulation
          this._requeteEmissionService.updateStatut(Number.parseInt(requete.id), statut).subscribe(res => {

            // au retour de la reponse, on desactive la barre de progression
            this.isProgressHidden = true;

            // on definit le type d'alerte  afficher en fonction du code de retour
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
            this.alert_message = "La requete d'émission a été efectuée avec succès.";
            this.alert_type = "success";
            this.openAlert();
          });
        } else { }
      });

    } else {
      const snackbar = this._snackBar.open("Cette requête a été traitée. Elle ne peut donc plus être modifiée.", "Ok");
      snackbar.onAction().subscribe(s => { snackbar.dismiss(); })
    }
  }

  /**
   * Recuperer la liste des requetes d'emission
   */
  getRequeteList() {

    // code ...
    try {
      // start loading
      this.isProgressHidden = false;

      // send request
      this._requeteEmissionService.index().pipe(
        catchError((error: HttpErrorResponse) => {
          this.isProgressHidden = true;
          if (error.status !== 200) {
            this.alert_type = 'danger';

            this.alert_message = this._messageService.getHttpMessage(error.status);

            this.closeAlert();
            this.openAlert();

            // log response
            console.log(error.message);
          }
          return throwError(error);
        })
      ).subscribe(res => {
        // stop loading
        this.isProgressHidden = true;

        // log request
        console.log('--- liste requete ---');
        console.log(res);

        // get data
        this.ELEMENT_DATA = res.data;

        // log data
        console.log('--- data ---');
        console.log(this.ELEMENT_DATA);
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      });

    } catch (error) {
      // stop loading
      this.isProgressHidden = true;

      // log error
      console.log('--- ERREUR ---');
      console.log(error);

      // show snackbar
      this._snackBar.open("Une erreur est survenue lors de la récupération des requêtes d'émissions")._dismissAfter(3000);
    }
  }

  ngOnInit(): void {
    // initialisation des variables
    this.stock_monnaie_actuel = 400;
    this.myPassword = "12345";
    this.myId = 0;

    this.getSTockActuel();
    this.getRequeteList();
  }
}
