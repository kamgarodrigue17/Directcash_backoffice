import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Merchant } from 'src/app/modal/merchant';
import { DatetimeService } from 'src/app/services-v2/datetime/datetime.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';

@Component({
  selector: 'app-distributeur-dialog',
  templateUrl: './distributeur-dialog.component.html',
  styleUrls: ['./distributeur-dialog.component.css']
})
export class DistributeurDialogComponent {

  merchants: Merchant[] = [];
  merchant: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private merchantService: SuperAgentService,
    protected _datetimeService: DatetimeService
  ) {
    this.merchant = JSON.parse(JSON.stringify(this.data.element));
    this.merchant.adminId = localStorage.getItem('id');
    this.merchant.id = data.element.MerchantID
  }

  mode = this.data.mode;

  ngOnInit() {
    console.log(this.merchant);
  }

}
