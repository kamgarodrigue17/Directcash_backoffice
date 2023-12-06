import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HabilitationService } from 'reclamations/habilitation.service';
import { User } from 'src/app/modal/user';
import { FonctionalitesService } from 'src/app/services/fonctionalites/fonctionalites.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-add-profil-dialog',
  templateUrl: './add-profil-dialog.component.html',
  styleUrls: ['./add-profil-dialog.component.css']
})
export class AddProfilDialogComponent  implements OnInit{
  fonctionalites:any={}
  users:any[]=[]
  habilitation:any[]=[];
  datas:any={
    userId:"",
    option:"",
    habilitation:""
}
@ViewChild("form") form!: NgForm;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public adminservice:ValidationService,public habiltaion:HabilitationService,public fonctionalité:FonctionalitesService){
    if (this.data.mode!="add") {
     this.fonctionalites={...data.element};
     console.log(this.fonctionalites)
     this.datas.option=this.fonctionalites.id;
    }

}
addOption(){
  this.datas.habilitation= `${this.datas.habilitation}`;
  console.log(this.datas );
  this.fonctionalité.HabilitationAddOption(this.datas).subscribe(hab => {
    console.log(hab);
    
  });
}
ngOnInit(): void {
  this.adminservice.getAdmin().subscribe(user => {
    this.users = user.data;
    
  });
  this.habiltaion.habilitations().subscribe(hab => {
    this.habilitation = hab.data;
    
  });
}
}
