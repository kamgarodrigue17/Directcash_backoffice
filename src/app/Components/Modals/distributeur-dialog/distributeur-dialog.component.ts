import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Merchant } from 'src/app/modal/merchant';
import { AdminService } from 'src/app/services-v2/admin-plateforme/admin.service';
import { DatetimeService } from 'src/app/services-v2/datetime/datetime.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';

@Component({
  selector: 'app-distributeur-dialog',
  templateUrl: './distributeur-dialog.component.html',
  styleUrls: ['./distributeur-dialog.component.css']
})
export class DistributeurDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    protected _datetimeService: DatetimeService,
    private _userService: AdminService
  ) {
    // this.merchant = JSON.parse(JSON.stringify(this.data.element));
    // this.merchant.adminId = localStorage.getItem('id');
    // this.merchant.id = data.element.MerchantID
  }

  merchants: Merchant[] = [];
  merchant: any = {};
  element = this.data.element;
  distributeur: any = {
    "vMerchantName": this.element.MerchantName,
    "vEmail": this.element.email,
    "vContactName": this.element.contactName,
    "vPhone": this.element.Phone,
    "vCNI": this.element.cni,
    "vSegment": this.element.segment,
    "vPaymentMethod": this.element.vPaymentMethod,
    "vPaymentAc": this.element.vPaymentAc,
    "vMarketer": this.element.vMarketer,
    "vSuperMerchant": `${this.element.superMerchant}`,
    "vCreatedBy": this.element.creerPar,
    "vImei": this.element.imei,
    "vCaution": this.element.vCaution,
    "vContribuable": this.element.contribuable,
    "vEmergencyContact": this.element.phoneContact,
    "vEmergencyCni": this.element.cniContact,
    "vIsDistributor": 1,
    "vModifiedBy": this._userService.getLocalUser().data.UserName,
    "MerchantID": this.element.MerchantID,
    "balance": this.element.Balance
  };

  mode = this.data.mode;

  validate() {
    let data: any = {
      // "vMerchantName": this.myForm.value.nom,
      // "vEmail": this.myForm.value.email,
      // "vContactName": this.myForm1.value.contactName,
      // "vPhone": this.myForm.value.phone,
      // "vCNI": this.myForm.value.cni,
      // "vSegment": 2,
      // "vPaymentMethod": "CreditCard",
      // "vPaymentAc": "AccountXYZ",
      // "vMarketer": null,
      // "vSuperMerchant": `${this.myForm1.value.superMerchant}`,
      // "vCreatedBy": this._userService.getLocalUser().data.UserName,
      // "vImei": this.myForm.value.imei,
      // "vCaution": "10",
      // "vContribuable": this.myForm1.value.contribuable,
      // "vEmergencyContact": this.myForm1.value.phoneContact,
      // "vEmergencyCni": this.myForm1.value.cniContact,
      // "vIsDistributor": 1,
      // "vModifiedBy": null,
      // "MerchantID": null,
    };
  }

  ngOnInit() {
    console.log(this.merchant);
  }
}
