import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddProfilDialogComponent } from 'src/app/Components/Modals/add-profil-dialog/add-profil-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { Habilitation } from 'src/app/modal/habilitation';
import { FonctionalitesService } from 'src/app/services/fonctionalites/fonctionalites.service';

@Component({
  selector: 'app-detail-fonctionnalite',
  templateUrl: './detail-fonctionnalite.component.html',
  styleUrls: ['./detail-fonctionnalite.component.css']
})
export class DetailFonctionnaliteComponent implements OnInit {

  constructor(private _router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private fonctionnaliteService: FonctionalitesService) { }

  habilitation: any;
  fonctionnalites: Habilitation[] = [];

  displayedColumns: string[] = ['Menu', 'Sous - menu', 'Action'];
  dataSource = new MatTableDataSource<any>(this.fonctionnalites);

  // loader pour l'execution des requetes
  isProgressHidden = true;

  // message et type de l'alerte de la page
  alert_message = "";
  alert_type = "";

  // snackbar message
  snackbar_message = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  /**
   * Ajouter une fonctionnalite a une habilitation
   */
  add_fonctionnalite() {

    const add_fonctionnalite_dialog = this.dialog.open(AddProfilDialogComponent, {
      data: {
        fonctionnalites: this.fonctionnalites
      }
    });

    add_fonctionnalite_dialog.afterClosed().subscribe(result => {
      if (result != false) {
        console.log('Option =============================');
        console.log(result);
        console.log('====================================');

        // on verifie si l'option a ete bien renseigner
        if (result.option != '') {

          // on ferme l'instance de l'alert (si visible)
          this.closeAlert();

          // on active le loader de chargement des requetes
          this.isProgressHidden = false;

          // on envoi la requete
          let request = this.fonctionnaliteService.HabilitationAddOption(result).subscribe(response => {
            // au retour de la reponse, on stope la barre de progression
            this.isProgressHidden = true;

            console.log('Reponse de la requete ==============');
            console.log(response);
            console.log('====================================');

            switch (response.code) {
              case 200:
                this.alert_type = "success";

                // on met a jour la liste des fonctionnalites
                this.getFonctionnalite();
                break;

              case 400:
                this.alert_type = 'danger';
                break;

              default:
                break;
            }

            // on notifie sur la vue
            this.alert_message = response.data;
            this.openAlert();

          });
        } else {
          let snackbar = this._snackBar.open("Aucune fonctionnalité selectionnée.");
          snackbar._dismissAfter(3000);
        }
      }
    });
  }

  del_fonctionnalite() {
    const del_fonctionnalite_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation de suppression",
        message: "Retirer cette fonctionnalité de la liste ?"
      }
    });

    del_fonctionnalite_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  /**
   * Retourner a la page des habilitations
   */
  go_back() {
    this._router.navigateByUrl("/administration/gestion-habilitations");
  }

  /**
   * Recuperer la liste des fonctionnalite associer a l'habilitation
   * courante
   */
  getFonctionnalite() {
    // on recupere l'habilitation
    this.habilitation = JSON.parse(`${localStorage.getItem("currentHabilitation")}`);

    this.fonctionnaliteService.fonctionalites(this.habilitation.idhabilitation).subscribe(habi => {

      this.fonctionnalites = habi.data;
      console.log(this.fonctionnalites);
      this.displayedColumns = ['Menu', 'Sous - menu', 'Action'];
      ;
      this.dataSource = new MatTableDataSource<Habilitation>(this.fonctionnalites);
      this.dataSource.paginator = this.paginator;

    });
  }

  ngOnInit(): void {

    // on recupere la liste des fonctionnnalites a l'ouverture de la page
    this.getFonctionnalite();

    console.log('====================================');
    console.log(this.habilitation);
    console.log('====================================');

    console.log('====================================');
    console.log(this.fonctionnalites);
    console.log('====================================');
  }

}

export interface PeriodicElement {
  menu: string;
  sous_menu: string;
}
