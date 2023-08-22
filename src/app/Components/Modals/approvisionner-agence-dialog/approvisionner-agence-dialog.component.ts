import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Merchant } from 'src/app/modal/merchant';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-approvisionner-agence-dialog',
  templateUrl: './approvisionner-agence-dialog.component.html',
  styleUrls: ['./approvisionner-agence-dialog.component.css']
})
export class ApprovisionnerAgenceDialogComponent implements OnInit {
  merchants: Merchant[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public agentservice: AgentServiceService, public valideservice: ValidationService) { }

  object = this.data.object;
  id: string = "";
  amount: string = "";
  password: string = "";
  @ViewChild("form") form!: NgForm;
  valide() {
    let data: any = {
      "merchantId": `${this.id}`,
      "amount": this.amount,
      "createBy": localStorage.getItem("id"),

      "password": this.password
    };

    return data;
    // if (data.merchantId != null) {
    //   this.valideservice.initdemandeAprovisionenm(data).subscribe(res => {
    //     console.log(res);
    //   })
    // }
  }

  ngOnInit(): void {
    this.merchants = this.data.merchants;
  }
}
