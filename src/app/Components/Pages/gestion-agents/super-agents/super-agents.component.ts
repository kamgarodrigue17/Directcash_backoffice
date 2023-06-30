import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddAgentDialogComponent } from 'src/app/Components/Modals/add-agent-dialog/add-agent-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { ShowSuperAgengDialogComponent } from 'src/app/Components/Modals/show-super-ageng-dialog/show-super-ageng-dialog.component';

@Component({
  selector: 'app-super-agents',
  templateUrl: './super-agents.component.html',
  styleUrls: ['./super-agents.component.css']
})
export class SuperAgentsComponent {

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = ['Nom', 'Email', 'Téléphone', 'Région', 'Date de création', 'Actions'];
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
      data: { selected_value: "", title: "des super - Agents" }
    });

    export_dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open_show_super_agent_dialog(mode: string) {
    const show_super_agent_dialog = this.dialog.open(ShowSuperAgengDialogComponent, {
      data:{
        mode: mode
      }
    });

    show_super_agent_dialog.afterClosed().subscribe(result => {

    });
  }

}

export interface PeriodicElement {
  nom: string;
  email: string;
  tel: string;
  region: string;
  created_at: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { nom: "Emmanuel", email: "exemple@gmail.com", tel: '670630558', region: 'Region', created_at: '10/10/2012 14:30' },];

