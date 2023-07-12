import { Component, ViewChild,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminDialogComponent } from 'src/app/Components/Modals/admin-dialog/admin-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { User } from 'src/app/modal/user';
import { Validation } from 'src/app/modal/validation';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-admin-plateforme',
  templateUrl: './admin-plateforme.component.html',
  styleUrls: ['./admin-plateforme.component.css']
})
export class AdminPlateformeComponent  implements OnInit{
  displayedColumns: string[] =[];
  ELEMENT_DATA:User[] = [
];
dataSource!:MatTableDataSource<User, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar,public userService:ValidationService) { }
  selected_value: string = "";
  add_agent_form!: NgForm;
  snackbar_message!: string;



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
      data: { selected_value: this.selected_value, title: "des Agents" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_admin_dialog(mode: string) {
    const add_agent_dialog = this.dialog.open(AdminDialogComponent, {
      data: {
        mode: mode
      }
    });

    add_agent_dialog.afterClosed().subscribe(result => {
      this.add_agent_form = result;
      console.log(this.add_agent_form.value);
    });
  }

  open_del_admin_dialog() {
    const del_admin_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation de suppression",
        message: "Voulez - vous vraiment supprimer le compte de cette admin ?"
      }
    });

    del_admin_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  reset_password(agent: string) {
    this.snackbar_message = "Le mot de passe de " + agent + " a été rénitialisé à 0000";
    let snackBarRef = this._snackBar.open(this.snackbar_message, 'Ok');

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }
  ngOnInit(): void {
    this.userService.getAdmin().subscribe(user=>{
      this.ELEMENT_DATA =user.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns=  ['Nom', 'Habilitation', 'Statut', 'Dernière connexion', 'Actions'];
      this.dataSource=new MatTableDataSource<User>(this.ELEMENT_DATA);
    
      
    });
    this.displayedColumns=   ['Nom', 'Habilitation', 'Statut', 'Dernière connexion', 'Actions'];
    this.dataSource=new MatTableDataSource<User>(this.ELEMENT_DATA);
  }
}


