import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services-v2/admin-plateforme/admin.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})

export class AdminDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: AdminService,
    private _ref: DialogRef<AdminDialogComponent>
  ) {
    // this.user = data.data;
    // this.user.adminId = localStorage.getItem("id");
    // // this.user.user = localStorage.getItem("id")?.toString();
    // this.user.defaultPassword = "";
    // this.user.adminPassword = "";
    // this.habilitations = data.habilitations;
    // console.log(this.habilitations);
    // this.user.company = JSON.parse(`${localStorage.getItem("user")}`).fullName;
  }

  user: any = {
    "userID": "",           // ID de l'utilisateur que vous souhaitez créer
    "fullName": "",        // Nom complet de l'utilisateur
    "defaultPassword": "",  // Mot de passe pour le nouvel utilisateur
    "isActive": 1,                 // Statut d'activité (1 pour actif, 0 pour inactif)
    "Role": "",                // Rôle de l'utilisateur (par exemple, "Administrator", "User", etc.)
    "adminId": "",        // ID de l'administrateur qui crée cet utilisateur -
    "modifierPar": "",             // Laissez vide ou mettez "NULL" pour indiquer une création
    "habilitation": -1
  };

  mode = this.data.mode;
  now = new Date();

  // liste des habilitations
  habilitations: any[] = this.data.habilitations;

  // liste des users
  users: any[] = this.data.users;


  // Matcher
  matcher = new ErrorStateMatcher();

  // Form control
  // amountControl = new FormControl('', [Validators.required, Validators.min(500)]);

  idFormControl = new FormControl('', [Validators.required]);
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nomFormControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  habilitationControl = new FormControl('', [Validators.required]);

  /**
   * Generate user ID
   */
  generateID() {
    // on se rassure que l'id generer est unique
    let id = this._userService.generateID(this._userService.USER_ID_LENGHT);

    // get users with same id
    let usersWithSameId = this.users.filter((user, index) => { return user.userID == id; });

    // check
    while (usersWithSameId.length > 0) {
      id = this._userService.generateID(this._userService.USER_ID_LENGHT);
      usersWithSameId = this.users.filter((user, index) => { return user.userID == id; });
    }

    // set user ID
    this.user.userID = id;
  }

  /**
   * Generate user ID
   */
  generatePassword() {
    // on se rassure que l'id generer est unique
    let id = this._userService.generateID(this._userService.USER_PASSWORD_LENGHT);

    // set user ID
    this.user.defaultPassword = id;
  }

  /**
   * Valider les donner du formulaire
   * @returns
   */
  validate() {
    // this.user.company = localStorage.getItem("company");
    // this.user.adminPassword = `${this.user.defaultPassword}`;
    // console.log(this.user);
    // this.user.modifierPar = this.data.mode != "add" ? localStorage.getItem("id") : "";
    // this.user.isActive = Number.parseInt(this.user.isActive);
    // if (this.user.habilitation != null) {
    //   this.user.role = this.habilitations[this.user.habilitation].label;
    //   console.log(this.user.role)
    // }
    // return this.user;
  }

}
