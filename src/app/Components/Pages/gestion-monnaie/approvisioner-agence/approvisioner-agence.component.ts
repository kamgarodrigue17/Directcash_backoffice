import { Component, ViewChild,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApprovisionnerAgenceDialogComponent } from 'src/app/Components/Modals/approvisionner-agence-dialog/approvisionner-agence-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { Plafond } from 'src/app/modal/plafond';
import { PlafondService } from 'src/app/services/plafond/plafond.service';

@Component({
  selector: 'app-approvisioner-agence',
  templateUrl: './approvisioner-agence.component.html',
  styleUrls: ['./approvisioner-agence.component.css']
})
export class ApprovisionerAgenceComponent implements OnInit {
  displayedColumns: string[] =[];

  ELEMENT_DATA: Plafond[] = [
  ];
  dataSource!:MatTableDataSource<Plafond, MatTableDataSourcePaginator>
  
    constructor(public dialog: MatDialog, private router: Router,public plafond:PlafondService) { 
  
    }
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
      data: { selected_value: '', title: "des approvisionnements" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_appr_agence_dialog() {
    const appr_agence_dialog = this.dialog.open(ApprovisionnerAgenceDialogComponent, {
      data: {
        object: 'agence',
      }
    });

   /* appr_agence_dialog.afterClosed().subscribe(result => {

      if(result==true){
        this.router.navigateByUrl("gestion-monnaie/approvisionner-agence/valider");
      }
      console.log(result);
    });*/
  }
  ngOnInit(): void {
    this.plafond.getDemandeAprov().subscribe(plafond=>{
      this.ELEMENT_DATA =plafond.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns=['Super agent', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le'];
      this.dataSource=new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
    
      
    });
    this.displayedColumns= ['Super agent', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le'];
    this.dataSource=new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
  }
}

