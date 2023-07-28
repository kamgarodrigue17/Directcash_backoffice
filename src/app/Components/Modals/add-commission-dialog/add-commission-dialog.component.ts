import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommissionService } from 'src/app/services/commission/commission.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-commission-dialog',
  templateUrl: './add-commission-dialog.component.html',
  styleUrls: ['./add-commission-dialog.component.css']
})
export class AddCommissionDialogComponent {
  comissionm:any={};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public commissionService:CommissionService){
    this.comissionm=this.data.element
  }
  @ViewChild("form") form!: NgForm;
  mode = this.data.mode;
  edit(){
console.log(this.form.value.valeur);
    //this.comissionm.valeur=6;

    console.log(this.comissionm)
    this.commissionService.editcommissions(this.comissionm).subscribe(res=>{
      console.log(res);
    })
  }

}
