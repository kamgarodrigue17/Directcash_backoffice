import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { ShowInformationRapportTransactionDirectcashComponent } from 'src/app/Components/Modals/show-information-rapport-transaction-directcash/show-information-rapport-transaction-directcash.component';
import { Transaction } from 'src/app/modal/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';

@Component({
  selector: 'app-rapport-transfert-argent-directcash',
  templateUrl: './rapport-transfert-argent-directcash.component.html',
  styleUrls: ['./rapport-transfert-argent-directcash.component.css']
})
export class RapportTransfertArgentDirectcashComponent implements OnInit {

  displayedColumns: string[] = [];
  ELEMENT_DATA: Transaction[] = [
  ];
  dataSource!: MatTableDataSource<Transaction, MatTableDataSourcePaginator>

  day: Date = new Date();
  constructor(public trxService: TransactionService, public global: GloabalServiceService, public dialog: MatDialog) { }

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
      data: { selected_value: "", title: "des transactions DirectCash" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // variable pour le loader du chargement des elements du tableau
  display = 'flex';

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

  ngOnInit(): void {
    this.trxService.getTransaction(localStorage.getItem('id')!, "xfert", "2033-6-1", "", this.global.formatDate(this.day)).subscribe(trx => {

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
      // this.displayedColumns = ['Agent', 'Montant (XAF)', 'Expediteur', 'Destinataire', 'Statut', 'Effectuée le', 'Action'];


      this.dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });
    this.displayedColumns = ['expediteur', 'telephone', 'montant', 'destinataire', 'tva', 'tta', 'commissions', 'date', 'statut'];
    this.dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);

    // this.displayedColumns = ['Agent', 'Montant (XAF)', 'Statut', 'Effectuée le', 'N° Destinataire', 'Commission'];
    // this.dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);

  }

}


