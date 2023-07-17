import { Component, ViewChild,  OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { GestionMonnaieShowInformationDialogComponent } from 'src/app/Components/Modals/gestion-monnaie-show-information-dialog/gestion-monnaie-show-information-dialog.component';
import { Plafond } from 'src/app/modal/plafond';
import { PlafondService } from 'src/app/services/plafond/plafond.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

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
  
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar,public plafond:PlafondService,public valideservice:ValidationService) { }

  snackbar_message = "";



  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  valider_recharge(valid:any) {
  let  data:any={
      "merchantId": `${valid.merchant}`,
      "amount": valid.amount,
      "createBy": valid.creerPar,
        "password": "12345"
    }
    console.log(data);
    this.snackbar_message = "La recharge a été validée avec succès";
    let snackBarRef = this._snackBar.open(this.snackbar_message, 'Ok');

    snackBarRef.onAction().subscribe(() => {
      this.valideservice.suplyvalidate(data).subscribe(res=>{
        console.log(res)
        snackBarRef.dismiss();
      });
      
    });

  }


  rejeter_recharge() {
    this.snackbar_message = "La recharge a été rejetée avec succès";
    let snackBarRef = this._snackBar.open(this.snackbar_message, 'Ok');

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
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
//https://cvdesignr.com/p/62debc8614a1f
     
      this.ELEMENT_DATA =plafond.data.filter((valid:any)=>valid.statut==="En attente");
      console.log(this.ELEMENT_DATA);
      this.displayedColumns=['Super agent', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le','Actions'];
      this.dataSource=new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
    
      
    });
    this.displayedColumns= ['Super agent', 'Montant (XAF)', 'Statut', 'Crée par', 'Crée le', 'Traité par', 'Traité le','Actions'];
    this.dataSource=new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
  }
}

