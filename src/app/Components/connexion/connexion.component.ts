import { Component, OnInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';
import { MatDialog } from '@angular/material/dialog';
import { IsFirstimeDialogComponent } from '../Modals/is-firstime-dialog/is-firstime-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackbar: MatSnackBar
  ) {

  }

  // variable pour le loader de la connexion
  display = 'none';

  // variable pour afficher le message du timeout
  displayTimeout = 'none';

  // message du timeout
  timeoutMessage = 'Problème de connexion! Bien vouloir Réessayer ultérieurement.'

  // variable pour griser le bouton de connexion
  isLoading = false;
  connexion_class = 'primary-light-button';

  onSubmit() {

    if (this.myForm.valid) {

      // on grise le bouton de connexion
      this.isLoading = true;
      this.connexion_class = '';

      // on masque le message tu timeout
      this.displayTimeout = 'none';

      // on active le loader
      this.display = 'flex';
      let data = {
        "username": this.myForm.value.username,
        "password": this.myForm.value.password
      };

      this.isClose = false;
      this.authService.Login(this.myForm.value).subscribe(res => {})
      let request = this.authService.Login(this.myForm.value).subscribe(user => {

        this.isClose = true;
        this.display = 'none';
        this.isLoading = false;
        this.connexion_class = 'primary-light-button';        

        // si il s'agit de la 1ere connexion
        if (user.data.token != undefined && user.data.token == null) {
          let isFirsttimeDialog = this._dialog.open(IsFirstimeDialogComponent, { disableClose: true, maxWidth: 400 });
          isFirsttimeDialog.afterClosed().subscribe(res => {

            if (res !== false) {
              let oldpassword: string = res.oldpassword;
              let newpassword: string = res.newpassword;
              let confirmnewpassword: string = res.confirmnewpassword;

              // on verifie si les champ ne sont pas vide
              if (oldpassword != '' && newpassword != '' && confirmnewpassword != '') {
                // on verifie si le nouveau mot de passe correspond
                if (newpassword.toLocaleLowerCase() === confirmnewpassword.toLocaleLowerCase()) {
                  // on envoi la requete de modification du mot de passe
                }

              } else {
                let snackbarRef = this._snackbar.open("Tous les champs sont obligatoires.", "Ok", { duration: 2000 });
                snackbarRef.onAction().subscribe(res => {
                  snackbarRef.dismiss();
                });

              }

            }

          });
        } else {
          localStorage.setItem("id", user.data.userName);
          user.data.token.refreshToken = "null";
          localStorage.setItem("token", user.data.token.token);
          localStorage.setItem("company", user.data.company) ;

          localStorage.setItem("user", JSON.stringify(user.data));

          console.log(user.data);
          this.router.navigateByUrl('/home/dashboard');
        }

      }, error => {
        this.isClose = true;
        this.display = 'none';
        this.isLoading = false;
        this.connexion_class = 'primary-light-button';
        console.error('une erreur :', error);
      })

      // time out
      setTimeout(() => {
        if (!this.isClose) {
          request.unsubscribe();
          this.display = 'none';
          this.connexion_class = 'primary-light-button';
          this.isLoading = false;
          this.displayTimeout = 'block';
        }

      }, this.globalService.timeout_time);


    } else {
      // validator
    }

  }
}
