import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


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

  constructor(private _formBuilder: FormBuilder) {}

}
