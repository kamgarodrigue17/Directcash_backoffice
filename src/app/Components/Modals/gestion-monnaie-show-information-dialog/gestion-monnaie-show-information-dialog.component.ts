import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gestion-monnaie-show-information-dialog',
  templateUrl: './gestion-monnaie-show-information-dialog.component.html',
  styleUrls: ['./gestion-monnaie-show-information-dialog.component.css']
})
export class GestionMonnaieShowInformationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

}
