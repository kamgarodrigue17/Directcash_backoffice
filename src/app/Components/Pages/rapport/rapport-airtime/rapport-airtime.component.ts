import { Component, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rapport-airtime',
  templateUrl: './rapport-airtime.component.html',
  styleUrls: ['./rapport-airtime.component.css']
})
export class RapportAirtimeComponent {
  constructor() { }


  displayedColumns: string[] = ['Merchant', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChildren(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  merchant: string;
  montant: number;
  statut: string;
  created_by: string;
  created_at: string;
  treated_by: string;
  treated_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { merchant: "Emmanuel", montant: 40, statut: 'En cours', created_by: 'Jojo', created_at: '14/10/2010 15:30', treated_by:"Emmanuel leuna", treated_at:'14/01/2023 14:02' },];
