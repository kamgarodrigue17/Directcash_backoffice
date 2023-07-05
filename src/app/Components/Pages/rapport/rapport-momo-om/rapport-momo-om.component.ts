import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rapport-momo-om',
  templateUrl: './rapport-momo-om.component.html',
  styleUrls: ['./rapport-momo-om.component.css']
})
export class RapportMomoOmComponent {

  constructor() { }

  displayedColumns: string[] = ['Expediteur', 'Destinataire', 'Montant (XAF)', 'Statut', 'Type de service', 'Effectuée le'];
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
  expediteur: string;
  destinataire: string;
  montant: number;
  statut: string;
  type_service: string;
  created_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { expediteur: '670630558', destinataire: '693648795', montant: 40, statut: 'Reussie', type_service: 'OM', created_at: '14/10/2010 15:30'}
];
