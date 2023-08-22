import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApprovisionnerAgenceDialogComponent } from 'src/app/Components/Modals/approvisionner-agence-dialog/approvisionner-agence-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { Merchant } from 'src/app/modal/merchant';
import { Plafond } from 'src/app/modal/plafond';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { PlafondService } from 'src/app/services/plafond/plafond.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-approvisioner-agence',
  templateUrl: './approvisioner-agence.component.html',
  styleUrls: ['./approvisioner-agence.component.css']
})
export class ApprovisionerAgenceComponent implements OnInit {
  displayedColumns: string[] = [];
  ELEMENT_DATA: Plafond[] = [];
  merchants: Merchant[] = [];
  dataSource!: MatTableDataSource<Plafond, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, private router: Router, public plafond: PlafondService, private agentService: AgentServiceService, private valideservice: ValidationService, private globalService: GloabalServiceService) {

  }
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
      data: { selected_value: '', title: "des approvisionnements" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_appr_agence_dialog() {
    const appr_agence_dialog = this.dialog.open(ApprovisionnerAgenceDialogComponent, {
      data: {
        object: 'agence',
        merchants: this.merchants
      }
    });

    appr_agence_dialog.afterClosed().subscribe(result => {

      // if (result == true) {
      //   this.router.navigateByUrl("gestion-monnaie/approvisionner-agence/valider");
      // }
      if (result != false) {
        // on recupere les valeur du formulaire
        let form_data: any = JSON.parse(JSON.stringify(result));

        // on active la barre de progression
        this.isProgressHidden = false;

        console.log(form_data);

        // on envoie la requete
        if (form_data.merchantId != null) {
          try {
            let request = this.valideservice.initdemandeAprovisionenm(result).subscribe(res => {
              // on masque la barre de progression
              this.isProgressHidden = true;
              // console.log(res);
            });

            setTimeout(() => {
              if (!request.closed) {
                this.isProgressHidden = true;
                this.alert_type = 'warning';
                this.alert_message = 'Le serveur a mis trop de temps à repondre. Réessayer ultérieurement.';
                this.openAlert();
              }

            }, this.globalService.timeout_time);
          } catch (error) {
            this.isProgressHidden = true;
            this.alert_type = 'danger';
            this.alert_message = error + '';
            this.closeAlert();
            this.openAlert();
          }

        }
      }

    });
  }
  ngOnInit(): void {
    this.plafond.getDemandeAprov().subscribe(plafond => {
      this.ELEMENT_DATA = plafond.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Super agent', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le'];
      this.dataSource = new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });

    this.agentService.Agents("Merchants").subscribe(merchants => {
      this.merchants = merchants.data;
    });

    this.displayedColumns = ['Super agent', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le'];
    this.dataSource = new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
  }
}

