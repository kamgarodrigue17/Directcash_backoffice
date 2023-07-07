import { Component, OnInit, ViewChild } from '@angular/core';
import {NgIf} from '@angular/common';
import { Router} from '@angular/router';
import { NgForm, FormControl,FormGroup, Validators  } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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
  this.myForm= new FormGroup({
    
    password : new FormControl('', [Validators.required,Validators.min(6)]),
    username: new FormControl('', Validators.email)
    });
     
 }
  

  constructor(private router: Router,private authService:AuthServiceService){
 
  }

  onSubmit(){
     
    if(this.myForm.valid){
      this.router.navigateByUrl('/dashboard')
     this.authService.Login(this.myForm.value).subscribe(user=>{
      localStorage.setItem("token",this.myForm.value.username)
      console.log(this.myForm.value);
      this.router.navigateByUrl('/dashboard');
     },error => {
      console.error('une erreur :', error);
    })
   
    }else{
      // validator
    }

  }
}
