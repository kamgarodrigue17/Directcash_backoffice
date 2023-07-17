import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Merchant } from 'src/app/modal/merchant';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';

@Component({
  selector: 'app-add-agent-dialog',
  templateUrl: './add-agent-dialog.component.html',
  styleUrls: ['./add-agent-dialog.component.css']
})
export class AddAgentDialogComponent implements OnInit {
  merchants:Merchant[]=[];
agent!:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public agentservice:AgentServiceService){
    console.log(data.element);
    this.agent=data.element;
  }

  nom: string = this.data.nom;
  merchant: string = this.data.merchant;
  imei: string = this.data.imei;
  agence: string = this.data.agence;
  contribuable: string = this.data.contribuable;
     location:string=this.data.location;
  solde:string=this.data.solde;
   
  region:string=this.data.region;
  CNI:string=this.data.CNI;
   tel:string=this.data.telephone

  mode = this.data.mode;
  now = new Date();
ngOnInit(): void {
  this.agentservice.Agents("Merchants").subscribe(merchants=>{
    this.merchants=merchants.data;
    console.log( this.merchants);
  }); 
}
}
