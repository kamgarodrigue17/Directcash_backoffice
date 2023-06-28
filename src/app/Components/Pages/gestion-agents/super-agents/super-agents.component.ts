import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddAgentDialogComponent } from 'src/app/Components/Modals/add-agent-dialog/add-agent-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';

@Component({
  selector: 'app-super-agents',
  templateUrl: './super-agents.component.html',
  styleUrls: ['./super-agents.component.css']
})
export class SuperAgentsComponent {

  constructor(public dialog: MatDialog) { }

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
      data: { selected_value: "" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_add_agent_dialog() {
    const add_agent_dialog = this.dialog.open(AddAgentDialogComponent, {});

    add_agent_dialog.afterClosed().subscribe(result => {

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

