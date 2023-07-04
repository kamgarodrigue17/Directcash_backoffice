import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ShowReclamationDialogComponent } from 'src/app/Components/Modals/show-reclamation-dialog/show-reclamation-dialog.component';

@Component({
  selector: 'app-gestion-reclamations',
  templateUrl: './gestion-reclamations.component.html',
  styleUrls: ['./gestion-reclamations.component.css']
})
export class GestionReclamationsComponent {

 constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  snackbar_message = "";

  displayedColumns: string[] = ['Réclamant', 'Email', 'Effectuée le', 'Traité par', 'Traité le', 'Statut', 'Actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  marquer_comme_resolue(){
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title: "Confirmation",
        message: "Marquer la (les) réclamation(s) sélectionnée(s) comme resolue(s) ?"
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  supprimer_reclamation(){
    const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title: "Confirmation",
        message: "Voulez - vous vraiment supprimer la (les) réclamation(s) s&lectionnée(s) ?"
      }
    });

    confirmation_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  show_information(){
    const reclamation_dialog = this.dialog.open(ShowReclamationDialogComponent, {
      data: { }
    });

    reclamation_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

export interface PeriodicElement {
  reclamant: string;
  email: string;
  statut: string;
  created_at: string;
  treated_by: string;
  treated_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { reclamant: "Emmanuel", email: "emmanuelleuna758@gmail.com", created_at: '14/10/2010 15:30', treated_by:"Emmanuel leuna", treated_at:'14/01/2023 14:02', statut: 'Lue' },]
  ;
