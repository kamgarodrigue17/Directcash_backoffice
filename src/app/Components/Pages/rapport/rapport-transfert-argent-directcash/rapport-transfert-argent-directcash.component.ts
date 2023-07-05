import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ShowInformationRapportTransactionDirectcashComponent } from 'src/app/Components/Modals/show-information-rapport-transaction-directcash/show-information-rapport-transaction-directcash.component';

@Component({
  selector: 'app-rapport-transfert-argent-directcash',
  templateUrl: './rapport-transfert-argent-directcash.component.html',
  styleUrls: ['./rapport-transfert-argent-directcash.component.css']
})
export class RapportTransfertArgentDirectcashComponent {

  constructor(public dialog: MatDialog) { }

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

  filter_date_1!: string;
  filter_date_2!: string;

  filter_date() {
    // appliquer le filtre avec les deux dates
  }

  open_show_information_dialog() {
    const show_super_agent_dialog = this.dialog.open(ShowInformationRapportTransactionDirectcashComponent, {
      data: {}
    });

    show_super_agent_dialog.afterClosed().subscribe(result => {

    });
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
  { agent: 'agent', expediteur: '670630558', destinataire: '693648795', montant: 40, statut: 'Reussie', created_at: '14/10/2010 15:30' }
];
