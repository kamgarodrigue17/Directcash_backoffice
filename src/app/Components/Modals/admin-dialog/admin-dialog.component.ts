import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services-v2/admin-plateforme/admin.service';
import { HabilitationService } from 'src/app/services-v2/habilitation/habilitation.service';
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
    private habilitationn: HabilitationService,
    private _ref: MatDialogRef<AdminDialogComponent>,
  ) { }

  mode = this.data.mode;
  now = new Date();

  // liste des habilitations
  habilitations: any[] = this.data.habilitations;
  roles: any[] = []

  // liste des users
  users: any[] = this.data.users;

  element = this.data.element;

  user: any = {
    "vCompany":localStorage.getItem("Company"),
    "userID": null,           // ID de l'utilisateur que vous souhaitez créer -ok
    "fullName": this.element.FullName,        // Nom complet de l'utilisateur - ok
    "defaultPassword": this.element.defaultPassword,  // Mot de passe pour le nouvel utilisateur -ok
    "isActive": 1,                 // Statut d'activité (1 pour actif, 0 pour inactif) -ok
    "Role": this.element.Role,                // Rôle de l'utilisateur (par exemple, "Administrator", "User", etc.)
    "adminId": localStorage.getItem("id"),        // ID de l'administrateur qui crée cet utilisateur -ok
    "modifierPar": this.element.userID != undefined ? `${this._userService.getLocalUser().data.UserName}` : "",             // Laissez vide ou mettez "NULL" pour indiquer une création -ok
    "habilitation": this.element.UserName != undefined ? this.habilitations.find((h) => { return h.label == this.element.habilitation; }).idhabilitation : -1 // -ok
  };


  // Matcher
  matcher = new ErrorStateMatcher();

  idFormControl = new FormControl('', [Validators.required]);
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
    if ( this.nomFormControl.valid && this.passwordControl.valid && this.habilitationControl.valid) {
      this._ref.close(this.user);
    }
  }

  ngOnInit() {
    console.log('--- admin a modifier ---');
    console.log(this.user);
    this.habilitationn.getRole().subscribe(role=>{
this.roles=role.data;
console.log(this.roles)
    })
    // this.user = this.element;
  }



}
