import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { AddClientDialogComponent } from 'src/app/Components/Modals/add-client-dialog/add-client-dialog.component';
import { BlockAccountDialogComponent } from 'src/app/Components/Modals/block-account-dialog/block-account-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { Agent } from 'src/app/modal/agent';
import { CLientMyDirectcashService } from 'src/app/services-v2/client-mydirectcash/client-mydirectcash.service';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';

@Component({
  selector: 'app-client-mydirectcash',
  templateUrl: './client-mydirectcash.component.html',
  styleUrls: ['./client-mydirectcash.component.css']
})
export class ClientMydirectcashComponent implements OnInit {
  displayedColumns: string[] = ['Noms', 'Matricule', 'iban', 'Téléphone', 'Solde (XAF)', 'Adresse','profession', 'Actions'];
  ELEMENT_DATA: Agent[] = [
  ];
  dataSource!: MatTableDataSource<Agent, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, public AgentService: AgentServiceService, private _snackBar: MatSnackBar, private _clientService: CLientMyDirectcashService
  ) { }
  selected_value: string = "";
  add_agent_form!: NgForm;
  snackbar_message!: string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // variable pour le loader du chargement des elements du tableau
  display = 'none';

  // loader pour l'execution des requetes
  isProgressHidden = true;

  // message et type de l'alerte de la page
  alert_message = "";
  alert_type = "";

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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
      data: { selected_value: this.selected_value, title: "des clients MyDirectCash" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_add_client_dialog(mode: string, data: any) {
    const add_client_dialog = this.dialog.open(AddClientDialogComponent, {
      data: {
        element: data,
        mode: mode
      }
    });

    // add_client_dialog.afterClosed().subscribe(result => {
    //   this.add_agent_form = result;
    //   console.log(this.add_agent_form.value);
    // });
  }

  /**
   * Fonction pour bloquer un client
   * @param object represente le type d'utilisateur (Soit un client / Soit un agent)
   * @param agent
   */
  bloquer_client(object: string, client: any) {
    const block_agent_dialog = this.dialog.open(BlockAccountDialogComponent, {
      data: {
        object: object,
        agent: client
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
        this.alert_message = "Le client " + client.agentName + " a été bloqué."
        this.openAlert();
      } else {

      }
    });
  }

  /**
   * Fonction pour renitialiser le mot de passe d'un client a 12345
   * @param agent
   */
  reset_password(object: string, agent: any) {

    let element_name = object == 'agent' ? agent.agentName : agent.nom;
    const block_agent_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Renitialisation du mot de passe d'un client",
        message: "Voulez - vous vraiment renitialiser le mot de passe de " + element_name + " à 12345 ?"
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


  getClients() {
    // start loading
    this.isProgressHidden = false;

    this._clientService.getAll().subscribe(res => {

      // log response
      console.log('--- LISTE CLIENTS ---');
      console.log(res);

      // get data
      this.ELEMENT_DATA = res.data;

      // set data
      this.dataSource = new MatTableDataSource<Agent>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

      // stop loading
      this.isProgressHidden = true;


    }, (error) => {
      // log error
      console.log('--- ERREUR GET CLIENTS ---');
      console.log(error);

      // stop loading
      this.isProgressHidden = true;

      // show alert
      this.closeAlert();
      this.alert_message = "Une erreur est survenue.";
      this.alert_type = "danger";
      this.openAlert();

    });
  }

  ngOnInit(): void {
    this.getClients();
  }
}

