import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { BlockAccountDialogComponent } from 'src/app/Components/Modals/block-account-dialog/block-account-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { DistributeurDialogComponent } from 'src/app/Components/Modals/distributeur-dialog/distributeur-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { Agent } from 'src/app/modal/agent';
import { DistributeurService } from 'src/app/services-v2/distributeur/distributeur.service';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-distributeur',
  templateUrl: './distributeur.component.html',
  styleUrls: ['./distributeur.component.css']
})
export class DistributeurComponent implements OnInit {

  displayedColumns: string[] = ['Nom', 'Téléphone', 'iban', 'Compte principal', 'Collecte de fonds', 'Paiement marchand', 'Commissions', 'Merchant', 'Actions'];
  ELEMENT_DATA: Agent[] = [
  ];
  dataSource!: MatTableDataSource<Agent, MatTableDataSourcePaginator>

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public AgentService: AgentServiceService,
    private _snackBar: MatSnackBar,
    private _messageService: MessageService,
    private _distributeurService: DistributeurService
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

  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { selected_value: "", title: "des Distributeurs" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  go_to_add_page() {
    this.router.navigateByUrl('/home/gestion-agents/distributeurs/liste/ajouter');
  }

  /**
  * Fonction pour bloquer un agent
  * @param object represente le type d'utilisateur (Soit un client / Soit un agent)
  * @param agent
  */
  bloquer_agent(object: string, agent: any) {
    const block_agent_dialog = this.dialog.open(BlockAccountDialogComponent, {
      data: {
        object: object,
        agent: agent
      }
    });

    block_agent_dialog.afterClosed().subscribe(result => {
      if (result) {
        this.isProgressHidden = false;
        // consommation de l'api
        // au retour de la reponse
        // on remet le isProgressHidden a true et
        // en fonction du code de retour on defini le type d'alerte a afficher
        this.alert_type = "info";
        this.alert_message = "L'agent " + agent.agentName + "a été bloqué."
        this.openAlert();
      } else {

      }
    });
  }

  open_distributeur_dialog(mode: string, element: any) {
    const distributeur_dialog = this.dialog.open(DistributeurDialogComponent, {
      data: {
        mode: mode,
        element: element,
        merchantList: this.ELEMENT_DATA
      }, disableClose: true
    });

    distributeur_dialog.afterClosed().subscribe(result => {

      if (result != false) {

        // log data
        console.log(result);

        // start loading
        this.isProgressHidden = false;

        // send request
        this._distributeurService.create(result).subscribe(response => {

          // stop loading
          this.isProgressHidden = true;

          // show alert info
          this.alert_type = 'info';
          this.alert_message = response.data[0].message;
          this.closeAlert();
          this.openAlert();

          // log response
          console.log('--- REPONSE EDIT DISTRIBUTEUR ---');
          console.log(response);

        }, (error) => {
          // stop loading
          this.isProgressHidden = true;

          // log error
          console.log('--- ERREUR EDIT DISTRIBUTEUR ---');
          console.log(error);

          // show alert
          this.closeAlert();
          this.alert_message = error.error.message;
          this.alert_type = 'danger';
          this.openAlert();
        })
      }
    });
  }

  validDistributeur(element: any){

  }

  /**
   * Fonction pour renitialiser le mot de passe d'un agent
   * @param agent
   */
  reset_password(agent: any) {

    const block_agent_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Renitialisation du mot de passe Agent",
        message: "Voulez - vous vraiment renitialiser le mot de passe de " + agent.merchantName + " à 12345 ?"
      }
    });

    block_agent_dialog.afterClosed().subscribe(result => {
      if (result) {
        // on affiche la barre de progression de la requete
        this.isProgressHidden = false;

        // consommation de l'api
        // au retour de la reponse
        // on remet le isProgressHidden a true et
        // en fonction du code de retour on defini le type d'alerte a afficher
        this.alert_type = "success";
        this.alert_message = "Le mot de passe de l'agent " + agent.agentName + " été rénitialiser à 12345."
        this.openAlert();
      } else {

      }
    });
  }

  /**
   * Recuperer liste des distributeurs
   */
  getDistributeurs() {

    try {
      // start loader
      this.isProgressHidden = false;

      // send request
      this._distributeurService.getAll().pipe(
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

        // get data
        this.ELEMENT_DATA = res.data;

        // log data
        console.log(this.ELEMENT_DATA);

        // populate table
        this.dataSource = new MatTableDataSource<Agent>(this.ELEMENT_DATA);

        // set paginator
        this.dataSource.paginator = this.paginator;

        // //
        // this.display = 'none'
      });

      // this.displayedColumns = ['Nom', 'Téléphone', 'Compte principal', 'Collecte de fonds', 'Paiement marchand', 'Commissions', 'Merchant', 'Actions'];
      // this.dataSource = new MatTableDataSource<Agent>(this.ELEMENT_DATA);

    } catch (error) {
      // stop loader
      this.isProgressHidden = true;

      // log response
      console.log('--- ERREUR ---');
      console.log(error);

      // show error
      this.alert_message = "Une erreur est survenue.";
      this.alert_type = "danger";
      this.closeAlert();
      this.openAlert();
    }

  }

  ngOnInit() {

    // get list distributeur
    this.getDistributeurs();

  }

}
