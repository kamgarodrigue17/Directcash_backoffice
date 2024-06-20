import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';

@Component({
  selector: 'app-rapport-recharge-mydirectcash-pos',
  templateUrl: './rapport-recharge-mydirectcash-pos.component.html',
  styleUrls: ['./rapport-recharge-mydirectcash-pos.component.css']
})
export class RapportRechargeMydirectcashPosComponent {

  constructor(
    private dialog: MatDialog
  ) { }

  // displayedColumns: string[] = ['Agent', 'ID Transaction', 'PTN', 'Montant (XAF)', 'Frais (XAF)', 'Statut', 'Effectuée le'];
  displayedColumns = ['expediteur', 'telephone', 'montant', 'destinataire', 'tva', 'tta', 'commissions', 'date', 'statut'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild("paginator") paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
 * Fonction d'exportation du contenu du tableau sous plusieurs formats
 * CSV, EXCEL, PDF
 */
  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { selected_value: "", title: "des recharges MyDirectCash POS" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
  statut: string;
  created_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { agent: 'agent', id_transaction: 'THFS465', ptn: '....', montant: 40, frais: 40, statut: 'Réussie', created_at: '14/10/2010 15:30' }
];
