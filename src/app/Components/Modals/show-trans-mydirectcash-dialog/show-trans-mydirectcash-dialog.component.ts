import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-trans-mydirectcash-dialog',
  templateUrl: './show-trans-mydirectcash-dialog.component.html',
  styleUrls: ['./show-trans-mydirectcash-dialog.component.css']
})
export class ShowTransMydirectcashDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  element = this.data.element;

  ngOnInit() {
    console.log(this.element);

  }

}
