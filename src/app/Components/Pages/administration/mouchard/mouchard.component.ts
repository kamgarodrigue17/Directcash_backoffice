import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Habilitation } from 'src/app/modal/habilitation';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-mouchard',
  templateUrl: './mouchard.component.html',
  styleUrls: ['./mouchard.component.css']
})
export class MouchardComponent implements OnInit  {
  displayedColumns: string[] =[];
  ELEMENT_DATA: Habilitation[] = [
];
dataSource!:MatTableDataSource<Habilitation, MatTableDataSourcePaginator>
  constructor(public dialog: MatDialog, public mouchardService:RoleService,public globalService:GloabalServiceService) { }

  snackbar_message = "";



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
  ngOnInit(): void {
    this.mouchardService.getMouchard(this.globalService.getTomorrowDate()).subscribe(habi=>{
      
      this.ELEMENT_DATA=habi.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns= ['Utilisateur', 'Profil de l\'utilisateur', 'Activité','Module', 'Date & heure', 'Actions'];
      this.dataSource=new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
    
    });
    this.displayedColumns=  ['Utilisateur', 'Profil de l\'utilisateur', 'Activité','Module',  'Date & heure', 'Actions'];
    this.dataSource=new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
  
  }

}

