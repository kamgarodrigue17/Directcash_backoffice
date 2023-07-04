import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { GestionMonnaieShowInformationDialogComponent } from 'src/app/Components/Modals/gestion-monnaie-show-information-dialog/gestion-monnaie-show-information-dialog.component';

@Component({
  selector: 'app-valider-recharge',
  templateUrl: './valider-recharge.component.html',
  styleUrls: ['./valider-recharge.component.css']
})
export class ValiderRechargeComponent {

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  snackbar_message = "";

  displayedColumns: string[] = ['Client', 'Montant (XAF)', 'Crée par', 'Crée le', 'Traité par', 'Traité le', 'Statut', 'Actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  valider_recharge() {
    this.snackbar_message = "La recharge a été validée avec succès";
    let snackBarRef = this._snackBar.open(this.snackbar_message, 'Ok');

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });

  }


  rejeter_recharge() {
    this.snackbar_message = "La recharge a été rejetée avec succès";
    let snackBarRef = this._snackBar.open(this.snackbar_message, 'Ok');

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }

  show_information() {
    const show_info_dialog = this.dialog.open(GestionMonnaieShowInformationDialogComponent, {
      data: {}
    });

    show_info_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

export interface PeriodicElement {
  client: string;
  montant: number;
  statut: string;
  created_by: string;
  created_at: string;
  treated_by: string;
  treated_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { client: "Emmanuel", montant: 40, statut: 'En cours', created_by: 'Jojo', created_at: '14/10/2010 15:30', treated_by: "Emmanuel leuna", treated_at: '14/01/2023 14:02' },];

