import { Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
})
export class ExportComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
  // @Inject(MAT_DIALOG_DATA)
  // public data!: DialogData;
}

