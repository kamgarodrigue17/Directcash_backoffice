import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Entreprise } from 'src/app/modal/entreprise.model';

@Component({
  selector: 'app-entreprise-dialog',
  templateUrl: './entreprise-dialog.component.html',
  styleUrls: ['./entreprise-dialog.component.css']
})
export class EntrepriseDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  mode = this.data.mode;
  entreprise: Entreprise = this.data.entreprise;

  @ViewChild('form') form!: NgForm

  save() {
    if (this.form.valid) {
      let entreprise!: Entreprise;
      // code ...
    } else {
      // code ...
    }

  }

  ngOnInit() {

  }
}
