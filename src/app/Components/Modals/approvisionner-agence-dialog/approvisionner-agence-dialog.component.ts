import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approvisionner-agence-dialog',
  templateUrl: './approvisionner-agence-dialog.component.html',
  styleUrls: ['./approvisionner-agence-dialog.component.css']
})
export class ApprovisionnerAgenceDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  object = this.data.object;

  @ViewChild("form") form!: NgForm;
}
