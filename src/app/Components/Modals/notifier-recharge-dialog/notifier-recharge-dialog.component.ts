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
  data: any;
  data_copy: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data1: any) {
    this.data = data1;
    this.data.userId = localStorage.getItem("id");
    this.data.password = "";
    this.data.amount = `${data1.plafond}`;
    this.data.isMydirectCash = "0"
    this.data_copy = JSON.parse(JSON.stringify(data1));
    console.log(this.data)

  }
  @ViewChild("form") form!: NgForm;
  valid() {
    this.data_copy.password = '12345';
    this.data.amount = this.data_copy.plafond;
    return this.data;

  }

}

