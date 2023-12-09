import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-reclamation-dialog',
  templateUrl: './show-reclamation-dialog.component.html',
  styleUrls: ['./show-reclamation-dialog.component.css']
})
export class ShowReclamationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

}
