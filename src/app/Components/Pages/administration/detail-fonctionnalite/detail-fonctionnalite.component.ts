import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddProfilDialogComponent } from 'src/app/Components/Modals/add-profil-dialog/add-profil-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-detail-fonctionnalite',
  templateUrl: './detail-fonctionnalite.component.html',
  styleUrls: ['./detail-fonctionnalite.component.css']
})
export class DetailFonctionnaliteComponent {

  constructor(private _router: Router, private dialog: MatDialog) { }

  displayedColumns: string[] = ['Profil', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add_profil() {
    const add_profil_dialog = this.dialog.open(AddProfilDialogComponent, {
      data: {}
    });

    add_profil_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });  }

  del_profil(){
    const del_profil_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation de suppression",
        message: "Retirer ce profil de la liste ?"
      }
    });

    del_profil_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  go_back(){
    this._router.navigateByUrl("/administration/gestion-fonctionnalites");
  }

}

export interface PeriodicElement {
  profil: string;
  id_profil: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { profil: "Comptable", id_profil: 1},
];
