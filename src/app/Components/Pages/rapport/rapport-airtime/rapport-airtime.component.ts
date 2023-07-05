import { Component, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rapport-airtime',
  templateUrl: './rapport-airtime.component.html',
  styleUrls: ['./rapport-airtime.component.css']
})
export class RapportAirtimeComponent {

  constructor() { }

  displayedColumns: string[] = ['Agent', 'Montant (XAF)', 'Statut', 'Effectuée le', 'N° Destinataire', 'Commission'];
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
  montant: number;
  statut: string;
  created_at: string;
  no_destinataire: string;
  commission: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { agent: 'Emmanuel', montant: 40, statut: 'En cours', created_at: '14/10/2010 15:30', no_destinataire: '670630558', commission: '....' }
];
