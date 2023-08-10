import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agence-dialog',
  templateUrl: './agence-dialog.component.html',
  styleUrls: ['./agence-dialog.component.css']
})
export class AgenceDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
  mode = this.data.mode;

}
