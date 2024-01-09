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
    "habilitation": 0,
    "lastConnection": "",
    "fullName": "",
    "role": "",
    "company": "",
    "creerLe": "",
    "creerPar": "",
    
    "user":"",
    "modifierLe": ""
  };

  habilitations: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userService: ValidationService) {
    this.admin = data.data;
    this.admin.adminId = localStorage.getItem("id");
this.admin.user=localStorage.getItem("id")?.toString();
    this.admin.defaultPassword = "";
    this.admin.adminPassword = "";
    this.habilitations = data.habilitations;
    console.log(this.habilitations);
    this.admin.company=JSON.parse(`${localStorage.getItem("user")}`).fullName;
  }

  /**
   * Valider les donner du formulaire
   * @returns
   */
  validate() {
    this.admin.adminPassword = `${this.admin.defaultPassword}`;
    
    this.admin.modifierPar =this.data.mode!="add"? localStorage.getItem("id"):" ";
    this.admin.isActive=Number.parseInt(this.admin.isActive);
    if (this.admin.habilitation!=null) {
      this.admin.role=this.habilitations[this.admin.habilitation].label;
    console.log(this.admin.role)
    }
    return this.admin;
  }

  mode = this.data.mode;
  now = new Date();
}
