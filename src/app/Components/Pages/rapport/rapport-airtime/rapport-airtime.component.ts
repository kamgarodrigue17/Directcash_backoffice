import { Component, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/modal/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';

@Component({
  selector: 'app-rapport-airtime',
  templateUrl: './rapport-airtime.component.html',
  styleUrls: ['./rapport-airtime.component.css']
})
export class RapportAirtimeComponent {
  ELEMENT_DATA:Transaction[]=[];
day:Date=new Date();
  constructor(trxService:TransactionService,global:GloabalServiceService) { 
   console.log(global.formatDate(this.day))
   trxService.getTransaction(localStorage.getItem('id')!,"airtime","2033-6-1","",this.day.toDateString()).subscribe(trx=>{
      this.ELEMENT_DATA=trx;
    })
  }

  displayedColumns: string[] = ['Agent', 'Montant (XAF)', 'Statut', 'Effectuée le', 'N° Destinataire', 'Commission'];
  dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);

  @ViewChild("paginator") paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


