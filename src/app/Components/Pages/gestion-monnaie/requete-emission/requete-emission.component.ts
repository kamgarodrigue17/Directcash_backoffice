import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { RequeteEmissionDialogComponent } from 'src/app/Components/Modals/requete-emission-dialog/requete-emission-dialog.component';
import { RequeteEmission } from 'src/app/modal/requete-emission.model';
import { RequeteEmissionService } from 'src/app/services/requete-emission/requete-emission.service';

@Component({
  selector: 'app-requete-emission',
  templateUrl: './requete-emission.component.html',
  styleUrls: ['./requete-emission.component.css']
})
export class RequeteEmissionComponent {
  displayedColumns: string[] = [];

  ELEMENT_DATA: RequeteEmission[] = [];
  dataSource!: MatTableDataSource<RequeteEmission, MatTableDataSourcePaginator>
  stock_monnaie_actuel!: Number;
  myPassword!: string;
  myId!: number;
  nouvelle_requete: RequeteEmission = new RequeteEmission();

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, public requeteEmissionService: RequeteEmissionService) { }

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

  open_requete_dialog(mode: string, requete: RequeteEmission) {

    // si le mode d'ouverture est different de l'ajout le statut de la requete est different de "En attente"
    if (mode != 'add' && requete.statut != "En attente") {
      const snackbar = this._snackBar.open("Cette requête a été traitée. Elle ne peut donc plus être modifiée.", "Ok");
      snackbar.onAction().subscribe(s => {
        snackbar.dismiss();
      })
      return;
    } else {
      // on affiche le dialogue des requetes d'emission
      const requete_dialog = this.dialog.open(RequeteEmissionDialogComponent, {
        data: {
          requete: requete,
          stock_monnaie_actuel: this.stock_monnaie_actuel,
          mode: mode,
        }
      });

      requete_dialog.afterClosed().subscribe(result => {
        if (result != false) {

          // on deefinit corps de la requete
          let data: any = result

          if (mode == 'add') {

            let data_requete: RequeteEmission = data;

            console.log('--- DATA ---');
            console.log(data_requete);

            if (data_requete.amount > 1) {

              // on active la barre de progression de la requete
              this.isProgressHidden = false;
              console.log(data_requete)
              // on envoi la requete d'ajout de la requete d'emission
              this.requeteEmissionService.create(data_requete).subscribe(res => {
                console.log(res)
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
                this.alert_message = res.data;
                this.openAlert();
              });

            } else {
              const snackbar = this._snackBar.open("Montant invalide.", "Ok");
              snackbar.onAction().subscribe(s => {
                snackbar.dismiss();
              })
              return;
            }

          } else if (mode == 'show') {

            // s'il s'agit de l'auteur de la requete, il n pourra pas valider
            if (requete.id_creer_par == this.myId) {
              const snackbar = this._snackBar.open("Vous ne pouvez pas valider une requête émise par vous même.", "Ok");
              snackbar.onAction().subscribe(s => { snackbar.dismiss(); return; })
            }

            let data_password = data.password;

            if (data_password == this.myPassword) {
              let data_requete: RequeteEmission = data.requete;

              // on met  jour le statut de la requete d'emission a validee
              let statut = "Validée";

              // on active la barre de progression de la requete
              this.isProgressHidden = false;

              // on envoi la requete d'ajout de la requete d'emission
              this.requeteEmissionService.updateStatut(data_requete.id_requete, statut).subscribe(res => {

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
                // this.alert_message = res.data;
                this.alert_message = "La requete d'émission a été efectuée avec succès.";
                this.alert_type = "success";
                this.openAlert();
              });
            } else {
              this._snackBar.open("Votre mot de passe est incorrect.", "Ok");
            }

          }

        } else {

        }
      });
    }

  }

  valider_requete(requete: any) {
    let confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Requête du 20/10/2023 15:36",
        message: "Valider l'émission de 1 000 000 XAF ?"
      }
    });

    confirmation_dialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        console.log(requete);
      }
    });
  }

  rejeter_requete(requete: RequeteEmission) {

    // si le statut de la requete est "En attente"
    if (requete.statut == "En attente") {
      // on affiche le dialogue de confirmation
      const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: "Annuler la requête",
          message: `Voulez vous vraiment annuler cette requête?`,
        }
      });

      confirmation_dialog.afterClosed().subscribe(result => {
        if (result) {

          // on met  jour le statut de la requete d'emission a validee
          let statut = "Rejetée";

          // on active la barre de progression de la requete
          this.isProgressHidden = false;

          // on envoi la requete d'annulation
          this.requeteEmissionService.updateStatut(requete.id_requete, statut).subscribe(res => {

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
            // this.alert_message = res.data;
            this.alert_message = "La requete d'émission a été efectuée avec succès.";
            this.alert_type = "success";
            this.openAlert();
          });
        } else { }
      });

    } else {
      const snackbar = this._snackBar.open("Cette requête a été traitée. Elle ne peut donc plus être modifiée.", "Ok");
      snackbar.onAction().subscribe(s => { snackbar.dismiss(); })
    }
  }

  ngOnInit(): void {
    // initialisation des variables
    this.stock_monnaie_actuel = 400;
    this.myPassword = "12345";
    this.myId = 0;

    // valeur de test
    let r: RequeteEmission = new RequeteEmission();
    r.montant = 500;
    r.statut = "Validée";
    r.id_creer_par = 0;
    r.creer_le = new Date().toUTCString();
    r.id_traiter_par = 1;
    r.traiter_le = new Date().toUTCString();

    this.ELEMENT_DATA.push(r);

    // recuperation des requetes d'emission
    this.requeteEmissionService.index().subscribe(requetes => {
      console.log(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource<RequeteEmission>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });
    this.displayedColumns = ['Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le', 'action'];
    this.dataSource = new MatTableDataSource<RequeteEmission>(this.ELEMENT_DATA);
  }
}
