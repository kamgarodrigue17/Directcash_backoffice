import { Component, Inject ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gestion-monnaie-show-information-dialog',
  templateUrl: './gestion-monnaie-show-information-dialog.component.html',
  styleUrls: ['./gestion-monnaie-show-information-dialog.component.css']
})
export class GestionMonnaieShowInformationDialogComponent {
  valide:any={
    "id": "",
    "merchant": "",
    "amount": "",
    "statut": "",
    "creerPar": "",
    "creerLe": "",
    "traiterPar": "",
    "traiterLe": ""
}
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    this.valide=this.data;  }
    @ViewChild("form") form!: NgForm;

}
