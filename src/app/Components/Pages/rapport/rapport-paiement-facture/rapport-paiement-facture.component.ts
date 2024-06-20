import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { Transaction } from 'src/app/modal/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';

@Component({
  selector: 'app-rapport-paiement-facture',
  templateUrl: './rapport-paiement-facture.component.html',
  styleUrls: ['./rapport-paiement-facture.component.css']
})
export class RapportPaiementFactureComponent {

  displayedColumns!: string[];
  ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);

  day: Date = new Date();
  constructor(trxService: TransactionService, global: GloabalServiceService, private dialog: MatDialog) {
    console.log(global.formatDate(this.day))
    trxService.getTransaction(localStorage.getItem('id')!, "bills", "2033-6-1", "", global.formatDate(this.day)).subscribe(trx => {
      console.log(trx);
      this.ELEMENT_DATA = trx.data;
    });

    this.displayedColumns = ['expediteur', 'telephone', 'montant', 'destinataire', 'tva', 'tta', 'commissions', 'date', 'statut'];
  }

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
      data: { selected_value: "", title: "des affectations de la monnaie" }
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
  type_facture: string;
  type_operation: string;
  created_at: string;
}
