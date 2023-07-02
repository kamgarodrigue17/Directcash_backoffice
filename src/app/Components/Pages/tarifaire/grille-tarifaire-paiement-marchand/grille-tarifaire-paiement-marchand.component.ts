import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { GrilleTransfertDirectcashDialogComponent } from 'src/app/Components/Modals/grille-transfert-directcash-dialog/grille-transfert-directcash-dialog.component';

@Component({
  selector: 'app-grille-tarifaire-paiement-marchand',
  templateUrl: './grille-tarifaire-paiement-marchand.component.html',
  styleUrls: ['./grille-tarifaire-paiement-marchand.component.css']
})
export class GrilleTarifairePaiementMarchandComponent {
  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = ['Tarif (XAF)', 'De', 'A', 'Taxe', 'Active', 'Code caisse', 'Actions'];
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
      data: { title: "des grilles tarifaire de paiement marchand" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_add_grille_dialog(mode: string) {
    const add_grille_dialog = this.dialog.open(GrilleTransfertDirectcashDialogComponent, {
      data:{
        mode: mode,
        object: 'paiement marchand'
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
  tarif: number;
  min: number;
  max: number;
  taxe: number;
  active: string;
  code_caisse: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { tarif: 400, min: 0, max: 500, taxe: 50, active: '...', code_caisse: '456FGT' },];
