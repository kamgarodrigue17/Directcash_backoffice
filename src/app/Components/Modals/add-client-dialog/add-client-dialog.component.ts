import { Component, Inject,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css']
})
export class AddClientDialogComponent {
  client:any={
    "matricule": "",
            "phone": "",
            "email": "",
            "solde": "",
            "statut": "",
            "nom": "",
            "adresse": "",
            "sexe": "",
            "country": ""
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
if (this.data.mode!="add") {
  this.client={...data.element};
}

  }
  @ViewChild("form") form!: NgForm;
  nom = this.data.nom;
  solde = this.data.solde;
  email = this.data.email;
  statut = this.data.statut;
  tel = this.data.tel;
  adresse = this.data.adresse;
  sexe = this.data.sexe;
  matricule = this.data.matricule;
  mode = this.data.mode;
  now = new Date();
}
