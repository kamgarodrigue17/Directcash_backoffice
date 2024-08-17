import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-recharge-online',
  templateUrl: './recharge-online.component.html',
  styleUrls: ['./recharge-online.component.css']
})
export class RechargeOnlineComponent {
  displayedColumns: string[] = ['idtrans', 'nom', 'tel', 'montant', 'statut', 'creerle', 'creerpar', 'traiterle', 'traiterpar', 'action'];

  ELEMENT_DATA: any[] = [
  ];
  dataSource!: MatTableDataSource<any, MatTableDataSourcePaginator>

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private valideservice: ValidationService
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
        // this.isProgressHidden = false;

        // on deefinit corps de la requete
        let data: any = {};

        // on envoi la requete de validation de la recharge mydirectcash
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
      }
    });
  }

  rejeter_recharge(recharge: any) {
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

        // on definit corps de la requete


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

      }
    });
  }

  ngOnInit(): void {
    // recuperer les recharges mydirectcash effectuees en ligne
  }
}
