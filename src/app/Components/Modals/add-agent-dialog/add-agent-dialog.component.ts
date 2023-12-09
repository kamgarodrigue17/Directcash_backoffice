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


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public agentservice: AgentServiceService) {
    this.agent.modifiedBy = localStorage.getItem("id");
    this.agent.adminId = localStorage.getItem("id");
  }

  mode = this.data.mode;
  agent = this.data.element;

  now = new Date();
  valid() {
    this.agent.nom = this.agent.agentName;

    this.agent.modifiedBy = localStorage.getItem("id");

    console.log(this.agent);
    this.agentservice.create(this.agent).subscribe(ress => {
      console.log(ress)
    })
  }
  ngOnInit(): void {
    console.log(this.agent);

    // this.agentservice.Agents("Merchants").subscribe(merchants=>{
    //   this.merchants=merchants.data;
    //   console.log( this.merchants);
    // });
  }
}
