import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { catchError, throwError } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { NotifierRechargeDialogComponent } from 'src/app/Components/Modals/notifier-recharge-dialog/notifier-recharge-dialog.component';
import { StockDirectcashDialogComponent } from 'src/app/Components/Modals/stock-directcash-dialog/stock-directcash-dialog.component';
import { Plafond } from 'src/app/modal/plafond';
import { MessageService } from 'src/app/services/message/message.service';
import { PlafondService } from 'src/app/services/plafond/plafond.service';
import { RequeteEmissionService } from 'src/app/services/requete-emission/requete-emission.service';

@Component({
  selector: 'app-creation-monnaie',
  templateUrl: './creation-monnaie.component.html',
  styleUrls: ['./creation-monnaie.component.css']
})
export class CreationMonnaieComponent implements OnInit {
  displayedColumns: string[] = ["stock", "montant", "affecteLe", "affectePar"];
  ELEMENT_DATA: any[] = [
  ];
  dataSource!: MatTableDataSource<any, MatTableDataSourcePaginator>
  isInfoLoading = false;

  constructor(
    public dialog: MatDialog,
    public plafond: PlafondService,
    protected requeteEmissionService: RequeteEmissionService,
    private matSnackBar: MatSnackBar,
    private _messageService: MessageService

  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * -----------------------------------------------------------------------------
   * Variable d'affectation de la monnaie
   * -----------------------------------------------------------------------------
   */

  // solde stockmonnaie restant
  stockmonnaie_restant = 1_000_000;

  // stock DirectCash
  stockdirectcash = 0; // doit etre >= stockmonnaie

  // stock MyDirectCash
  stockmydirectcash = 0; // doit etre >= stockmonnaie

  // stock monnaie (valeur qui sera remplie automatique apres emission valider)
  stockmonnaie = this.stockdirectcash + this.stockmonnaie_restant + this.stockmydirectcash;

  /**
   * Open dialog to define max level amount to use services for DirectCash users
   */
  openStockDirectCashDialog() {
    let stock_dialog = this.dialog.open(StockDirectcashDialogComponent, {
      data: {
        title: "Directcash",
        montant: this.stockdirectcash,
        stockmonnaie_restant: this.stockmonnaie_restant
      },
    });

    stock_dialog.afterClosed().subscribe(result => {
      if (result != false) {
        let montant = result.montant;
        let stockmonnaie_restant = result.stockmonnaie_restant;

        // appel de l'api de mise a jour du stock directcash
        // au retour de la reponse
        this.stockdirectcash = montant;
        this.stockmonnaie_restant = stockmonnaie_restant;

        // on met a jour le stock mydirectcash
        this.stockmydirectcash = this.stockmonnaie_restant;

        // stock resetant
        this.stockmonnaie_restant = (this.stockdirectcash + this.stockmydirectcash) - this.stockmonnaie;

        //

        // on notifie
        this.alert_message = 'Stocks mis à jour';
        this.alert_type = 'info'

        this.openAlert()

        // on met a jour pour 
      }

    });

  }

  /**
   * Fonction d'exportation du contenu du tableau sous plusieurs formats
   * CSV, EXCEL, PDF
   */
  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { selected_value: "", title: "des affectations de la monnaie" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * Open dialog to define max level amount to use services for MyDirectCash users
   */
  openStockMyDirectCashDialog() {
    let stock_dialog = this.dialog.open(StockDirectcashDialogComponent, {
      data: {
        title: "MyDirectcash",
        montant: this.stockmydirectcash,
        stockmonnaie_restant: this.stockmonnaie_restant
      },
    });

    stock_dialog.afterClosed().subscribe(result => {
      console.log(result);

    });
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


  open_edit_plafond_dialog(element: any) {
    const edit_plafond_dialog = this.dialog.open(NotifierRechargeDialogComponent, { data: element });

    edit_plafond_dialog.afterClosed().subscribe(result => {
      if (result != false) {

        // on recupere les donnees du formulaire
        let form_data = result;

        // on affiche le dialogue de confirmation
        const confirmation_dialog = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: 'Confirmation',
            message: 'Appliquer les modifications ?'
          }
        });

        confirmation_dialog.afterClosed().subscribe(decision => {
          if (decision) {

            // on active la barre de progression
            this.isProgressHidden = false;

            // on envoi la requete de modification
            this.plafond.changeplafond(form_data).subscribe(res => {

              // au retour de la reponse, on masque la barre de progression
              this.isProgressHidden = true;

              // on definit le type d'alerte  afficher en fonction du code de retour
              let res_code = res.code;
              switch (+res_code) {
                case 400:
                  this.alert_type = 'warning'
                  break;
                default:
                  this.alert_type = 'info'
                  break;
              }
              this.alert_message = res.data;
              this.openAlert();

            })
          } else {
            // on annule toutes les modifications effectuees dans le formulaire
          }
        })

      } else {

      }
    });
  }

  /**
   * Recuperer les info sur les stocks de monnaie
   */
  handleGetInfo() {
    try {
      this.isProgressHidden = false;

      this.requeteEmissionService.getInfo().pipe(
        catchError((error: HttpErrorResponse) => {
          this.isProgressHidden = true;
          if (error.status !== 200) {
            this.alert_type = 'danger';

            this.alert_message = this._messageService.getHttpMessage(error.status);

            this.closeAlert();
            this.openAlert();

            // log response
            console.log(error.message);
          }
          return throwError(error);
        })
      ).subscribe(res => {
        // stop loading
        this.isProgressHidden = true;

        // assign values
        this.stockdirectcash = res.data.soldeDirectcash;
        this.stockmydirectcash = res.data.soldeMd;
        this.stockmonnaie_restant = res.data.soldeFournisseur;
      })
    } catch (error) {
      this.matSnackBar.open("Une erreur est survenue");
    }
  }

  ngOnInit(): void {
    // this.plafond.plafonds().subscribe(plafond => {
    //   this.ELEMENT_DATA = plafond.data;
    //   console.log(this.ELEMENT_DATA);
    //   this.displayedColumns = ['Solde courant', 'Service', 'Plafond (XAF)', 'Limite courante (XAF)', 'Partenaire', 'Dernière recharge', 'Statut', 'Action'];
    //   this.dataSource = new MatTableDataSource<Plafond>(this.ELEMENT_DATA);
    //   this.dataSource.paginator = this.paginator;
    //   this.display = 'none';
    // });

    // this.displayedColumns = ['Solde courant', 'Service', 'Plafond (XAF)', 'Limite courante (XAF)', 'Partenaire', 'Dernière recharge', 'Statut', 'Action'];
    // this.dataSource = new MatTableDataSource<Plafond>(this.ELEMENT_DATA);

    this.handleGetInfo();
  }
}


