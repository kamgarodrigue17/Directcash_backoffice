import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApprovisionnerAgenceDialogComponent } from 'src/app/Components/Modals/approvisionner-agence-dialog/approvisionner-agence-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { Plafond } from 'src/app/modal/plafond';
import { Transaction } from 'src/app/modal/transaction';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { MessageService } from 'src/app/services/message/message.service';
import { PlafondService } from 'src/app/services/plafond/plafond.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-crediter-super-agent',
  templateUrl: './crediter-super-agent.component.html',
  styleUrls: ['./crediter-super-agent.component.css']
})
export class CrediterSuperAgentComponent implements OnInit {
  displayedColumns: string[] = ['distributeur', 'montant', 'statut', 'created_by', 'created_at', 'updated_by', 'updated_at', 'action'];
  ELEMENT_DATA: any[] = [];
  merchants: any[] = [];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

  constructor(
    public dialog: MatDialog,
    public AgentService: AgentServiceService,
    public plafond: PlafondService,
    public valideservice: ValidationService,
    private _matSnackBar: MatSnackBar,
    private _messageService: MessageService
  ) {

  }

  // variable pour le loader du chargement des elements du tableau
  display = 'flex';

  // loader pour l'execution des requetes
  isProgressHidden = true;

  // message et type de l'alerte de la page
  alert_message = "";
  alert_type = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  closeAlert() {
    const alert = document.getElementById("alert");
    alert?.classList.add("d-none");
  }

  openAlert() {
    const alert = document.getElementById("alert");
    alert?.classList.remove("d-none");
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { selected_value: '', title: "des approvisionnements" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_crediter_super_agent_dialog() {
    const crediter_super_agent_dialog = this.dialog.open(ApprovisionnerAgenceDialogComponent, {
      data: {
        object: 'super-agent',
        merchants: this.merchants
      }, disableClose: true
    });

    crediter_super_agent_dialog.afterClosed().subscribe(result => {

      if (result != false) {
        try {
          console.log('--- DATA ---');
          console.log(result);

          // check if password correct
          if (result.password != '12345') {
            this._matSnackBar.open("Mot ed passe incorrect !.")._dismissAfter(3000);
            return;
          }

          // start loading
          this.isProgressHidden = false;

          this.valideservice.initdemandeAprovisionenm(result).pipe(
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

            // stop loader
            this.isProgressHidden = true;

            // on definit le type d'alerte  afficher en fonction du code de retour
            let res_code = res.code;
            switch (+res_code) {
              case 200:
                this.alert_type = 'success';
                this.alert_message = "Requête d'approvisionnement initiée avec succès";

                // refresh data
                this.getRequeteApproList();
                break;
              default:
                this.alert_type = 'danger';
                this.alert_message = "Une erreur est survenue lors de l'envoi de la requête.";

                // log response
                console.log(res);

                break;
            }
            this.closeAlert();
            this.openAlert();

          })
        } catch (error) {

          // top loader
          this.isProgressHidden = true;

          // show alert
          this.alert_type = 'danger';
          this.alert_message = "Une erreur est survenue.";

          this.closeAlert();
          this.openAlert();

          // log response
          console.log(error);

        }
      }
    });
  }

  /**
   * Valider uen requete
   * @param requete 
   */
  valider_requete(requete: any) {

    console.log(requete);

    // on affiche le dialogue de confirmation
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Validation",
        message: "Requête du " + requete.creerLe + ".\n Valider l'approvisionnement de " + requete.merchantName + " d'un montant de " + requete.amount + " XFA ?",
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      if (result == true) {
        try {

          // on deefinit corps de la requete
          let data: any = {
            "merchantId": `${requete.merchant}`,
            "amount": `${requete.amount}`,
            "createBy": localStorage.getItem("id"),
            "password": "12345",
            "status": requete.statut != "En attente" ? "0" : "1",
            "cautionId": `${requete.id}`
          }
          console.log(data)

          // on active la barre de progression de la requete
          this.isProgressHidden = false;

          // on envoi la requete de validation
          this.valideservice.suplyvalidate(data).pipe(
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
            console.log(res)
            // au retour de la reponse, on desactive la barre de progression
            this.isProgressHidden = true;

            // on definit le type d'alerte  afficher en fonction du code de retour
            let res_code = res.code;
            switch (+res_code) {
              case 400:
                this.alert_type = 'warning'
                break;

              case 200:
                this.alert_type = 'success';
                this.alert_message = "Requête validée avec succès.";
                break;
                
              default:
                this.alert_type = 'info'
                break;
            }
            this.alert_message = res.data;
            this.openAlert();
          });
        } catch (error) {

          // stop laoding
          this.isProgressHidden = true;

          // log error
          console.log('--- ERREUR ---');
          console.log(error);

          // show alert
          this.alert_message = "Une erreur est survenue";
          this.alert_type = 'danger';
          this.closeAlert();
          this.openAlert();

        }
      }
    });
  }

  /**
   * Recuperer la liste des approvisionnements
   */
  getRequeteApproList() {
    try {
      this.plafond.getDemandeAprov().subscribe(res => {
        // get data
        this.ELEMENT_DATA = res.data.objects;

        // set data
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

        // set paginator
        this.dataSource.paginator = this.paginator;
        this.display = 'none';
      });
    } catch (error) {
      // log error
      console.log('--- ERREUR GET DEMANDES LIST ---');
      console.log(error);
    }
  }

  /**
   * Recuperer la liste des distributeurs
   */
  getDistrbuteurList() {
    try {
      this.AgentService.Agents("Distributors").subscribe(data => {
        this.merchants = data.data;
      });
    } catch (error) {
      // log error
      console.log('--- ERREUR GET DISTRIBUTEUR LIST ---');
      console.log(error);
    }

  }

  ngOnInit(): void {

    this.getDistrbuteurList();
    this.getRequeteApproList();


    // this.dataSource.paginator = this.paginator;


  }


}

