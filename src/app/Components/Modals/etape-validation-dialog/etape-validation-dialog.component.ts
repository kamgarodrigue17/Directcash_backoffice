import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-etape-validation-dialog',
  templateUrl: './etape-validation-dialog.component.html',
  styleUrls: ['./etape-validation-dialog.component.css']
})
export class EtapeValidationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  intitule = this.data.intitule;
  priorite = this.data.priorite;
  description = this.data.description;
  mode = this.data.mode;
  now = new Date();
}
