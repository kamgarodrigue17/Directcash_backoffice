import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Merchant } from 'src/app/modal/merchant';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';
@Component({
  selector: 'app-agence-dialog',
  templateUrl: './agence-dialog.component.html',
  styleUrls: ['./agence-dialog.component.css']
})
export class AgenceDialogComponent implements OnInit {
  agence:any={}
  merchants:Merchant[]=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public agentservice:AgentServiceService , public agenceService:SuperAgentService){
    this.agence={...data.agence};
  }
  mode = this.data.mode;
  @ViewChild("form") form!: NgForm;
  edit(){
    if (this.data.mode=='add') {
      this.agence.createdBy=`${localStorage.getItem("id")}`
    }
    
    if (this.data.mode=='edit') {
      this.agence.createdBy=`${this.agence.createdBy}`
    }

    console.log(this.agence)
    this.agenceService.newEditAgence(this.agence).subscribe(res=>{
      console.log(res);
    })
  }
  ngOnInit(): void {
    this.agentservice.Agents("Merchants").subscribe(merchants=>{
      this.merchants=merchants.data;
      console.log( this.merchants);
    }); 
  }
}
