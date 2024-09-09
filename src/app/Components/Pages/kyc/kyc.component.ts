import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from 'src/app/services-v2/alert/alert.service';
import { KycService } from 'src/app/services-v2/kyc/kyc.service';
import { GloabalServiceService } from 'src/app/services/gloabal-service.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent {

  constructor(
    private _alertService: AlertService,
    private _kycService: KycService,
    protected _globalService: GloabalServiceService
  ) { }

  hide = true;
  isKycDisplay = false;
  isProgressHidden = true;
  identifiant = "";
  kycData: any = null;

  // matcher
  matcher = new ErrorStateMatcher();

  // control
  idControl = new FormControl('', [Validators.required]);

  hideKycData() {
    this.kycData = null;
    this.isKycDisplay = false;
  }


  valider() {

    this._alertService.closeAlert();
    if (this.idControl.valid) {

      // start loadng
      this.isProgressHidden = false;

      // send request
      this._kycService.getKyc(this.identifiant).subscribe(response => {

        // stop loading
        this.isProgressHidden = true;

        // log response
        console.log(response);

        // check success
        if (response.code == '200') {

          // get data
          this.kycData = response.data[0];

          // display kyc data
          this.isKycDisplay = true;
        }


        // photo ok
        // : 
        // "uploads\\p_photo-1725907705416.png"

      }, (error) => {

        // stop loading
        this.isProgressHidden = true;

        // log error
        console.log('--- ERREUR GET KYC DATA ---');
        console.log(error);

        // show alert
        this._alertService.type = "danger";
        this._alertService.message = error.error.message;
        this._alertService.openAlert();
      });
    }

  }
}
