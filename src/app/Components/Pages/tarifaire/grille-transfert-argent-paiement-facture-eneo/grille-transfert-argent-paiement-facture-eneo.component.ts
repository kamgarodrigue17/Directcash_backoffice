import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { GrilleTransfertDirectcashDialogComponent } from 'src/app/Components/Modals/grille-transfert-directcash-dialog/grille-transfert-directcash-dialog.component';
import { Fees } from 'src/app/modal/fees';
import { FeesService } from 'src/app/services/fees.service';

@Component({
  selector: 'app-grille-transfert-argent-paiement-facture-eneo',
  templateUrl: './grille-transfert-argent-paiement-facture-eneo.component.html',
  styleUrls: ['./grille-transfert-argent-paiement-facture-eneo.component.css']
})
export class GrilleTransfertArgentPaiementFactureEneoComponent implements OnInit {

  displayedColumns: string[] = [];
  ELEMENT_DATA: Fees[] = [
  ];
  dataSource!: MatTableDataSource<Fees, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, public feesService: FeesService) { }

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

  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { title: "des grilles tarifaire de paiement de facture Eneo" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_add_grille_dialog(mode: string) {
    const add_grille_dialog = this.dialog.open(GrilleTransfertDirectcashDialogComponent, {
      data: {
        mode: mode,
        object: 'paiement facture eneo'
      }
    });

    add_grille_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  open_del_grille_dialog() {
    const del_grille_dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation de suppression",
        message: "Voulez - vous vraiment supprimer cette grille de transfert ?"
      }
    });

    del_grille_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  ngOnInit(): void {
    this.feesService.getfees("eneo").subscribe(fees => {
      this.ELEMENT_DATA = fees.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['De', 'A', 'Frais local (XAF)', 'Frais international (XAF)', 'Actions'];
      this.dataSource = new MatTableDataSource<Fees>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.display = 'none';
    });

    this.displayedColumns = ['De', 'A', 'Frais local (XAF)', 'Frais international (XAF)', 'Actions'];
    this.dataSource = new MatTableDataSource<Fees>(this.ELEMENT_DATA);
  }

}


