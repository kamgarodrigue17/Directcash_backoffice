import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { GrilleTransfertDirectcashDialogComponent } from 'src/app/Components/Modals/grille-transfert-directcash-dialog/grille-transfert-directcash-dialog.component';

@Component({
  selector: 'app-grille-transfert-argent-directcash',
  templateUrl: './grille-transfert-argent-directcash.component.html',
  styleUrls: ['./grille-transfert-argent-directcash.component.css']
})
export class GrilleTransfertArgentDirectcashComponent {

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = ['De', 'A', 'Frais local (XAF)', 'Frais international (XAF)', 'Actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { title: "des grilles de transfert DirecCash" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_add_grille_dialog(mode: string) {
    const add_grille_dialog = this.dialog.open(GrilleTransfertDirectcashDialogComponent, {
      data:{
        mode: mode,
        object: 'directcash'
      }
    });

    add_grille_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  open_del_grille_dialog() {
    const del_grille_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title: "Confirmation de suppression",
        message: "Voulez - vous vraiment supprimer cette grille de transfert ?"
      }
    });

    del_grille_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

export interface PeriodicElement {
  min: number;
  max: number;
  frais_local: number;
  frais_international: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { min: 0, max: 500, frais_local: 50, frais_international: 50 },];
