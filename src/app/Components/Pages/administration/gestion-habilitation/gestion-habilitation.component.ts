import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { HabilitationDialogComponent } from 'src/app/Components/Modals/habilitation-dialog/habilitation-dialog.component';

@Component({
  selector: 'app-gestion-habilitation',
  templateUrl: './gestion-habilitation.component.html',
  styleUrls: ['./gestion-habilitation.component.css']
})
export class GestionHabilitationComponent {

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  snackbar_message = "";

  displayedColumns: string[] = ['Intitulé', 'Crée par', 'Crée le', 'Statut', 'Actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editer_habilitation(mode: string) {
   const habilitation_dialog = this.dialog.open(HabilitationDialogComponent, {
      data: {
        mode: mode
      }
    });

    habilitation_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });

  }


  supprimer_habilitation(intitule: string) {
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title: "Habilitation : "+ intitule,
        message: "Voulez - vous vraiment supprimer cette habilitation ? \nLes comptes conernés n'auront plus d'habilitation"
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  show_information() {
    // const show_info_dialog = this.dialog.open(GestionMonnaieShowInformationDialogComponent, {
    //   data: {}
    // });

    // show_info_dialog.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }

}

export interface PeriodicElement {
  intitule: string;
  statut: string;
  created_at: string;
  created_by: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { intitule: "Comptable", statut: 'Actif', created_at: '14/10/2010 15:30', created_by: "Emmanuel leuna"},
];
