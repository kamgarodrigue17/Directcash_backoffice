import { Component, ViewChild,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { AddCommissionDialogComponent } from 'src/app/Components/Modals/add-commission-dialog/add-commission-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { Commission } from 'src/app/modal/commission';
import { CommissionService } from 'src/app/services/commission/commission.service';

@Component({
  selector: 'app-commision-par-service',
  templateUrl: './commision-par-service.component.html',
  styleUrls: ['./commision-par-service.component.css']
})
export class CommisionParServiceComponent implements OnInit {
  displayedColumns: string[] =[];
  ELEMENT_DATA: Commission[] = [
];
dataSource!:MatTableDataSource<Commission, MatTableDataSourcePaginator>


  constructor(public dialog: MatDialog,public commission:CommissionService) { }

 // displayedColumns: string[] = ["Type d\'utilisateur", 'Taux (%)', 'Type de service', 'Crée le', 'Modifié le', 'Actions'];
 // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_add_commission_dialog(mode: string,commision:any) {
    const commission_dialog = this.dialog.open(AddCommissionDialogComponent, {
      data:{
        mode: mode,
        element:commision
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
  ngOnInit(): void {
    this.commission.commissions().subscribe(com=>{
    this.ELEMENT_DATA=com.data
console.log(this.ELEMENT_DATA)
this.displayedColumns = ["Type d\'utilisateur", 'Taux (%)', 'Type de service', 'Crée le', 'Modifié le', 'Actions'];
this.dataSource = new MatTableDataSource<Commission>(this.ELEMENT_DATA);

    })  
   this.displayedColumns = ["Type d\'utilisateur", 'Taux (%)', 'Type de service', 'Crée le', 'Modifié le', 'Actions'];
  this.dataSource = new MatTableDataSource<Commission>(this.ELEMENT_DATA);

  }

}

