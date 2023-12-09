import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})

export class AdminDialogComponent {
  admin: any = {
    "userName": "",
    "isActive": "",
    "habilitation": "",
    "lastConnection": "",
    "fullName": "",
    "role": "",
    "company": "",
    "creerLe": "",
    "creerPar": "",
    "modifierPar": "",
    "modifierLe": ""
  };

  habilitations: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userService: ValidationService) {
    this.admin = data.data;
    this.admin.adminId = localStorage.getItem("id");
    this.admin.defaultPassword = "";
    this.admin.adminPassword = "";
    this.habilitations = data.habilitations;
  }

  /**
   * Valider les donner du formulaire
   * @returns
   */
  validate() {
    this.admin.adminPassword = `${this.admin.defaultPassword}`;
    this.admin.modifierPar = localStorage.getItem("id");
    return this.admin;
  }

  mode = this.data.mode;
  now = new Date();
}
