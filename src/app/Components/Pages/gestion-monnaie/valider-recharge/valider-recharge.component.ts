import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { GestionMonnaieShowInformationDialogComponent } from 'src/app/Components/Modals/gestion-monnaie-show-information-dialog/gestion-monnaie-show-information-dialog.component';
import { Plafond } from 'src/app/modal/plafond';
import { PlafondService } from 'src/app/services/plafond/plafond.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-valider-recharge',
  templateUrl: './valider-recharge.component.html',
  styleUrls: ['./valider-recharge.component.css']
})
export class ValiderRechargeComponent implements OnInit {
  displayedColumns: string[] = [];

  ELEMENT_DATA: Plafond[] = [
  ];
  dataSource!: MatTableDataSource<Plafond, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, public plafond: PlafondService, public valideservice: ValidationService) { }

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

  valider_recharge(valid: any) {

    // on affiche le dialogue de confirmation
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Validation",
        message: `Voulez vous vraiment confirmer cette validation ?`,
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      if (result) {

        // on active la barre de progression de la requete
        this.isProgressHidden = false;

        // on deefinit corps de la requete
        let data: any = {
          "merchantId": `${valid.merchant}`,
          "amount": `${valid.amount}`,
          "createBy": `${valid.creerPar}`,
          "password": "12345",
          "status": valid.statut != "En attente" ? "0" : "1",
          "cautionId": `${valid.id}`
        }
console.log(data);
        // on envoi la requete de validation
        this.valideservice.suplyvalidate(data).subscribe(res => {
          console.log(res);
          // au retour de la reponse, on desactive la barre de progression
          this.isProgressHidden = true;

          // on definit le type d'alerte  afficher en fonction du code de retour
          let res_code = res.code;
          switch (+res_code) {
            case 400:
              this.alert_type = 'warning'
              break;
            default:
              this.alert_type = 'info'
              break;
          }
          this.alert_message = res.data.message;
          this.openAlert();
        });


      } else {

      }
    });
  }

  rejeter_recharge(valid: any) {
    // on affiche le dialogue de confirmation
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Annuler une recharge",
        message: `Voulez vous vraiment annuler cette recharge?`,
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      if (result) {

        // on active la barre de progression de la requete
        this.isProgressHidden = false;

        // on deefinit corps de la requete


        // on envoi la requete de validation


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
        this.alert_message = "La rcharge a ete annuler.";
        this.alert_type = "info";
        this.openAlert();
        // });


      } else {

      }
    });
  }

  show_information(data: any) {
    const show_info_dialog = this.dialog.open(GestionMonnaieShowInformationDialogComponent, {
      data: data
    });

    show_info_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  
  ngOnInit(): void {
    this.plafond.getDemandeAprov().subscribe(plafond => {
      let data: any[] = [];
      //https://cvdesignr.com/p/62debc8614a1f

      this.ELEMENT_DATA = plafond.data.filter((valid: any) => valid.statut === "En attente");
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Client', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le', 'Actions'];
      this.dataSource = new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });
    this.displayedColumns = ['Client', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le', 'Actions'];
    this.dataSource = new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
  }
}

