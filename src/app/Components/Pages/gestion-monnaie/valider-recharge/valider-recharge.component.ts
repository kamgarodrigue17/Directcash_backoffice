import { Component, ViewChild,  OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { GestionMonnaieShowInformationDialogComponent } from 'src/app/Components/Modals/gestion-monnaie-show-information-dialog/gestion-monnaie-show-information-dialog.component';
import { Plafond } from 'src/app/modal/plafond';
import { PlafondService } from 'src/app/services/plafond/plafond.service';

@Component({
  selector: 'app-valider-recharge',
  templateUrl: './valider-recharge.component.html',
  styleUrls: ['./valider-recharge.component.css']
})
export class ValiderRechargeComponent implements OnInit {
  displayedColumns: string[] =[];

  ELEMENT_DATA: Plafond[] = [
  ];
  dataSource!:MatTableDataSource<Plafond, MatTableDataSourcePaginator>
  
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar,public plafond:PlafondService) { }

  snackbar_message = "";
  alert_message = "";
  alert_type = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  closeAlert() {
    const alert = document.getElementById("alert");
    alert?.classList.add("d-none");
  }
  openAlert() {
    const alert = document.getElementById("alert");
    alert?.classList.remove("d-none");
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  valider_recharge() {
    this.alert_type = "success";
    this.alert_message = "La recharge a été validée avec succès";
    this.openAlert();
  }

  rejeter_recharge() {
    this.alert_type = "info";
    this.alert_message = "La recharge a été rejetée avec succès";
    this.openAlert();
  }

  show_information() {
    const show_info_dialog = this.dialog.open(GestionMonnaieShowInformationDialogComponent, {
      data: {}
    });

    show_info_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  ngOnInit(): void {
    this.plafond.getDemandeAprov().subscribe(plafond=>{
     let data:any[]=[];
     
     
      this.ELEMENT_DATA =plafond.data.filter((valid:any)=>valid.statut==="En attente");
      console.log(this.ELEMENT_DATA);
      this.displayedColumns=['Super agent', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le','Actions'];
      this.dataSource=new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
    
      
    });
    this.displayedColumns= ['Super agent', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le','Actions'];
    this.dataSource=new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
  }
}

