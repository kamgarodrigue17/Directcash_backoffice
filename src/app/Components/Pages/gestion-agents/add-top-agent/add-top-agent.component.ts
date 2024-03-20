import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-top-agent',
  templateUrl: './add-top-agent.component.html',
  styleUrls: ['./add-top-agent.component.css']
})
export class AddTopAgentComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder, private _router: Router) { }

  add_top_agent() {
    console.log('ajouter top agent');
    this._router.navigateByUrl("gestion-agents/top-agents");
  }


}
