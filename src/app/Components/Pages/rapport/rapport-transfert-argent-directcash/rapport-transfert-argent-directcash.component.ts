import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rapport-transfert-argent-directcash',
  templateUrl: './rapport-transfert-argent-directcash.component.html',
  styleUrls: ['./rapport-transfert-argent-directcash.component.css']
})
export class RapportTransfertArgentDirectcashComponent {

  constructor() { }

  displayedColumns: string[] = ['Agent', 'Montant (XAF)', 'Expediteur', 'Destinataire', 'Statut', 'Effectuée le', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild("paginator") paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export interface PeriodicElement {
  agent: string;
  expediteur: string;
  destinataire: string;
  montant: number;
  statut: string;
  created_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { agent: 'agent', expediteur: '670630558', destinataire: '693648795', montant: 40, statut: 'Reussie', created_at: '14/10/2010 15:30'}
];
