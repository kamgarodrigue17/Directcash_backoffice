import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Merchant } from 'src/app/modal/merchant';
import { FormBuilder, Validators } from '@angular/forms';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';

@Component({
  selector: 'app-add-super-agent-step-one',
  templateUrl: './add-super-agent-step-one.component.html',
  styleUrls: ['./add-super-agent-step-one.component.css']
})
export class AddSuperAgentStepOneComponent implements OnInit  {

  merchants:Merchant[]=[];
  myForm!: FormGroup;
  myForm1!: FormGroup;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder, private _router: Router,public agentservice:AgentServiceService ,public merchantService:SuperAgentService) {}

  add_super_agent() {
    
    
    let data:any={
      "nom":this.myForm.value.nom ,
    "email":this.myForm1.value.email,
    "contactName":this.myForm1.value.contactName ,
    "phone":this.myForm.value.phone ,
    "cni": this.myForm.value.cni,
    "superMerchant":`${this.myForm1.value.superMerchant}` ,
    "imei":this.myForm.value.imei ,
    "id":"0",
    "adminId":localStorage.getItem('id')
    };
   let dara:any={
      "cni": "kkk",
      "contactName": "test",
      "imei": "test",
      "nom": "testname",
      "phone": "681176708",
      "id": "0",
      "email": "kam@gmail.com",
      "adminId":"tabetsing",
      "superMerchant": "null"
      
      
     
    }
    console.log(data);
    console.log(dara);
  this.merchantService.create(data).subscribe(res=>{
      console.log(res);
      this._router.navigateByUrl("/gestion-agents/super-agents");
    },((err)=>{
      console.log(err);

    }))
    
   // this._router.navigateByUrl("/gestion-agents/super-agents");
  }
  ngOnInit(): void {
    this.myForm= new FormGroup({
      nom: new FormControl('', Validators.required),

      
      phone: new FormControl('', Validators.required),
      cni: new FormControl('', Validators.required),
      
      imei: new FormControl('', Validators.required),
      
      });
      this.myForm1= new FormGroup({
       
        email: new FormControl('', Validators.required),
        contactName:new FormControl('', Validators.required),
        superMerchant: new FormControl('', Validators.required),
        
      
        
        });
     
    this.agentservice.Agents("Merchants").subscribe(merchants=>{
      this.merchants=merchants.data;
      console.log( this.merchants);
    });  
  }
}
