import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { AddAgentDialogComponent } from 'src/app/Components/Modals/add-agent-dialog/add-agent-dialog.component';
import { BlockAccountDialogComponent } from 'src/app/Components/Modals/block-account-dialog/block-account-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { ShowSuperAgengDialogComponent } from 'src/app/Components/Modals/show-super-ageng-dialog/show-super-ageng-dialog.component';
import { Merchant } from 'src/app/modal/merchant';
import { AgentService } from 'src/app/services-v2/agent/agent.service';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';

@Component({
  selector: 'app-super-agents',
  templateUrl: './super-agents.component.html',
  styleUrls: ['./super-agents.component.css']
})
export class SuperAgentsComponent implements OnInit {
  displayedColumns: string[] = ['Nom', 'Téléphone', 'iban', 'Compte principal', 'MerchantName', 'Actions'];
  ELEMENT_DATA: Merchant[] = [
  ];
  dataSource!: MatTableDataSource<any, MatTableDataSourcePaginator>

  constructor(
    public dialog: MatDialog,
    public AgentService: AgentServiceService,
    public merchantService: SuperAgentService,
    private _agentService: AgentService
  ) { }

  // variable pour le loader du chargement des elements du tableau
  display = 'none';

  // loader pour le chargement du tableau
  isLoaderHidden = true;

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

  /**
   * Fonction d'exportation du contenu du tableau sous plusieurs formats
   * CSV, EXCEL, PDF
   */
  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { selected_value: "", title: "des super - Agents" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * Fonction pour la boite  de dialogue d'un super agent (modification et consultation)
   * @param mode
   * @param data
   */
  open_show_super_agent_dialog(mode: string, data: any) {
    const show_super_agent_dialog = this.dialog.open(ShowSuperAgengDialogComponent, {
      data: {
        mode: mode,
        element: data
      }
    });

    show_super_agent_dialog.afterClosed().subscribe(result => {
      if (result != false) {
        // on recupere le retour du formulaire
        let merchant: any = result;
        console.log(merchant);

        // on affiche le dialogue de confirmation
        const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: "Confirmation de modification",
            message: "Valider les modifications effectuées ?"
          }
        });

        confirmation_dialog.afterClosed().subscribe(decision => {
          if (decision) {
            // on affiche la barre de progression de la requete
            this.isProgressHidden = false;

            // consommation de l'api
            this.merchantService.create(merchant).subscribe(res => {
              // au retour de la reponse
              // on remet le isProgressHidden a true
              this.isProgressHidden = true;

              // en fonction du code de retour on defini le type d'alerte a afficher
              console.log(res);
              // this.alert_type = "success";
              // this.alert_message = "Le mot de passe de l'agent " + agent.agentName + " été rénitialiser à 12345."
              // this.openAlert();

            }, ((err) => {
              console.log(err);

            }))

          } else {

          }
        });

      } else {

      }
    });
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
   * Recuperer la liste des agents
   */
  getAgents() {
    // start loading
    this.isProgressHidden = false;

    this._agentService.getAll().subscribe(res => {

      // log response
      console.log('--- get agent response ---');
      console.log(res);

      // set data
      let agentList: any[] = [];
      agentList = res.data;
      this.ELEMENT_DATA = agentList.filter((agent, index) => { return agent.Type == "SA" });
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

      // set paginator
      this.dataSource.paginator = this.paginator;

      // stop loading
      this.isProgressHidden = true;

    }, (error) => {

      // stop loading
      this.isProgressHidden = true;

      // show alert
      this.closeAlert();
      this.alert_message = "Une erreur est survenue.";
      this.alert_type = 'danger';
      this.openAlert();

      // log error
      console.log('--- ERREUR GET SUPERS AGENTS ---');
      console.log(error);


    })
  }


  ngOnInit(): void {
    this.AgentService.Agents("Merchants").subscribe(agents => {
      this.ELEMENT_DATA = agents.data;
      console.log(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource<Merchant>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none'
    });

    this.displayedColumns = ['Nom', 'Téléphone', 'Compte principal', 'Collecte de fonds', 'Paiement marchand', 'Commissions', 'MerchantName', 'Actions'];
    this.dataSource = new MatTableDataSource<Merchant>(this.ELEMENT_DATA);
  }

}





