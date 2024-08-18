import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, throwError } from 'rxjs';
import { ShowTransMydirectcashDialogComponent } from 'src/app/Components/Modals/show-trans-mydirectcash-dialog/show-trans-mydirectcash-dialog.component';
import { TransactionService } from 'src/app/service/transaction.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-transaction-mydirectcash',
  templateUrl: './transaction-mydirectcash.component.html',
  styleUrls: ['./transaction-mydirectcash.component.css']
})
export class TransactionMydirectcashComponent {

  constructor(
    public dialog: MatDialog,
    private _transactionService: TransactionService,
    private _globalService: GloabalServiceService,
    private _messageService: MessageService
  ) { }

  displayedColumns: string[] = ['nom', "telephone", 'Montant (XAF)', 'Service', 'tva', 'tta', 'commission', 'destinataire', 'Date', 'statut', 'Action'];
  ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // variable pour le loader du chargement des elements du tableau
  display = 'flex';

  // loader pour l'execution des requetes
  isProgressHidden = true;

  // message et type de l'alerte de la page
  alert_message = "";
  alert_type = "";

  isLoading = false;

  day = new Date();
  startDate = new Date('1/6/2003');
  endDate = new Date();


  /**
   * Fermeture de l'alerte
   */
  closeAlert() {
    const alert = document.getElementById("alert");
    alert?.classList.add("d-none");
  }

  /**
   * Ouverture de l'alerte
   */
  openAlert() {
    this.closeAlert();
    const alert = document.getElementById("alert");
    alert?.classList.remove("d-none");
  }

  open_show_trans_dialog(element: any) {
    const show_trans_dialog = this.dialog.open(ShowTransMydirectcashDialogComponent, {
      data: {
        element: element
      }
    });

    show_trans_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  /**
   * Recuperer les transaction my directcash
   */
  getTransactionAirtime() {
    try {
      // start loading
      this.isProgressHidden = false;

      // code ...
      this._transactionService.getTransaction(localStorage.getItem('id')!, "airtime", "2021-6-1", "", this._globalService.formatDate(this.day)).pipe(
        catchError((error: HttpErrorResponse) => {
          this.isProgressHidden = true;
          if (error.status !== 200) {

            // log response
            console.log('--- ERREUR TRANSACTIONS ---');
            console.log(error.message);

            // set alert
            this.alert_message = this._messageService.getHttpMessage(error.status);
            this.alert_type = "danger";
            this.closeAlert();
            this.openAlert();
          }
          return throwError(error);
        })
      ).subscribe(res => {

        // stop loading
        this.isProgressHidden = true;

        // log response 
        console.log('--- liste transaction airtime ---');
        console.log(res);

        // get data
        this.ELEMENT_DATA = res.data;

        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.display = 'none';
      })
    } catch (error) {
      // stop loading
      this.isProgressHidden = true;

      // log error
      console.log('--- ERREUR ---');
      console.log(error);

      // show alert
      this.alert_message = "Une erreur est survenue."
      this.alert_type = "danger";
      this.closeAlert();
      this.openAlert();
    }


    //   ;//trx.data.;
    // // this.displayedColumns = ['Agent', 'Montant (XAF)', 'Statut', 'Effectuée le', 'N° Destinataire', 'Commission'];
    // this.displayedColumns = ['expediteur', 'telephone', 'montant', 'destinataire', 'tva', 'tta', 'commissions', 'date', 'statut'];
    // this.dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);
  }

  ngOnInit() {
    this.getTransactionAirtime();
  }

}

export interface PeriodicElement {
  id_trans: string;
  client: string;
  montant: number;
  service: string;
  date: string;
  statut: string;
}