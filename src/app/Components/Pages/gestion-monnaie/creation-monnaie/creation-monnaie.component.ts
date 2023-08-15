import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { NotifierRechargeDialogComponent } from 'src/app/Components/Modals/notifier-recharge-dialog/notifier-recharge-dialog.component';
import { Plafond } from 'src/app/modal/plafond';
import { PlafondService } from 'src/app/services/plafond/plafond.service';

@Component({
  selector: 'app-creation-monnaie',
  templateUrl: './creation-monnaie.component.html',
  styleUrls: ['./creation-monnaie.component.css']
})
export class CreationMonnaieComponent implements OnInit {
  displayedColumns: string[] = [];
  ELEMENT_DATA: Plafond[] = [
  ];
  dataSource!: MatTableDataSource<Plafond, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, public plafond: PlafondService) { }

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


  open_edit_plafond_dialog(element: any) {
    const edit_plafond_dialog = this.dialog.open(NotifierRechargeDialogComponent, { data: element });

    edit_plafond_dialog.afterClosed().subscribe(result => {
      if (result != false) {

        // on recupere les donnees du formulaire
        let form_data = result;

        // on affiche le dialogue de confirmation
        const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: 'Confirmation',
            message: 'Appliquer les modifications ?'
          }
        });

        confirmation_dialog.afterClosed().subscribe(decision => {
          if (decision) {

            // on active la barre de progression
            this.isProgressHidden = false;

            // on envoi la requete de modification
            this.plafond.changeplafond(form_data).subscribe(res => {

              // au retour de la reponse, on masque la barre de progression
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
              this.alert_message = res.data;
              this.openAlert();

            })
          } else {
            // on annule toutes les modifications effectuees dans le formulaire
          }
        })

      } else {

      }
    });
  }

  ngOnInit(): void {
    this.plafond.plafonds().subscribe(plafond => {
      this.ELEMENT_DATA = plafond.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Solde courant', 'Service', 'Plafond (XAF)', 'Limite courante (XAF)', 'Partenaire', 'Dernière recharge', 'Statut', 'Action'];
      this.dataSource = new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });

    this.displayedColumns = ['Solde courant', 'Service', 'Plafond (XAF)', 'Limite courante (XAF)', 'Partenaire', 'Dernière recharge', 'Statut', 'Action'];
    this.dataSource = new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
  }
}


