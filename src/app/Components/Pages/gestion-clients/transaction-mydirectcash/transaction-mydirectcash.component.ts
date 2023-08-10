import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ShowTransMydirectcashDialogComponent } from 'src/app/Components/Modals/show-trans-mydirectcash-dialog/show-trans-mydirectcash-dialog.component';

@Component({
  selector: 'app-transaction-mydirectcash',
  templateUrl: './transaction-mydirectcash.component.html',
  styleUrls: ['./transaction-mydirectcash.component.css']
})
export class TransactionMydirectcashComponent {

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = ['ID Transaction', 'Client', 'Montant (XAF)', 'Service', 'Date', 'Statut', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  open_show_trans_dialog() {
    const show_trans_dialog = this.dialog.open(ShowTransMydirectcashDialogComponent, {});

    show_trans_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

export interface PeriodicElement {
  id_trans: string;
  client: string;
  montant: number;
  service: string;
  date: string;
  statut: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id_trans: "1464TR", client: "Emmanuel", montant: 30_000_000, service: "OM", date: "12/10/2023", statut: 'Reussie'},
];
