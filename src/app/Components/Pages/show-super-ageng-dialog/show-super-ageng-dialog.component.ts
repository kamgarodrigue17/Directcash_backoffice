import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Merchant } from 'src/app/modal/merchant';
import { DatetimeService } from 'src/app/services-v2/datetime/datetime.service';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';

@Component({
  selector: 'app-show-super-ageng-dialog',
  templateUrl: './show-super-ageng-dialog.component.html',
  styleUrls: ['./show-super-ageng-dialog.component.css']
})
export class ShowSuperAgengDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private agentservice: AgentServiceService,
    private merchantService: SuperAgentService,
    protected _datetimeService: DatetimeService
  ) {
    // this.merchant = JSON.parse(JSON.stringify(this.data.element));
    // this.merchant.adminId = localStorage.getItem('id');
    // this.merchant.id = data.element.merchantID
  }

  merchants: Merchant[] = [];
  merchant = this.data.element;

  @ViewChild("form") form!: NgForm;
  mode = this.data.mode
  now = new Date();

  valide() {
    console.log(this.merchant);
    this.merchantService.create(this.merchant).subscribe(res => {
      console.log(res);

    }, ((err) => {
      console.log(err);

    }))

  }


  ngOnInit(): void {
    // this.agentservice.Agents("Merchants").subscribe(merchants => {
    //   this.merchants = merchants.data;
    // });
  }
}
