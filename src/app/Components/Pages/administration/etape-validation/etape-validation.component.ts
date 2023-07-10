import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { EtapeValidationDialogComponent } from 'src/app/Components/Modals/etape-validation-dialog/etape-validation-dialog.component';

@Component({
  selector: 'app-etape-validation',
  templateUrl: './etape-validation.component.html',
  styleUrls: ['./etape-validation.component.css']
})
export class EtapeValidationComponent {
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  snackbar_message = "";

  displayedColumns: string[] = ['Intitulé', 'Priorité', 'Validateur', 'Service', 'Creé le', 'Actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_etape_validation_dialog(mode: string) {
    const etape_dialog = this.dialog.open(EtapeValidationDialogComponent, {
      data: {
        mode: mode
      }
    });

    etape_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  del_etape_validation() {
   const delete_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation de suppréssion",
        message: "Supprimer cette étape de validation ?"
      }
    });

    delete_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

export interface PeriodicElement {
  intitule: string;
  priorite: number;
  validateur: string;
  service: string;
  created_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { intitule: "Intitulé", priorite: 4, validateur: 'Validateur', service: 'Service', created_at: '14/10/2010 15:30'},
];
