import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddAgentDialogComponent } from 'src/app/Components/Modals/add-agent-dialog/add-agent-dialog.component';
import { BlockAccountDialogComponent } from 'src/app/Components/Modals/block-account-dialog/block-account-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent {

  constructor(public dialog: MatDialog, private router: Router) { }
  selected_value: string = "";
  add_agent_form!: NgForm;

  displayedColumns: string[] = ['Nom', 'Solde (XAF)', 'Agence', 'Merchant', 'N° IMEI', 'Actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_export_dialog() {
    const export_dialog = this.dialog.open(ExportComponent, {
      data: { selected_value: this.selected_value, title: "des Agents" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  go_to_add_page(){
this.router.navigateByUrl("gestion-agents/agents/ajouter");
  }

  open_add_agent_dialog(mode: string) {
    const add_agent_dialog = this.dialog.open(AddAgentDialogComponent, {
      data:{
        nom:'',
        merchant:'',
        imei: '',
        agence: '',
        contribuable: '',
        mode: mode
      }
    });

    add_agent_dialog.afterClosed().subscribe(result => {
      this.add_agent_form = result;
      console.log(this.add_agent_form.value);
    });
  }

  open_block_agent_dialog(object: string) {
    const block_agent_dialog = this.dialog.open(BlockAccountDialogComponent, {
      data:{
        object: object
      }
    });

    block_agent_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

export interface PeriodicElement {
  nom: string;
  solde: number;
  agence: string;
  merchant: string;
  imei: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { nom: "Emmanuel", solde: 10_000_000, agence: 'Agence', merchant: 'Merchant', imei: 'imei' },];
