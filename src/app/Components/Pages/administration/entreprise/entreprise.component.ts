import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { EntrepriseDialogComponent } from 'src/app/Components/Modals/entreprise-dialog/entreprise-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { Entreprise } from 'src/app/modal/entreprise.model';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent {
  displayedColumns: string[] = [];
  ELEMENT_DATA: Entreprise[] = [];
  dataSource!: MatTableDataSource<Entreprise, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, public entrepriseService: EntrepriseService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // variable pour le loader du chargement des elements du tableau
  display = 'flex';

  // loader pour l'execution des requetes
  isProgressHidden = true;

  // message et type de l'alerte de la page
  alert_message = "";
  alert_type = "";

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
  * Fermeture de l'alerte
  */
  closeAlert() {
    const alert = document.getElementById("alert");
    alert?.classList.add("d-none");
  }

  /**
   * Ouverture de l'alerte
   */
  openAlert() {
    this.closeAlert();
    const alert = document.getElementById("alert");
    alert?.classList.remove("d-none");
  }

  /**
   * Exporter la liste des entreprises
   */
  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { title: "des entreprises" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * Boite de dialogue des entreprises | add - edit - show
   * @param mode
   */
  open_entreprise_dialog(mode: string, entreprise: Entreprise | null) {
    const entreprise_dialog = this.dialog.open(EntrepriseDialogComponent, {
      data: {
        mode: mode,
        entreprise: entreprise
      }
    });

    entreprise_dialog.afterClosed().subscribe(result => {
      if(result != false){

      }
    });
  }

  /**
   * Importer la liste des entreprises
   */
  import() {

  }

  /**
   * Supprimer une entreprise
   */
  delete_entreprise(entreprise: Entreprise) {
    const del_grille_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation de suppression",
        message: "Voulez - vous vraiment supprimer cette entreprise ?"
      }
    });

    del_grille_dialog.afterClosed().subscribe(result => {
      if (result) {

      } else {

      }
    });
  }

  ngOnInit(): void {
    this.entrepriseService.index().subscribe(res => {
      this.ELEMENT_DATA = res.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['ID', 'Nom', 'Numéro contribuable', 'Registre de commerce', 'Employés', 'Actions'];
      this.dataSource = new MatTableDataSource<Entreprise>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });

    this.displayedColumns = ['ID', 'Nom', 'Numéro contribuable', 'Registre de commerce', 'Employés', 'Actions'];
    this.dataSource = new MatTableDataSource<Entreprise>(this.ELEMENT_DATA);
  }

}
