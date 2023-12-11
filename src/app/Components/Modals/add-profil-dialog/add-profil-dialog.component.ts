import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-profil-dialog',
  templateUrl: './add-profil-dialog.component.html',
  styleUrls: ['./add-profil-dialog.component.css']
})
export class AddProfilDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  fonctionnalites: any[] = [];

  ngOnInit(): void {
    // on recupere la liste des fonctionnalites
    this.fonctionnalites = JSON.parse(this.data.fonctionnalites);

    console.log('====================================');
    console.log(this.fonctionnalites[0]);
    console.log('====================================');
  }



}
