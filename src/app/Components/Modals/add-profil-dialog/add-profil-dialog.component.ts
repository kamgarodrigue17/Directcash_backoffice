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
export class AddProfilDialogComponent implements OnInit {
  habilitation:any;
  option:any={
    "userId":"",
    "option":"",
    "habilitation":""
}

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public fonctionalité:FonctionalitesService) { }

  fonctionnalites: any[] = [];
 
  ngOnInit(): void {
    this.habilitation = JSON.parse(`${localStorage.getItem("currentHabilitation")}`);



    this.fonctionalité.fonctionalites("*").subscribe(habi => {

      this.fonctionnalites = habi.data;
   
    });
    

    console.log('====================================');
    console.log(this.fonctionnalites[0]);
    console.log('====================================');
  }
  addOption(): void {
    this.habilitation = JSON.parse(`${localStorage.getItem("currentHabilitation")}`);
    this.option.userId=localStorage.getItem("id");

    this.option.habilitation=`${this.habilitation.idhabilitation}` ;
console.log(this.option)

    this.fonctionalité.HabilitationAddOption(this.option).subscribe(hab => {
      console.log(hab);
      
    });

   }



/*addOption(){
  this.datas.habilitation= `${this.datas.habilitation}`;
  console.log(this.datas );
  this.fonctionalité.HabilitationAddOption(this.datas).subscribe(hab => {
    console.log(hab);
    
  });
}*/

}
