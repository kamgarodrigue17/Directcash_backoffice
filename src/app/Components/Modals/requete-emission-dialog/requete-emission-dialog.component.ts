import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequeteEmission } from 'src/app/modal/requete-emission.model';

@Component({
  selector: 'app-requete-emission-dialog',
  templateUrl: './requete-emission-dialog.component.html',
  styleUrls: ['./requete-emission-dialog.component.css']
})

export class RequeteEmissionDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  requete: RequeteEmission = this.data.requete;
  stock_monnaie_actuel = this.data.stock_monnaie_actuel;
  password!: string;
  mode = this.data.mode;
  now = new Date();

  /**
   * Valider les donner du formulaire
   * @returns
   */
  validate() {
    var data = {
      "amount": this.requete.montant,
      "adminId": localStorage.getItem("id"),
      "pass": this.password
    }
    return data;
  }
}
