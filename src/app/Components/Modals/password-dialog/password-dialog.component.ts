import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<PasswordDialogComponent>
  ) { }

  // matcher
  matcher = new ErrorStateMatcher()

  hide = true;
  password = "";
  passwordFormControl: FormControl = new FormControl;

  valid() {
    if (this.passwordFormControl.valid)
      this._ref.close(this.password);
  }
}
