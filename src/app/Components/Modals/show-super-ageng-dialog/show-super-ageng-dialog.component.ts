import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-super-ageng-dialog',
  templateUrl: './show-super-ageng-dialog.component.html',
  styleUrls: ['./show-super-ageng-dialog.component.css']
})
export class ShowSuperAgengDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  nom: string = this.data.nom;
  merchant: string = this.data.merchant;
  imei: string = this.data.imei;
  agence: string = this.data.agence;
  contribuable: string = this.data.contribuable;
  mode = this.data.mode;
  now = new Date();
}
