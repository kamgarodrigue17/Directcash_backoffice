import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequeteEmission } from 'src/app/modal/requete-emission';

@Component({
  selector: 'app-requete-emission-dialog',
  templateUrl: './requete-emission-dialog.component.html',
  styleUrls: ['./requete-emission-dialog.component.css']
})

export class RequeteEmissionDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<RequeteEmissionDialogComponent>,
    private _snackbar: MatSnackBar
  ) { }

  requete: RequeteEmission = this.data.requete;
  stock_monnaie_actuel = this.data.stock_monnaie_actuel;
  password!: string;
  mode = this.data.mode;
  now = new Date();


  // Matcher
  matcher = new ErrorStateMatcher();

  // Form control
  amountControl = new FormControl('', [Validators.required, Validators.min(500)]);
  passwordControl = new FormControl('', [Validators.required]);

  /**
   * Valider les donner du formulaire
   * @returns
   */
  validate() {
    if (this.amountControl.valid && this.passwordControl.valid) {
      let myPassword = "12345";
      // check password
      if (this.password != myPassword) {
        this._snackbar.open('Mot de passe incorrect.')._dismissAfter(3000);
      } else {
        this.requete.reference = "REF-" + Date.now();
        this.requete.jour = new Date().toISOString();
        this.requete.s = "1";
        this.requete.statut = "0";
        this.requete.pass = this.password;
        this.requete.creerPar = localStorage.getItem("id") + '';
        this.requete.id = localStorage.getItem("id") + '';
        this.requete.creerLe = new Date().toISOString();
        this.requete.amount = `${this.requete.amount}`;

        // exit dialog
        this._dialogRef.close(this.requete);
      }

    }
  }

  ngOnInit() {
    // init data
    if (this.requete == undefined) {
      this.requete = {
        id: "",
        amount: "",
        creerLe: "",
        creerPar: "",
        fournusseur: " ",
        jour: "",
        pass: "",
        reference: "",
        s: "",
        statut: "",
        traiteLe: " ",
        traiterPar: " "
      }
    }
  }
}
