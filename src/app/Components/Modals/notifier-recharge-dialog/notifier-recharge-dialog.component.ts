import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlafondService } from 'src/app/services/plafond/plafond.service';

@Component({
  selector: 'app-notifier-recharge-dialog',
  templateUrl: './notifier-recharge-dialog.component.html',
  styleUrls: ['./notifier-recharge-dialog.component.css']
})
export class NotifierRechargeDialogComponent {
   data:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data1: any, public plafon:PlafondService){
    this.data=data1;
    this.data.userId= localStorage.getItem("id");
    this.data.password= "";
    this.data.amount=`${data1.plafond}`;
    this.data.isMydirectCash= "0"
    console.log(this.data)

  }
  @ViewChild("form") form!: NgForm;
  valid(){
    this.data.amount=`${this.data.plafond}`
    console.log(this.data)
    this.plafon.changeplafond(this.data).subscribe(res=>{
      console.log(res)
    })

  }
}
