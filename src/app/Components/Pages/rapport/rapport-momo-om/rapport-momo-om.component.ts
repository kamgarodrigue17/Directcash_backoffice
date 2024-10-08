import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { Transaction } from 'src/app/modal/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';

@Component({
  selector: 'app-rapport-momo-om',
  templateUrl: './rapport-momo-om.component.html',
  styleUrls: ['./rapport-momo-om.component.css']
})
export class RapportMomoOmComponent implements OnInit {
  displayedColumns: string[] = [];
  ELEMENT_DATA: Transaction[] = [
  ];
  dataSource!: MatTableDataSource<Transaction, MatTableDataSourcePaginator>

  day: Date = new Date();
  constructor(public trxService: TransactionService, public global: GloabalServiceService, private dialog: MatDialog) {
    console.log(global.formatDate(this.day))
  }

  @ViewChild("paginator") paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // variable pour le loader du chargement des elements du tableau
  display = 'flex';

  /**
  * Fonction d'exportation du contenu du tableau sous plusieurs formats
  * CSV, EXCEL, PDF
  */
  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { selected_value: "", title: "des transactions MOMO/OM" }
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

  ngOnInit(): void {
    this.trxService.getTransaction(localStorage.getItem('id')!, "ommomo", "2033-6-1", "", this.global.formatDate(this.day)).subscribe(trx => {

      console.log(trx);
      this.ELEMENT_DATA = trx.data.map((element: any) => {
        return {
          a: element.a,
          agentID: element.agentID,
          blockingReason: element.blockingReason,
          commission: element.commission,
          de: element.de,
          directCode: element.directCode,
          expediteur: element.expediteur,
          jour: element.jour,
          montant: element.montant,
          payeLe: element.payeLe,
          payeur: element.payeur,
          pin: element.pin,
          receiver: element.receiver,
          statut: element.statut,
          transactionID: element.transactionID,
        };
      });//trx.data.;
      console.log(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });
    // this.displayedColumns = ['Expediteur', 'Destinataire', 'Montant (XAF)', 'Statut', 'Type de service', 'Effectuée le'];
    this.displayedColumns = ['expediteur', 'telephone', 'montant', 'destinataire', 'tva', 'tta', 'commissions', 'date', 'statut'];

    this.dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);

  }

}

