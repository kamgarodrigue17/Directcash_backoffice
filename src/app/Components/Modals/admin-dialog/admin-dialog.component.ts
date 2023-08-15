import { Component, Inject ,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HabilitationService } from 'src/app/services/habilitation/habilitation.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent implements OnInit{
  admin:any={
    "userName": "",
    "isActive": "",
    "habilitation": "",
    "lastConnection": "",
    "fullName": "",
    "role": "",
    "company": "",
    "creerLe": "",
    "creerPar": "",
    "modifierPar": "",
    "modifierLe": ""
  };
  habilitions:any[]=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public habilition:HabilitationService,public userService:ValidationService){
    this.admin={...data.data};
    this.admin.adminId=localStorage.getItem("id");
    this.admin.defaultPassword= "",
    this.admin.adminPassword= "",
    console.log(this.admin);

  }
  validate(){
    console.log( this.admin)
    this.admin.adminPassword=`${this.admin.defaultPassword}`;
    this.admin.modifierPar=localStorage.getItem("id");
    this.userService.Edit(this.admin).subscribe(user=>{
      console.log(user);
    },err=>{
      console.log(err);
    });
  }
  mode = this.data.mode;
  now = new Date();
  ngOnInit(): void {
    this.habilition.habilitations().subscribe(habil=>{
      this.habilitions=habil.data;
      console.log( this.habilitions);
    }); 
  }
}
