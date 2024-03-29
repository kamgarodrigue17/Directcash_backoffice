import { Component, OnInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  hide = true;
  passwordFormControl: FormControl = new FormControl;
  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = new FormGroup({

      password: new FormControl('', [Validators.required, Validators.min(6)]),
      username: new FormControl('', Validators.required)
    });

  }

  constructor(private router: Router, private authService: AuthServiceService, private globalService: GloabalServiceService) {

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

      let request = this.authService.Login(this.myForm.value).subscribe(user => {

        this.display = 'none';
        this.isLoading = false;
        this.connexion_class = 'primary-light-button';
        localStorage.setItem("id", user.data.userName);
        user.data.token.refreshToken = "null";
        localStorage.setItem("token", user.data.token.token)
        localStorage.setItem("user", JSON.stringify(user.data));

        console.log(this.myForm.value);
        this.router.navigateByUrl('/home/dashboard');
      }, error => {
        console.error('une erreur :', error);
      })

      // time out
      setTimeout(() => {
        request.unsubscribe();
        this.display = 'none';
        this.connexion_class = 'primary-light-button';
        this.isLoading = false;
        this.displayTimeout = 'block';
      }, this.globalService.timeout_time);


    } else {
      // validator
    }

  }
}
