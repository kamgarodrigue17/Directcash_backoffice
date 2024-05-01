import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApprovisionnerAgenceDialogComponent } from 'src/app/Components/Modals/approvisionner-agence-dialog/approvisionner-agence-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { Plafond } from 'src/app/modal/plafond';
import { Transaction } from 'src/app/modal/transaction';
import { PlafondService } from 'src/app/services/plafond/plafond.service';

@Component({
  selector: 'app-crediter-super-agent',
  templateUrl: './crediter-super-agent.component.html',
  styleUrls: ['./crediter-super-agent.component.css']
})
export class CrediterSuperAgentComponent implements OnInit {
  displayedColumns: string[] = [];
  ELEMENT_DATA: Plafond[] = [
  ];
  dataSource!: MatTableDataSource<Plafond, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, private router: Router, public plafond: PlafondService) {

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
        object: 'super-agent'
      }
    });

    crediter_super_agent_dialog.afterClosed().subscribe(result => {

      if (result == true) {
        this.router.navigateByUrl("gestion-monnaie/crediter-super-agent/valider");
      }
      console.log(result);
    });
  }

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
      if (result) {

        // on active la barre de progression de la requete
        this.isProgressHidden = false;

        // on deefinit corps de la requete
        // let data: any = {
        //   "merchantId": `${valid.merchant}`,
        //   "amount": `${valid.amount}`,
        //   "createBy": `${valid.creerPar}`,
        //   "password": "12345",
        //   "status": valid.statut != "En attente" ? "0" : "1",
        //   "cautionId": `${valid.id}`
        // }

        // on envoi la requete de validation
        // this.valideservice.suplyvalidate(data).subscribe(res => {

        //   // au retour de la reponse, on desactive la barre de progression
        //   this.isProgressHidden = true;

        //   // on definit le type d'alerte  afficher en fonction du code de retour
        //   let res_code = res.code;
        //   switch (+res_code) {
        //     case 400:
        //       this.alert_type = 'warning'
        //       break;
        //     default:
        //       this.alert_type = 'info'
        //       break;
        //   }
        //   this.alert_message = res.data;
        //   this.openAlert();
        // });


      } else {

      }
    });
  }

  ngOnInit(): void {
    this.plafond.getDemandeAprov().subscribe(plafond => {
      this.ELEMENT_DATA = plafond.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Super agent', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le', 'Action'];
      this.dataSource = new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });

    this.displayedColumns = ['Super agent', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le', 'Action'];
    this.dataSource = new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
  }
}

