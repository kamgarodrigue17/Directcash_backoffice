

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgForm, FormControl,FormGroup  } from '@angular/forms';

import { Router } from '@angular/router';
import { Merchant } from 'src/app/modal/merchant';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {
  merchants:Merchant[]=[];
  myForm!: FormGroup;
  myForm1!: FormGroup;
 
  firstFormGroup = this._formBuilder.group({
   
    firstCtrl:['', Validators.required],
    
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder, private _router: Router,public agentservice:AgentServiceService) { }

  add_agent() {
    let data:any={
      "imei": this.myForm1.value.imei,
  "nom":this.myForm.value.nom,
  "merchant": `${this.myForm1.value.merchant}`,
  "location": this.myForm.value.location,
  "id": "0",
  "modifiedBy": "",
  "adminId":localStorage.getItem('id')
    };
    console.log(data);
    this.agentservice.create(data).subscribe(res=>{
      console.log(res);
      this._router.navigateByUrl("gestion-agents/agents");
    },((err)=>{
      console.log(err);

    }))
    //
  }
ngOnInit(): void {
  this.myForm= new FormGroup({
    
    nom: new FormControl('', Validators.required),
    
    location:new FormControl('', Validators.required),
    
    });
  this.myForm1= new FormGroup({
    merchant: new FormControl('', Validators.required),
    
   
    
    imei: new FormControl('', Validators.required),
    
    });
  this.agentservice.Agents("Merchants").subscribe(merchants=>{
    this.merchants=merchants.data;
    console.log( this.merchants);
  });  
}

}
