import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { AgenceDialogComponent } from 'src/app/Components/Modals/agence-dialog/agence-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { Habilitation } from 'src/app/modal/habilitation';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent  implements OnInit {
    displayedColumns: string[] =['Nom de l\'agence', 'Adresse', 'Merchant', 'Ajoutée par', 'Ajoutée le', 'Actions'];
  ELEMENT_DATA: Habilitation[] = [
];
dataSource!:MatTableDataSource<Habilitation, MatTableDataSourcePaginator>
 
  constructor(public dialog: MatDialog, public agenceService:SuperAgentService) { }




  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_agence_dialog(mode: string,agence:any) {
    const agence_dialog = this.dialog.open(AgenceDialogComponent, {
      data: {
        mode: mode,
        agence:agence
      }
    });
console.log(agence);
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
  ngOnInit(): void {
    this.agenceService.Agences().subscribe(habi=>{
      
      this.ELEMENT_DATA=habi.data;
      console.log(this.ELEMENT_DATA);
      this.dataSource=new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
    
    });
    this.dataSource=new MatTableDataSource<Habilitation>(this.ELEMENT_DATA);
  
  }
}



