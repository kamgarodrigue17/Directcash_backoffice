import { Component, ViewChild } from '@angular/core';
import {NgIf} from '@angular/common';
import { Router} from '@angular/router';
import { NgForm, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  hide = true;
  passwordFormControl: FormControl = new FormControl;

  @ViewChild("connexionForm")
  form!: NgForm;

  constructor(private router: Router){}

  onSubmit(){
    if(this.form.valid){
      this.router.navigateByUrl('');
    }else{
      // validator
    }

  }
}
