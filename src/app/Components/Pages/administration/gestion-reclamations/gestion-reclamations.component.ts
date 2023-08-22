import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ShowReclamationDialogComponent } from 'src/app/Components/Modals/show-reclamation-dialog/show-reclamation-dialog.component';
import { Habilitation } from 'src/app/modal/habilitation';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { HabilitationService } from 'src/app/services/habilitation/habilitation.service';

@Component({
  selector: 'app-gestion-reclamations',
  templateUrl: './gestion-reclamations.component.html',
  styleUrls: ['./gestion-reclamations.component.css']
})
export class GestionReclamationsComponent implements OnInit {
  displayedColumns: string[] = [];
  ELEMENT_DATA: Habilitation[] = [
  ];
  dataSource!: MatTableDataSource<Habilitation, MatTableDataSourcePaginator>
  data: any = {
    "idreclamations": 0,
    "titre": "test",
    "description": "test",
    "application": "test",
    "agent": "test",
    "creerPar": "tabetsing",
    "modifierPar": "",
    "creerLe": "test",
    "modifierLe": "test",
    "statut": "0"
  };

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, public reclamationservice: HabilitationService, public globalService: GloabalServiceService) { }

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

  marquer_comme_resolue(element: any) {
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation",
        message: "Marquer la (les) réclamation(s) sélectionnée(s) comme resolue(s) ?"
      }
    });
    console.log(element)
    confirmation_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  supprimer_reclamation() {
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation",
        message: "Voulez - vous vraiment supprimer la (les) réclamation(s) s&lectionnée(s) ?"
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  show_information() {
    const reclamation_dialog = this.dialog.open(ShowReclamationDialogComponent, {
      data: {}
    });

    reclamation_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.reclamationservice.reclamations(this.globalService.getTomorrowDate()).subscribe(habi => {
      this.ELEMENT_DATA = habi.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Réclamant', "Application", 'Description', 'Effectuée le', 'Traité par', 'Traité le', 'Statut', 'Actions'];
      this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
      this.display = 'none';
      this.dataSource.paginator = this.paginator;
    });

    this.displayedColumns = ['Réclamant', "Application", 'Description', 'Effectuée le', 'Traité par', 'Traité le', 'Statut', 'Actions'];
    this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);

  }

}
