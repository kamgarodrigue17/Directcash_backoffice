import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { Habilitation } from 'src/app/modal/habilitation';
import { FonctionalitesService } from 'src/app/services/fonctionalites/fonctionalites.service';

@Component({
  selector: 'app-gestion-fonctionnalite',
  templateUrl: './gestion-fonctionnalite.component.html',
  styleUrls: ['./gestion-fonctionnalite.component.css']
})

export class GestionFonctionnaliteComponent implements OnInit {

  displayedColumns: string[] = ['Menu', 'Sous - menu', 'Accéssible à', 'Action'];
  ELEMENT_DATA: Habilitation[] = [
  ];
  dataSource!: MatTableDataSource<Habilitation, MatTableDataSourcePaginator>

  constructor(private _router: Router, public dialog: MatDialog, public fonctionalié: FonctionalitesService, private _snackBar: MatSnackBar) {


  }



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


  ngOnInit(): void {
    this.fonctionalié.fonctionalites("1").subscribe(habi => {

      this.ELEMENT_DATA = habi.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Intitulé', 'Description', 'Crée par', 'Crée le', 'Actions'];
      this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

    });


    this.displayedColumns = ['Intitulé', 'Description', 'Crée par', 'Crée le', 'Actions'];

    this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);

  }

}

export interface PeriodicElement {
  menu: string;
  sous_menu: string;
  accessible_a: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { menu: "Gestion des agents", sous_menu: "Agents", accessible_a: 4 },
];
