import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-information-rapport-transaction-directcash',
  templateUrl: './show-information-rapport-transaction-directcash.component.html',
  styleUrls: ['./show-information-rapport-transaction-directcash.component.css']
})
export class ShowInformationRapportTransactionDirectcashComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

}
