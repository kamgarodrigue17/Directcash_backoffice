import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatetimeService } from 'src/app/services-v2/datetime/datetime.service';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css']
})
export class AddClientDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected _datetimeService: DatetimeService
  ) {
    if (this.data.mode != "add") {
      this.client = { ...data.element };
    }
  }

  client: any = this.data.element;


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
  // cni = data
  now = new Date();

  // CNI
  //   :
  //   "111098853"
  // CreerLe
  //   :
  //   "2020-08-06T12:40:24.000Z"
  // CreerPar
  //   :
  //   "2800463311"
  // Du
  //   :
  //   "28-02-2011"




  // Profession
  //   :
  //   "CADRE DE BANQUE "

  // Statut
  //   :
  //   null

}
