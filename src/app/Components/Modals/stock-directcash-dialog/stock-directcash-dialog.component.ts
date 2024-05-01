import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-directcash-dialog',
  templateUrl: './stock-directcash-dialog.component.html',
  styleUrls: ['./stock-directcash-dialog.component.css']
})
export class StockDirectcashDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StockDirectcashDialogComponent>
  ) { }

  montant = this.data.montant;
  stockmonnaie_restant = this.data.stockmonnaie_restant;

  // error variables
  hasError = false;

  // Matcher
  matcher = new ErrorStateMatcher();

  montantFormControl = new FormControl('', [Validators.required, Validators.min(0)]);

  valid() {
    if (this.montantFormControl.valid) {
      // update stock monnaie restant value
      let m = this.stockmonnaie_restant - this.montant;

      // check if stock monnaie restant > 0
      if (m >= 0) {
        this.hasError = false;
        let res = {
          montant: this.montant,
          stockmonnaie_restant: m
        }
        this.dialogRef.close(res);
      } else {
        this.hasError = true;
      }
    }
  }
}
