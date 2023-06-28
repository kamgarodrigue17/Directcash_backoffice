import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-agent-dialog',
  templateUrl: './add-agent-dialog.component.html',
  styleUrls: ['./add-agent-dialog.component.css']
})
export class AddAgentDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: NgForm){}

}
