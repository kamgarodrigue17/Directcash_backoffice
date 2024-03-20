import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rapport-paiement-facture-eneo',
  templateUrl: './rapport-paiement-facture-eneo.component.html',
  styleUrls: ['./rapport-paiement-facture-eneo.component.css']
})
export class RapportPaiementFactureEneoComponent {

  constructor() { }

  displayedColumns: string[] = ['Agent', 'ID Transaction', 'PTN', 'Montant (XAF)', 'Frais (XAF)', 'Type d\'opération', 'Effectuée le'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild("paginator") paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filter_date_1!: string;
  filter_date_2!: string;

  filter_date() {
    // appliquer le filtre avec les deux dates
  }

}

export interface PeriodicElement {
  agent: string;
  id_transaction: string;
  ptn: string;
  montant: number;
  frais: number;
  type_operation: string;
  created_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { agent: '46FT64', id_transaction: 'THFS465', ptn: '....', montant: 40, frais: 40, type_operation: 'type operation', created_at: '14/10/2010 15:30'}
];
