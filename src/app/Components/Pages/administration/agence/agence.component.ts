import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AgenceDialogComponent } from 'src/app/Components/Modals/agence-dialog/agence-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent {
  constructor(public dialog: MatDialog) { }


  displayedColumns: string[] = ['Nom de l\'agence', 'Adresse', 'Merchant', 'Ajoutée par', 'Ajoutée le', 'Actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_agence_dialog(mode: string) {
    const agence_dialog = this.dialog.open(AgenceDialogComponent, {
      data: {
        mode: mode
      }
    });

    agence_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  del_agence(nom: string) {
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title: "Agence : "+ nom,
        message: "Voulez - vous vraiment supprimer cette agence ?"
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}

export interface PeriodicElement {
  nom: string;
  adresse: string;
  merchant: string;
  inserted_by: string;
  inserted_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { nom: "Agence A", adresse: "Pays (ville, quartier)", merchant: "Merchant", inserted_by: 'Createur', inserted_at: '14/10/2010 15:30' },
];

