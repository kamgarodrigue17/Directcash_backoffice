import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/modal/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';

@Component({
  selector: 'app-rapport-momo-om',
  templateUrl: './rapport-momo-om.component.html',
  styleUrls: ['./rapport-momo-om.component.css']
})
export class RapportMomoOmComponent {

  ELEMENT_DATA:Transaction[]=[];
day:Date=new Date();
  constructor(trxService:TransactionService,global:GloabalServiceService) { 
   console.log(global.formatDate(this.day))
   trxService.getTransaction(localStorage.getItem('id')!,"ommomo","2033-6-1","",this.day.toDateString()).subscribe(trx=>{
      this.ELEMENT_DATA=trx;
    })
  }

  displayedColumns: string[] = ['Expediteur', 'Destinataire', 'Montant (XAF)', 'Statut', 'Type de service', 'Effectuée le'];
  dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);

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

}

