import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequeteEmission } from 'src/app/modal/requete-emission';
import { AdminService } from 'src/app/services-v2/admin-plateforme/admin.service';

@Component({
  selector: 'app-requete-emission-dialog',
  templateUrl: './requete-emission-dialog.component.html',
  styleUrls: ['./requete-emission-dialog.component.css']
})

export class RequeteEmissionDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<RequeteEmissionDialogComponent>,
    private _snackbar: MatSnackBar,
    private _userService: AdminService
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
  refControl = new FormControl('', [Validators.required]);

  /**
   * Valider les donner du formulaire
   * @returns
   */
  validate() {
    if (this.amountControl.valid && this.passwordControl.valid && this.refControl.valid) {

      let jour = new Date();
      // "2024-08-25",
      this.requete.jour = `${jour.getFullYear()}-${jour.getMonth()}-${jour.getDate()}`;
      this.requete.pass = this.password;
      this.requete.creerPar = this._userService.getLocalUser().data.UserName;
      this.requete.amount = `${this.requete.amount}`;

      // exit dialog
      this._dialogRef.close(this.requete);
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
