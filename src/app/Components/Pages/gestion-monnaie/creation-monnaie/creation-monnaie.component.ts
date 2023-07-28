import { Component, ViewChild,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { NotifierRechargeDialogComponent } from 'src/app/Components/Modals/notifier-recharge-dialog/notifier-recharge-dialog.component';
import { Plafond } from 'src/app/modal/plafond';
import { PlafondService } from 'src/app/services/plafond/plafond.service';

@Component({
  selector: 'app-creation-monnaie',
  templateUrl: './creation-monnaie.component.html',
  styleUrls: ['./creation-monnaie.component.css']
})
export class CreationMonnaieComponent implements OnInit  {
  displayedColumns: string[] =[];
  ELEMENT_DATA: Plafond[] = [
];
dataSource!:MatTableDataSource<Plafond, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, public plafond:PlafondService) { }




  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_edit_plafond_dialog(element:any) {
    const edit_plafond_dialog = this.dialog.open(NotifierRechargeDialogComponent, {data:element});

    edit_plafond_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  ngOnInit(): void {
    this.plafond.plafonds().subscribe(plafond=>{
      this.ELEMENT_DATA =plafond.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns= ['Solde courant', 'Service', 'Plafond (XAF)','Limite courante (XAF)' ,'Partenaire','Dernière recharge', 'Statut', 'Action'];
      this.dataSource=new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
    
      
    });
    this.displayedColumns= ['Solde courant', 'Service', 'Plafond (XAF)','Limite courante (XAF)','Partenaire' ,'Dernière recharge', 'Statut', 'Action'];
    this.dataSource=new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
  }
}


