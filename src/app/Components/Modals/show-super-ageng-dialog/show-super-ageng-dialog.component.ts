import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Merchant } from 'src/app/modal/merchant';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';

@Component({
  selector: 'app-show-super-ageng-dialog',
  templateUrl: './show-super-ageng-dialog.component.html',
  styleUrls: ['./show-super-ageng-dialog.component.css']
})
export class ShowSuperAgengDialogComponent  implements OnInit{
  merchants:Merchant[]=[];
  merchant:any={balance:"",
    cni:"",
    contactName:"",
    contribuable:"",
    createdOn:"",
    department:"",
    district:"",
    email:"",
    id:"",
    adminId:localStorage.getItem('id'),
    imei:"",
    marketer:"",
    nom:"",
    operateurMarketing:"",
    paymentAc:"",
    paymentMethod:"",
    phone:"",
    region:"",
    segment:"",
    superMerchant:"",
    type:""}
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public agentservice:AgentServiceService,public merchantService:SuperAgentService){
    console.log(data);
   this.merchant=data.element;
   this.merchant.adminId=localStorage.getItem('id');
   this.merchant.id=data.element.merchantID

   }
    @ViewChild("form") form!: NgForm;
  mode=this.data.mode
  now = new Date();
  valide(){
    console.log(this.merchant);
    this.merchantService.create(this.merchant).subscribe(res=>{
      console.log(res);
      
    },((err)=>{
      console.log(err);

    }))

  }
  ngOnInit(): void {
    this.agentservice.Agents("Merchants").subscribe(merchants=>{
      this.merchants=merchants.data;
      console.log( this.merchants);
    }); 
  }
}
