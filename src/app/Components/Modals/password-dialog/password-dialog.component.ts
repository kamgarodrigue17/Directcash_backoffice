import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  @ViewChild("form") form!: NgForm;

  hide = true;
  passwordFormControl: FormControl = new FormControl;
}
