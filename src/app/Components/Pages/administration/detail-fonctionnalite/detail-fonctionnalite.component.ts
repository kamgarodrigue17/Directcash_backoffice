import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddProfilDialogComponent } from 'src/app/Components/Modals/add-profil-dialog/add-profil-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { Habilitation } from 'src/app/modal/habilitation';
import { FonctionalitesService } from 'src/app/services/fonctionalites/fonctionalites.service';

@Component({
  selector: 'app-detail-fonctionnalite',
  templateUrl: './detail-fonctionnalite.component.html',
  styleUrls: ['./detail-fonctionnalite.component.css']
})
export class DetailFonctionnaliteComponent implements OnInit {

  constructor(private _router: Router, private dialog: MatDialog,public fonctionalié: FonctionalitesService) { }

  habilitation: any;
  fonctionnalites: Habilitation[]=[];

  displayedColumns: string[] = ['Menu', 'Sous - menu', 'Action'];
  dataSource = new MatTableDataSource<any>(this.fonctionnalites);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Ajouter une fonctionnalite a une habilitation
   */
  add_fonctionnalite() {

    const add_fonctionnalite_dialog = this.dialog.open(AddProfilDialogComponent, {
      data: {
        fonctionnalites: this.fonctionnalites
      }
    });

    add_fonctionnalite_dialog.afterClosed().subscribe(result => {
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

    this.fonctionalié.fonctionalites(this.habilitation.idhabilitation).subscribe(habi => {

      this.fonctionnalites = habi.data;
      console.log(this.fonctionnalites);
      this.displayedColumns = ['Menu', 'Sous - menu','Action'];
      ;
      this.dataSource = new MatTableDataSource<Habilitation>(this.fonctionnalites);
      this.dataSource.paginator = this.paginator;

    });
  

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
