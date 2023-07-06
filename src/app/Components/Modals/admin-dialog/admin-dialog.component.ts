import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
  mode = this.data.mode;
  now = new Date();
}
