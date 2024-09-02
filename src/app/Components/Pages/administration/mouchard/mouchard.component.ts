import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Habilitation } from 'src/app/modal/habilitation';
import { AlertService } from 'src/app/services-v2/alert/alert.service';
import { LoaderService } from 'src/app/services-v2/loader/loader.service';
import { MouchardService } from 'src/app/services-v2/mouchard/mouchard.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-mouchard',
  templateUrl: './mouchard.component.html',
  styleUrls: ['./mouchard.component.css']
})
export class MouchardComponent implements OnInit {
  
  displayedColumns: string[] = ['Utilisateur', 'Profil de l\'utilisateur', 'Activité', 'Module', 'Date et heure', 'Actions'];
  ELEMENT_DATA: any[] = [];
  dataSource!: MatTableDataSource<any, MatTableDataSourcePaginator>
  constructor(
    public dialog: MatDialog,
    public mouchardService: RoleService,
    public globalService: GloabalServiceService,
    private _mouchardService: MouchardService,
    private _matSnackbar: MatSnackBar,
    protected _loaderService: LoaderService,
    private _alertService: AlertService,
    public global: GloabalServiceService,
  ) { }

  dateTo!: Date;
  dateFrom!: Date;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // variable pour le loader du chargement des elements du tableau
  display = 'none';

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  marquer_comme_resolue() {
    // const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
    //   data:{
    //     title: "Confirmation",
    //     message: "Marquer la (les) réclamation(s) sélectionnée(s) comme resolue(s) ?"
    //   }
    // });

    // confirmation_dialog.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }

  supprimer_reclamation() {
    // const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
    //   data:{
    //     title: "Confirmation",
    //     message: "Voulez - vous vraiment supprimer la (les) réclamation(s) s&lectionnée(s) ?"
    //   }
    // });

    // confirmation_dialog.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }

  show_information() {
    // const reclamation_dialog = this.dialog.open(ShowReclamationDialogComponent, {
    //   data: { }
    // });

    // reclamation_dialog.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);

    // });
  }

  /**
   * Execute la requete de recuperation des donnees
   */
  getActivities() {
    // start loading
    this._loaderService.isProgressHidden = false;

    // send request
    this._mouchardService.getAll(this.global.formatDate(this.dateFrom), this.global.formatDate(this.dateTo)).subscribe(response => {

      // log response
      console.log('--- LISTE DES ACTIONS ---');
      console.log(response);

      // get data
      this.ELEMENT_DATA = response.data;

      // set data
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

      // stop loading
      this._loaderService.isProgressHidden = true;

    }, (error) => {

      // stop loader
      this._loaderService.isProgressHidden = true;

      // log error
      console.log('--- ERREUR GET LISTE ACTIONS ---');
      console.log(error);

      // show snack bar
      this._alertService.type = 'danger'
      this._alertService.message = "Une erreur est survenue.";
      this._alertService.closeAlert();
      this._alertService.openAlert();
    });
  }

  /**
   * Initier les dates
   */
  initDates() {
    this.dateTo = new Date();

    // Créer une copie de dateTo et soustraire un mois pour obtenir dateFrom
    this.dateFrom = new Date(this.dateTo);
    this.dateFrom.setMonth(this.dateFrom.getMonth() - 1);
  }


  ngOnInit(): void {
    this.initDates();
    this.getActivities();
  }

}

