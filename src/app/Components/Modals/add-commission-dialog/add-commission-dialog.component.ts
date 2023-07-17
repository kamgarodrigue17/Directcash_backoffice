import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommissionService } from 'src/app/services/commission/commission.service';

@Component({
  selector: 'app-add-commission-dialog',
  templateUrl: './add-commission-dialog.component.html',
  styleUrls: ['./add-commission-dialog.component.css']
})
export class AddCommissionDialogComponent {
  comissionm:any={};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,commissionService:CommissionService){
    this.comissionm=this.data.element
  }
 
  mode = this.data.mode;

}
