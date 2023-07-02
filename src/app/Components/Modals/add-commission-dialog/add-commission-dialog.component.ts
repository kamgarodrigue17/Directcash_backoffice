import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-commission-dialog',
  templateUrl: './add-commission-dialog.component.html',
  styleUrls: ['./add-commission-dialog.component.css']
})
export class AddCommissionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  mode = this.data.mode;
}
