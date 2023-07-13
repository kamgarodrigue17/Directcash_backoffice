import { Component, ViewChild,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { AddAgentDialogComponent } from 'src/app/Components/Modals/add-agent-dialog/add-agent-dialog.component';
import { ExportComponent } from 'src/app/Components/Modals/export/export.component';
import { ShowSuperAgengDialogComponent } from 'src/app/Components/Modals/show-super-ageng-dialog/show-super-ageng-dialog.component';
import { Merchant } from 'src/app/modal/merchant';
import { AgentServiceService } from 'src/app/services/agent/agent-service.service';
import { SuperAgentService } from 'src/app/services/superAgent/super-agent.service';

@Component({
  selector: 'app-super-agents',
  templateUrl: './super-agents.component.html',
  styleUrls: ['./super-agents.component.css']
})
export class SuperAgentsComponent implements OnInit {
  displayedColumns: string[] =[];
  ELEMENT_DATA: Merchant[] = [
];
dataSource!:MatTableDataSource<Merchant, MatTableDataSourcePaginator>


  constructor(public dialog: MatDialog,public AgentService: AgentServiceService) {
  
    
  }



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
ngOnInit(): void {
  this.AgentService.Agents("Merchants").subscribe(agents=>{
    this.ELEMENT_DATA =agents.data;
    console.log(this.ELEMENT_DATA);
    this.displayedColumns=  ['Nom', 'Solde', 'Agence', 'MerchantName', 'N° IMEI','Date de création', 'Actions'];
    this.dataSource=new MatTableDataSource<Merchant>(this.ELEMENT_DATA);
  
    
  });
  this.displayedColumns= ['Nom', 'Solde', 'Agence', 'MerchantName', 'N° IMEI','Date de création', 'Actions'];
  this.dataSource=new MatTableDataSource<Merchant>(this.ELEMENT_DATA);
}
    
}




  
