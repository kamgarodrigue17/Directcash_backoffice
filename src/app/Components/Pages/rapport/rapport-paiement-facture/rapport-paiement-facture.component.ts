import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/modal/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';

@Component({
  selector: 'app-rapport-paiement-facture',
  templateUrl: './rapport-paiement-facture.component.html',
  styleUrls: ['./rapport-paiement-facture.component.css']
})
export class RapportPaiementFactureComponent {

  ELEMENT_DATA:Transaction[]=[];
  day:Date=new Date();
    constructor(trxService:TransactionService,global:GloabalServiceService) { 
     console.log(global.formatDate(this.day))
     trxService.getTransaction(localStorage.getItem('id')!,"bills","2033-6-1","",this.day.toDateString()).subscribe(trx=>{
        this.ELEMENT_DATA=trx;
      })
    }

  displayedColumns: string[] = ['Agent', 'ID Transaction', 'PTN', 'Montant (XAF)', 'Frais (XAF)', 'Type de facture', 'Type d\'opération', 'Effectuée le'];
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

const ELEMENT_DATA: PeriodicElement[] = [
  { agent: 'agent', id_transaction: 'THFS465', ptn: '....', montant: 40, frais: 40, type_facture: 'CANAL +', type_operation: 'type operation', created_at: '14/10/2010 15:30'}
];
