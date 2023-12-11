import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { FonctionalitesService } from 'src/app/services/fonctionalites/fonctionalites.service';
import { DetailFonctionnaliteComponent } from '../detail-fonctionnalite/detail-fonctionnalite.component';
import { Habilitation } from 'src/app/modal/habilitation';

@Component({
  selector: 'app-gestion-fonctionnalite',
  templateUrl: './gestion-fonctionnalite.component.html',
  styleUrls: ['./gestion-fonctionnalite.component.css']
})

export class GestionFonctionnaliteComponent implements OnInit {

  displayedColumns: string[] = ['Menu', 'Sous - menu', 'Accéssible à'];
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

  detail_fonctionnalite(data:any) {
    const fonctionalites_dialog = this.dialog.open(DetailFonctionnaliteComponent, {
      data: {
      
        element: data
      }
    });

    fonctionalites_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
 ///   this._router.navigateByUrl("/administration/gestion-fonctionnalites/detail");
  }
  ngOnInit(): void {
    this.fonctionalié.fonctionalites("*").subscribe(habi => {

      this.ELEMENT_DATA = habi.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Menu', 'Sous - menu', 'Accéssible à'];
      ;
      this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

    });

    this.displayedColumns = ['Menu', 'Sous - menu', 'Accéssible à'];

    this.dataSource = new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);

  }

}



