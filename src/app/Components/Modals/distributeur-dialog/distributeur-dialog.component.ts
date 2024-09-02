import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private _userService: AdminService,
    private _ref: MatDialogRef<DistributeurDialogComponent>,
    private _matSnackbar: MatSnackBar
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
    "vEmail": this.element.Email,
    "vContactName": this.element.ContactName,
    "vPhone": this.element.Phone,
    "vCNI": this.element.CNI,
    "vSegment": this.element.Segment,
    "vPaymentMethod": this.element.PaymentMethod,
    "vPaymentAc": this.element.PaymentAc,
    "vMarketer": this.element.Marketer,
    "vSuperMerchant": `${this.element.SuperMerchant}`,
    "vCreatedBy": this.element.CreerPar,
    "vImei": this.element.Imei,
    "vCaution": this.element.vCaution,
    "vContribuable": this.element.Contribuable,
    "vEmergencyContact": this.element.EmergencyContact,
    "vEmergencyCni": this.element.EmergencyCni,
    "vIsDistributor": 1,
    "vModifiedBy": this._userService.getLocalUser().data.UserName,
    "MerchantID": this.element.MerchantID,
    "balance": this.element.Balance
  };

  mode = this.data.mode;

  validate() {
    if (this.hasNonEmptyAttributes()) {
      this._ref.close(this.distributeur);
    } else {
      this._matSnackbar.open("Formulaire invalide.")._dismissAfter(3000);
    }
  }

  hasNonEmptyAttributes(): boolean {
    for (const key in this.distributeur) {
      if (Object.prototype.hasOwnProperty.call(this.distributeur, key)) {
        const value = this.distributeur[key];
        if (value === '') {
          console.log(`L'attribut ${key} est vide.`);
          return false;
        }
      }
    }
    return true;
  }

  ngOnInit() {
    console.log(this.merchant);
  }
}
