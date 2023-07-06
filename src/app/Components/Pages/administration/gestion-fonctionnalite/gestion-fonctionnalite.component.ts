import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-fonctionnalite',
  templateUrl: './gestion-fonctionnalite.component.html',
  styleUrls: ['./gestion-fonctionnalite.component.css']
})
export class GestionFonctionnaliteComponent {

  constructor(private _router: Router) { }

  displayedColumns: string[] = ['Menu', 'Sous - menu', 'Accéssible à', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detail_fonctionnalite() {
    this._router.navigateByUrl("/administration/gestion-fonctionnalites/detail");
  }

}

export interface PeriodicElement {
  menu: string;
  sous_menu: string;
  accessible_a: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { menu: "Gestion des agents", sous_menu: "Agents", accessible_a: 4},
];
