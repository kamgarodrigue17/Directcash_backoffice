import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { EtapeValidationDialogComponent } from 'src/app/Components/Modals/etape-validation-dialog/etape-validation-dialog.component';
import { Validation } from 'src/app/modal/validation';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-etape-validation',
  templateUrl: './etape-validation.component.html',
  styleUrls: ['./etape-validation.component.css']
})
export class EtapeValidationComponent implements OnInit {
  displayedColumns: string[] =[];
  ELEMENT_DATA:Validation[] = [
];
dataSource!:MatTableDataSource<Validation, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar,public validation:ValidationService) { }

  snackbar_message = "";

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_etape_validation_dialog(mode: string) {
    const etape_dialog = this.dialog.open(EtapeValidationDialogComponent, {
      data: {
        mode: mode
      }
    });

    etape_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  del_etape_validation() {
   const delete_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation de suppréssion",
        message: "Supprimer cette étape de validation ?"
      }
    });

    delete_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  ngOnInit(): void {
    this.validation.validations().subscribe(agents=>{
      this.ELEMENT_DATA =agents.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns=  ['Intitulé', 'Priorité', 'Validateur', 'Service', 'Creé le', 'Actions'];
      this.dataSource=new MatTableDataSource<Validation>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
    
    this.displayedColumns=  ['Intitulé', 'Priorité', 'Validateur', 'Service', 'Creé le', 'Actions'];
    this.dataSource=new MatTableDataSource<Validation>(this.ELEMENT_DATA);
  }

}


