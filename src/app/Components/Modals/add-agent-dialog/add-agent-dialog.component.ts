import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-agent-dialog',
  templateUrl: './add-agent-dialog.component.html',
  styleUrls: ['./add-agent-dialog.component.css']
})
export class AddAgentDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  nom: string = this.data.nom;
  merchant: string = this.data.merchant;
  imei: string = this.data.imei;
  agence: string = this.data.agence;
  contribuable: string = this.data.contribuable;
     location:string=this.data.location;
  solde:string=this.data.solde;
   
  region:string=this.data.region;
  CNI:string=this.data.CNI;
   tel:string=this.data.telephone

  mode = this.data.mode;
  now = new Date();

}
