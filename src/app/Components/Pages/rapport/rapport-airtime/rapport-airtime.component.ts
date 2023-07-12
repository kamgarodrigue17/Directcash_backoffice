import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Transaction } from 'src/app/modal/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';

@Component({
  selector: 'app-rapport-airtime',
  templateUrl: './rapport-airtime.component.html',
  styleUrls: ['./rapport-airtime.component.css']
})
export class RapportAirtimeComponent implements OnInit  {
  displayedColumns: string[] =[];
  ELEMENT_DATA: Transaction[] = [
];
dataSource!:MatTableDataSource<Transaction, MatTableDataSourcePaginator>

day:Date=new Date();
  constructor( public trxService:TransactionService, public global:GloabalServiceService) { 
  
  }


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
  
  ngOnInit(): void {



    this.trxService.getTransaction(localStorage.getItem('id')!,"airtime","2033-6-1","",this.global.formatDate(this.day)).subscribe(trx=>{
       
      console.log(trx);
      this.ELEMENT_DATA=trx.data.map((element:any)=>{
        return {
          a: element.a,
agentID: element.agentID,
blockingReason:element.blockingReason,
commission: element.commission,
de: element.de,
directCode:element.directCode ,
expediteur:element.expediteur ,
jour: element.jour,
montant:element.montant,
payeLe:element.payeLe, 
payeur:element.payeur, 
pin: element.pin,
receiver: element.receiver,
statut:element.statut ,
transactionID: element.transactionID,
        };
      })    ;//trx.data.;
      console.log( this.ELEMENT_DATA);
      this.displayedColumns = ['Agent', 'Montant (XAF)', 'Statut', 'Effectuée le', 'N° Destinataire', 'Commission'];
  this.dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);

      })
      ;//trx.data.;
      this.displayedColumns = ['Agent', 'Montant (XAF)', 'Statut', 'Effectuée le', 'N° Destinataire', 'Commission'];
      this.dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);
    
  }

}


