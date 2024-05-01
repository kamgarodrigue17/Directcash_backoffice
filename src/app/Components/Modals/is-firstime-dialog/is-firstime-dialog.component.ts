import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-is-firstime-dialog',
  templateUrl: './is-firstime-dialog.component.html',
  styleUrls: ['./is-firstime-dialog.component.css']
})
export class IsFirstimeDialogComponent {

  oldpassword = "";
  newpassword = "";
  confirmnewpassword = "";

  constructor() { }

  returnData() {
    return {
      oldpassword: this.oldpassword,
      newpassword: this.newpassword,
      confirmnewpassword: this.confirmnewpassword
    }
  }

}
