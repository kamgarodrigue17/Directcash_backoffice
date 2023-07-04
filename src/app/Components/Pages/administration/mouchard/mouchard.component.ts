import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mouchard',
  templateUrl: './mouchard.component.html',
  styleUrls: ['./mouchard.component.css']
})
export class MouchardComponent {
  constructor(public dialog: MatDialog) { }

  snackbar_message = "";

  displayedColumns: string[] = ['Utilisateur', 'Profil de l\'utilisateur', 'Activité', 'Date & heure', 'Actions'];
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
    // const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
    //   data:{
    //     title: "Confirmation",
    //     message: "Marquer la (les) réclamation(s) sélectionnée(s) comme resolue(s) ?"
    //   }
    // });

    // confirmation_dialog.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }

  supprimer_reclamation(){
    // const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
    //   data:{
    //     title: "Confirmation",
    //     message: "Voulez - vous vraiment supprimer la (les) réclamation(s) s&lectionnée(s) ?"
    //   }
    // });

    // confirmation_dialog.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }

  show_information(){
    // const reclamation_dialog = this.dialog.open(ShowReclamationDialogComponent, {
    //   data: { }
    // });

    // reclamation_dialog.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }


}

export interface PeriodicElement {
  utilisateur: string;
  profil: string;
  activite: string;
  created_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { utilisateur: "Emmanuel", profil: "Superviseur", activite: 'Transfert d\'argent DirectCash', created_at: '14/10/2010 15:30'},
];
