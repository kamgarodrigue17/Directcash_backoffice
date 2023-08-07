import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddAgentDialogComponent } from 'src/app/Components/Modals/add-agent-dialog/add-agent-dialog.component';
import { BlockAccountDialogComponent } from 'src/app/Components/Modals/block-account-dialog/block-account-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { Agent } from 'src/app/modal/agent';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  displayedColumns: string[] = [];
  ELEMENT_DATA: Agent[] = [
  ];
  dataSource!: MatTableDataSource<Agent, MatTableDataSourcePaginator>

  constructor(public dialog: MatDialog, private router: Router, public AgentService: AgentServiceService, private _snackBar: MatSnackBar) {

  }
  selected_value: string = "";
  add_agent_form!: NgForm;
  snackbar_message!: string;

  //   displayedColumns: string[] =
  //  dataSource = new MatTableDataSource<Agent>(this.ELEMENT_DATA);

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

  go_to_add_page() {
    // this.router.navigateByUrl("gestion-agents/agents/ajouter");
  }

  open_add_agent_dialog(mode: string) {
    // const add_agent_dialog = this.dialog.open(AddAgentDialogComponent, {
    //   data: {
    //     nom: '',
    //     merchant: '',
    //     imei: '',
    //     agence: '',
    //     contribuable: '',
    //     location: '',
    //     solde: '',
    //     region: '',
    //     tel: '',
    //     CNI: '',
    //     mode: mode
    //   }
    // });
  }
  open_add_agent_dialog(mode: string, element: any) {

    // const add_agent_dialog = this.dialog.open(AddAgentDialogComponent, {
    //   data: {
    //     element:element,
    //     mode: mode
    //   }
    // });


    // add_agent_dialog.afterClosed().subscribe(result => {
    //   this.add_agent_form = result;
    //   console.log(this.add_agent_form.value);
    // });
  }

  open_block_agent_dialog(object: string) {
    const block_agent_dialog = this.dialog.open(BlockAccountDialogComponent, {
      data: {
        object: object
      }
    });

    block_agent_dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


  open_snackbar(agent: string) {
    this.snackbar_message = "Le mot de passe de " + agent + " a été rénitialisé à 0000";
    let snackBarRef = this._snackBar.open(this.snackbar_message, 'Ok');

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }
  ngOnInit(): void {
    this.AgentService.Agents("Agents").subscribe(agents => {
      this.ELEMENT_DATA = agents.data;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['Nom', 'Solde (XAF)', 'Agence', 'Merchant', 'N° IMEI', 'Actions'];
      this.dataSource = new MatTableDataSource<Agent>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });


    this.displayedColumns = ['Nom', 'Solde (XAF)', 'Agence', 'Merchant', 'N° IMEI', 'Actions'];
    this.dataSource = new MatTableDataSource<Agent>(this.ELEMENT_DATA);
  }
}




