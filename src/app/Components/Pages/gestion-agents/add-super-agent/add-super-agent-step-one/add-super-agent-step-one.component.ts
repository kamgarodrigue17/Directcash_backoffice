import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-super-agent-step-one',
  templateUrl: './add-super-agent-step-one.component.html',
  styleUrls: ['./add-super-agent-step-one.component.css']
})
export class AddSuperAgentStepOneComponent {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder, private _router: Router) {}

  add_super_agent() {
    console.log('ajouter agent');
    this._router.navigateByUrl("/gestion-agents/super-agents");
  }
}
