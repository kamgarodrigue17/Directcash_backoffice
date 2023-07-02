import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-grille-transfert-directcash-dialog',
  templateUrl: './grille-transfert-directcash-dialog.component.html',
  styleUrls: ['./grille-transfert-directcash-dialog.component.css']
})
export class GrilleTransfertDirectcashDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  mode = this.data.mode;
  object = this.data.object;
}
