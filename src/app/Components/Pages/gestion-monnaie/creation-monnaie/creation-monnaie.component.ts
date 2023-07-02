import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierRechargeDialogComponent } from 'src/app/Components/Modals/notifier-recharge-dialog/notifier-recharge-dialog.component';

@Component({
  selector: 'app-creation-monnaie',
  templateUrl: './creation-monnaie.component.html',
  styleUrls: ['./creation-monnaie.component.css']
})
export class CreationMonnaieComponent {

  constructor(public dialog: MatDialog) { }


  displayedColumns: string[] = ['Solde courant', 'Service', 'Plafond (XAF)', 'Dernière recharge', 'Statut', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_edit_plafond_dialog() {
    const edit_plafond_dialog = this.dialog.open(NotifierRechargeDialogComponent, {});

    edit_plafond_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

export interface PeriodicElement {
  solde_courant: number;
  service: string;
  plafond: number;
  derniere_recharge: string;
  statut: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { solde_courant: 10000, service: "OM", plafond: 30_000_000, derniere_recharge: "12/10/2023", statut: 'Actif'},
];
