import { Component, OnInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { MatDialog } from '@angular/material/dialog';
import { IsFirstimeDialogComponent } from '../Modals/is-firstime-dialog/is-firstime-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services-v2/admin-plateforme/admin.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  hide = true;
  passwordFormControl: FormControl = new FormControl;
  myForm!: FormGroup;
  isClose = true;

  ngOnInit(): void {
    this.myForm = new FormGroup({

      password: new FormControl('', [Validators.required, Validators.min(6)]),
      username: new FormControl('', Validators.required)
    });

  }

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private globalService: GloabalServiceService,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private _userService: AdminService
  ) {

  }

  // variable pour le loader de la connexion
  display = 'none';

  // variable pour afficher le message d'erreur
  isErrorVisible = 'none';

  // message du timeout
  errorMessage = 'Problème de connexion! Bien vouloir Réessayer ultérieurement.'

  // variable pour griser le bouton de connexion
  isLoading = false;
  connexion_class = 'primary-light-button';

  onSubmit() {

    if (this.myForm.valid) {

      // on grise le bouton de connexion
      this.isLoading = true;
      this.connexion_class = '';

      // on masque le message tu timeout
      this.isErrorVisible = 'none';

      // on active le loader
      this.display = 'flex';
      let data = {
        "username": this.myForm.value.username,
        "password": this.myForm.value.password
      };

      this.isClose = false;
      let request = this._userService.login(this.myForm.value.username, this.myForm.value.password).subscribe(res => {

        // top animation
        this.isClose = true;
        this.display = 'none';
        this.isLoading = false;
        this.connexion_class = 'primary-light-button';

        // log response
        console.log(res);

        // check
        if (res.data.message && res.data.message == "Valid User") {
          // save user
          this._userService.setUser(res);

          this._userService.getLocalUser();

          //navigate to dashboard page
          this.router.navigateByUrl('/home/dashboard');
        } else {

          // show error message
          this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect."
          this.isErrorVisible = "block";
        }

        // si il s'agit de la 1ere connexion
        // if (res.data.token != undefined && res.data.token == null) {
        //   let isFirsttimeDialog = this._dialog.open(IsFirstimeDialogComponent, { disableClose: true, maxWidth: 400 });
        //   isFirsttimeDialog.afterClosed().subscribe(res => {

        //     if (res !== false) {
        //       let oldpassword: string = res.oldpassword;
        //       let newpassword: string = res.newpassword;
        //       let confirmnewpassword: string = res.confirmnewpassword;

        //       // on verifie si les champ ne sont pas vide
        //       if (oldpassword != '' && newpassword != '' && confirmnewpassword != '') {
        //         // on verifie si le nouveau mot de passe correspond
        //         if (newpassword.toLocaleLowerCase() === confirmnewpassword.toLocaleLowerCase()) {
        //           // on envoi la requete de modification du mot de passe
        //         }

        //       } else {
        //         let snackbarRef = this._snackbar.open("Tous les champs sont obligatoires.", "Ok", { duration: 2000 });
        //         snackbarRef.onAction().subscribe(res => {
        //           snackbarRef.dismiss();
        //         });

        //       }

        //     }

        //   });
        // } else {
        //   localStorage.setItem("id", res.data.userName);
        //   res.data.token.refreshToken = "null";
        //   localStorage.setItem("token", res.data.token.token);
        //   localStorage.setItem("company", res.data.company);

        //   localStorage.setItem("user", JSON.stringify(res.data));

        //   console.log(res.data);
        //   this.router.navigateByUrl('/home/dashboard');
        // }

      }, error => {
        this.isClose = true;
        this.display = 'none';
        this.isLoading = false;
        this.connexion_class = 'primary-light-button';
        console.log('--- ERREUR LOGIN ---');
        console.error(error);

        // show error message
        this.errorMessage = "Une erreur est survenue."
        this.isErrorVisible = "block";
      })

      // time out
      setTimeout(() => {
        if (!this.isClose) {
          request.unsubscribe();
          this.display = 'none';
          this.connexion_class = 'primary-light-button';
          this.isLoading = false;

          this.errorMessage = "Problème de connexion.  Réessayer ulterieurement."
          this.isErrorVisible = 'block';
        }

      }, this.globalService.timeout_time);
    }

  }
}
