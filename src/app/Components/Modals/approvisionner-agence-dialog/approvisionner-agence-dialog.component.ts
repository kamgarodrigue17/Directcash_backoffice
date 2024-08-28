import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Merchant } from 'src/app/modal/merchant';
import { AdminService } from 'src/app/services-v2/admin-plateforme/admin.service';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-approvisionner-agence-dialog',
  templateUrl: './approvisionner-agence-dialog.component.html',
  styleUrls: ['./approvisionner-agence-dialog.component.css']
})
export class ApprovisionnerAgenceDialogComponent implements OnInit {
  merchants: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public agentservice: AgentServiceService,
    public valideservice: ValidationService,
    private _userService: AdminService,
    private _dialogRef: MatDialogRef<ApprovisionnerAgenceDialogComponent>
  ) { }

  // Matcher
  matcher = new ErrorStateMatcher();

  // Form control
  merchantControl = new FormControl('', [Validators.required]);
  amountControl = new FormControl('', [Validators.required, Validators.min(500)]);
  passwordControl = new FormControl('', [Validators.required]);

  object = this.data.object;
  id: string = "";
  amount: number = 0;
  password: string = "";
  @ViewChild("form") form!: NgForm;

  valide() {
    if (this.merchantControl.valid && this.amountControl.valid && this.passwordControl.valid) {
      let data: any = {
        // "merchantId": `${this.id}`,
        // "amount": `${this.amount}`,
        // "createBy": localStorage.getItem("id"),
        // "password": this.password,

        "vMerchant": `${this.id}`,
        "vAmount": `${this.amount}`,
        "vCreatedBy": `${this._userService.getLocalUser().data.UserName}`,
        "vCautionId": "null",
        "vPass": `${this.password}`
      };
      this._dialogRef.close(data);
    }
  }

  ngOnInit(): void {
    this.merchants = this.data.merchants;
    console.log(this.data.merchants);
  }
}
