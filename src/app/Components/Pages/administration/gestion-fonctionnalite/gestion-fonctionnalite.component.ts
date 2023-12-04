import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { FonctionalitesService } from 'src/app/services/fonctionalites/fonctionalites.service';

@Component({
  selector: 'app-gestion-fonctionnalite',
  templateUrl: './gestion-fonctionnalite.component.html',
  styleUrls: ['./gestion-fonctionnalite.component.css']
})

export class GestionFonctionnaliteComponent implements OnInit {

  displayedColumns: string[] = ['Menu', 'Sous - menu', 'Accéssible à'];
  ELEMENT_DATA: PeriodicElement[] = [
  ];
  dataSource!: MatTableDataSource<PeriodicElement, MatTableDataSourcePaginator>

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

  ngOnInit(): void {
    this.fonctionalié.fonctionalites("1").subscribe(habi => {

      this.ELEMENT_DATA = habi.data;
      console.log(habi.data);
      this.displayedColumns = ['Menu', 'Sous - menu', 'Accéssible à'];
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

    });


    this.displayedColumns = ['Menu', 'Sous - menu', 'Accéssible à'];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  }

}

export interface PeriodicElement {
  accessibilite: number;
  id: number,
  label: string,
  menu: string,
  status: string
}
