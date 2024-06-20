import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';

@Component({
  selector: 'app-rapport-paiement-marchand',
  templateUrl: './rapport-paiement-marchand.component.html',
  styleUrls: ['./rapport-paiement-marchand.component.css']
})
export class RapportPaiementMarchandComponent {

  constructor(
    private dialog: MatDialog
  ) { }

  // displayedColumns: string[] = ['Code caisse', 'ID Transaction', 'PTN', 'Montant (XAF)', 'Frais (XAF)', 'Type d\'opération', 'Effectuée le'];
  displayedColumns = ['expediteur', 'telephone', 'montant', 'caisse', 'destinataire', 'tva', 'tta', 'commissions', 'date', 'statut'];

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
      data: { selected_value: "", title: "des paiements marchands" }
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
  code_caisse: string;
  id_transaction: string;
  ptn: string;
  montant: number;
  frais: number;
  type_operation: string;
  created_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { code_caisse: '46FT64', id_transaction: 'THFS465', ptn: '....', montant: 40, frais: 40, type_operation: 'type operation', created_at: '14/10/2010 15:30' }
];
