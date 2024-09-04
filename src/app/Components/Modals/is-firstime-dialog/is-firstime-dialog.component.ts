import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services-v2/admin-plateforme/admin.service';

@Component({
  selector: 'app-is-firstime-dialog',
  templateUrl: './is-firstime-dialog.component.html',
  styleUrls: ['./is-firstime-dialog.component.css']
})
export class IsFirstimeDialogComponent {

  constructor(
    private _ref: MatDialogRef<IsFirstimeDialogComponent>,
    private _userService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matsnackbar: MatSnackBar
  ) { }

  matcher = new ErrorStateMatcher();

  oldPasswordFormControl = new FormControl('', [Validators.required]);
  newPasswordFormControl = new FormControl('', [Validators.required]);
  confirmNewPasswordFormControl = new FormControl('', [Validators.required]);

  oldpassword = this.data.password;
  newpassword = this.data.password;
  confirmnewpassword = this.data.password;


  /**
   * Generate user ID
   */
  generatePassword() {
    // on se rassure que l'id generer est unique
    let id = this._userService.generateID(this._userService.USER_PASSWORD_LENGHT);

    // set user ID
    this.newpassword = id;
  }

  returnData() {
    if (this.oldPasswordFormControl.valid && this.newPasswordFormControl.valid && this.confirmNewPasswordFormControl.valid) {

      // check if password are same
      if (this.confirmnewpassword == this.newpassword) {
        let data = {
          oldpassword: this.oldpassword,
          newpassword: this.newpassword,
          confirmnewpassword: this.confirmnewpassword
        }

        this._ref.close(data);
      } else {
        this._matsnackbar.open("Nouveau mot de passe incorrect")._dismissAfter(3000);
      }


    }

  }

}
