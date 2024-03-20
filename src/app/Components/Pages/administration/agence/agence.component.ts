import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { AgenceDialogComponent } from 'src/app/Components/Modals/agence-dialog/agence-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { Habilitation } from 'src/app/modal/habilitation';
import { Merchant } from 'src/app/modal/merchant';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent implements OnInit {
  displayedColumns: string[] = ['Matricule','Nom de l\'agence', 'Adresse', 'Merchant', 'Ajoutée par', 'Ajoutée le', 'Actions'];
  ELEMENT_DATA: Habilitation[] = [];
  merchants: Merchant[] = [];
  dataSource!: MatTableDataSource<Habilitation, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, public agenceService: SuperAgentService, private agentservice: AgentServiceService, private globalService: GloabalServiceService) { }

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
   * Agence dialog
   * @param mode -- add, edit, show --
   * @param agence
   */
  open_agence_dialog(mode: string, agence: any) {
    const agence_dialog = this.dialog.open(AgenceDialogComponent, {
      data: {
        mode: mode,
        agence: agence,
        merchants: this.merchants,
      }
    });
    agence_dialog.afterClosed().subscribe(result => {

      if (result != false) {

        // on recupere les donnee du formulaire
        let form_data: any = result;
        console.log(form_data);

        // on active la barre de progression
        this.closeAlert();
        this.isProgressHidden = false;

        try {
          // on envoi la requete de modification
          let request = this.agenceService.newEditAgence(form_data).subscribe(res => {
            console.log(res)

            // on masque la barre de progression
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
          }, (error) => {

            // on affiche les erreurs
            console.log(error.error.errors);

            // on masque la barre de progression
            this.isProgressHidden = true;

            // on annule la requete
            request.unsubscribe();

            // et on affiche un message d'alerte
            this.alert_type = 'danger';
            this.alert_message = 'Une erreur est survenue.';
            this.closeAlert();
            this.openAlert();
          })

          // temps de reponse max: 10s | Si apres 10s,il y'a aucune reponse...
          setTimeout(() => {

            // si la requete est toujours entrain de recevoir les donnees...
            if (!request.closed) {
              // on masque la barre de progression
              this.isProgressHidden = true;

              // on annule la requete
              request.unsubscribe();

              // et on affiche un message d'alerte
              this.alert_type = 'warning';
              this.alert_message = 'Le serveur a mis trop de temps à repondre. Bien vouloir réessayer ultérieurement.';
              this.openAlert();
            }

          }, this.globalService.timeout_time);
        } catch (error) {

          // si une erreur survient
          this.isProgressHidden = true;

          this.alert_type = 'danger';
          this.alert_message = error + '';
        }


      } else {

      }
      console.log(`Dialog result: ${result}`);
    });
  }

  del_agence(nom: string) {
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Agence : " + nom,
        message: "Voulez - vous vraiment supprimer cette agence ?"
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      if (result) {
        // on active la barre de progression
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
        this.alert_message = 'Suppression effectuee.';
        this.alert_type = 'success';
        this.openAlert();

      }
    });
  }

  ngOnInit(): void {
    this.agenceService.Agences().subscribe(habi => {
      this.ELEMENT_DATA = habi.data;
      console.log(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });

    // on recupere aussi la liste des merchants
    this.agentservice.Agents("Merchants").subscribe(res => {
      this.merchants = res.data;
      console.log(this.merchants)
    });

    this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);

  }
}



