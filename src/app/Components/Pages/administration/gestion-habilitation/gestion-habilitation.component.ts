import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { HabilitationDialogComponent } from 'src/app/Components/Modals/habilitation-dialog/habilitation-dialog.component';
import { Habilitation } from 'src/app/modal/habilitation';
import { HabilitationService } from '../../../../services/habilitation/habilitation.service';
import { Router } from '@angular/router';
import { FonctionalitesService } from 'src/app/services/fonctionalites/fonctionalites.service';

@Component({
  selector: 'app-gestion-habilitation',
  templateUrl: './gestion-habilitation.component.html',
  styleUrls: ['./gestion-habilitation.component.css']
})
export class GestionHabilitationComponent implements OnInit {
  displayedColumns: string[] = [];
  ELEMENT_DATA: Habilitation[] = [];
  Fonctionnalites: FonctionnaliteModel[] = [];
  dataSource!: MatTableDataSource<Habilitation, MatTableDataSourcePaginator>

  constructor(
    public dialog: MatDialog,
    public habilition: HabilitationService,
    public fonctionaliteService: FonctionalitesService,
    private _snackBar: MatSnackBar,
    private _router: Router) { }

  snackbar_message = "";

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

  /**
   * Modal d'une habilitation | ajouter - Modifier
   * @param mode
   * @param data
   */
  editer_habilitation(mode: string, data: any) {
    const habilitation_dialog = this.dialog.open(HabilitationDialogComponent, {
      data: {
        mode: mode,
        element: data
      }
    });

    habilitation_dialog.afterClosed().subscribe(result => {

      // Apres la fermeture du dialog, si le resultat est diff de false
      if (result != false) {

        // on recupere le formulaire
        let data = result;

        if (data != undefined) {

          // on affiche dans la console
          console.log('====================================');
          console.log(data);
          console.log('====================================');

          // on verifie si les champs ont ete bien renseigner
          if (data.label.trim() == '' || data.description.trim() == '' || data.pass.trim() == '') {
            this.closeAlert()
            this.alert_message = "Tous les champs sont obligatoires."
            this.alert_type = "warning";
            this.openAlert();
          } else {
            // on verifie si le mot de passe est correct
            let myPassword = "12345";
            if (data.pass != myPassword) {
              this.closeAlert();
              this.alert_message = "Votre mot de passe est incorrect."
              this.alert_type = "warning";
              this.openAlert();
            } else {
              // Si tout est bon, on active la barre de progression
              this.isProgressHidden = false;

              try {
                // envoi de la requete et au retour
                let request = this.habilition.newEditHabilitation(data).subscribe(res => {

                  // on masque la barre de progression
                  this.isProgressHidden = true;

                  // on affiche le retour
                  console.log(res);

                  // si le code de retour est 200, on met a jour la liste des habilitation
                  if (res.code == 200) this.getHabilitationList();

                  // on notifie sur la vue
                  this.closeAlert();
                  this.alert_type = "info";
                  this.alert_message = res.message;
                  this.openAlert();
                });

              } catch (error) {
                this.closeAlert();
                this.alert_message = `${error}`
                this.alert_type = "danger";
                this.openAlert();
              }


            }
          }
        }
      }
    });

  }

  /**
   * Supprimer une habilitation
   * @param intitule
   */
  supprimer_habilitation(intitule: string) {
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Habilitation : " + intitule,
        message: "Voulez - vous vraiment supprimer cette habilitation ? \nLes comptes conernés n'auront plus d'habilitation"
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  /**
   * Afficher les fonctionnalites rattaches a une habilitation
   */
  show_information(habilitation: any) {
    localStorage.setItem("currentHabilitation", JSON.stringify(habilitation));
    localStorage.setItem("fonctionnaliteList", JSON.stringify(this.Fonctionnalites));
    this._router.navigateByUrl("/administration/gestion-habilitations/detail");
  }

  /**
   * Recuperer la liste des habilitations
   */
  getHabilitationList() {
    this.habilition.habilitations().subscribe(habi => {
      this.ELEMENT_DATA = habi.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Intitulé', 'Description', 'Crée par', 'Crée le', 'Actions'];
      this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });
  }

  /**
   * Recuperer la liste des fonctionnalité
   */
  getFonctionnalite() {
    this.fonctionaliteService.fonctionalites("1").subscribe(response => {
      this.Fonctionnalites = response.data;
    })
  }


  ngOnInit(): void {
    this.getHabilitationList();
    this.getFonctionnalite()
    this.displayedColumns = ['Intitulé', 'Description', 'Crée par', 'Crée le', 'Actions'];
    this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
  }

}

/**
 * Model pour representer une fonctionnalite
 */
export interface FonctionnaliteModel {
  accessibilite: number;
  id: number,
  label: string,
  menu: string,
  status: string
}


