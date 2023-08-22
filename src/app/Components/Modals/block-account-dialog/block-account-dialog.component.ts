import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-block-account-dialog',
  templateUrl: './block-account-dialog.component.html',
  styleUrls: ['./block-account-dialog.component.css']
})
export class BlockAccountDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  object = this.data.object;
  agent = this.data.agent;
}
