import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddProfilDialogComponent } from 'src/app/Components/Modals/add-profil-dialog/add-profil-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-detail-fonctionnalite',
  templateUrl: './detail-fonctionnalite.component.html',
  styleUrls: ['./detail-fonctionnalite.component.css']
})
export class DetailFonctionnaliteComponent {
  data:any={
    accessibilite: "",
    id: "1",
    label:"Agent",
    menu: "Gestion des Agents",
    status: "Actif"
  }
  @ViewChild("form") form!: NgForm;
  constructor(@Inject(MAT_DIALOG_DATA) public datas: any,private _router: Router, private dialog: MatDialog) {
    this.data = { ...datas.element }
   }

  habilitation: any;
  fonctionnalites: any;

  displayedColumns: string[] = ['Menu', 'Sous - menu', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add_profil() {
    const add_profil_dialog = this.dialog.open(AddProfilDialogComponent, {
      data: {
        element:this.data
      }
    });

   add_profil_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  del_fonctionnalite() {
    const del_fonctionnalite_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation de suppression",
        message: "Retirer cette fonctionnalité de la liste ?"
      }
    });

    del_fonctionnalite_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  /**
   * Retourner a la page des habilitations
   */
  go_back() {
    this._router.navigateByUrl("/administration/gestion-habilitations");
  }

  ngOnInit(): void {
    // on recupere l'habilitation
    this.habilitation = JSON.parse(`${localStorage.getItem("currentHabilitation")}`);

    // on recupere la liste des fonctionnalites
    this.fonctionnalites = JSON.parse(JSON.stringify(localStorage.getItem("fonctionnaliteList")));

    console.log('====================================');
    console.log(this.habilitation);
    console.log('====================================');

    console.log('====================================');
    console.log(this.fonctionnalites);
    console.log('====================================');
  }

}

export interface PeriodicElement {
  menu: string;
  sous_menu: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { menu: "Gestion des agents", sous_menu: "Agents" },
];
