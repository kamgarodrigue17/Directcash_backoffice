import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddCommissionDialogComponent } from 'src/app/Components/Modals/add-commission-dialog/add-commission-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-commision-par-service',
  templateUrl: './commision-par-service.component.html',
  styleUrls: ['./commision-par-service.component.css']
})
export class CommisionParServiceComponent {

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = ["Type d\'utilisateur", 'Taux (%)', 'Type de service', 'Crée le', 'Modifié le', 'Actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_add_commission_dialog(mode: string) {
    const commission_dialog = this.dialog.open(AddCommissionDialogComponent, {
      data:{
        mode: mode
      }
    });

    commission_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  open_del_commission_dialog() {
    const del_commission_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title: "Confirmation de suppression",
        message: "Voulez - vous vraiment supprimer cette commission ?"
      }
    });

    del_commission_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

export interface PeriodicElement {
  type_utilisateur: string;
  taux: number;
  type_service: string;
  created_at: string;
  updated_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { type_utilisateur: "Super agent", taux: 10, type_service: 'MTN', created_at: '10/10/2003 14:45', updated_at: '10/10/2003 14:45'},];
