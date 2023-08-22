import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-distributeur',
  templateUrl: './add-distributeur.component.html',
  styleUrls: ['./add-distributeur.component.css']
})
export class AddDistributeurComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder, private _router: Router) { }

  add_distributeur() {
    console.log('ajouter distributeur');
    this._router.navigateByUrl("gestion-agents/distributeurs");
  }


}
