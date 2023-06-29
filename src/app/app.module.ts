import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { ConnexionComponent } from './Components/connexion/connexion.component';
import { BaseComponent } from './Components/base/base.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { BasicCardComponent } from './Components/Cards/basic-card/basic-card.component';
import { DashboardComponent } from './Components/Pages/dashboard/dashboard.component';
import { ServiceCardComponent } from './Components/Cards/service-card/service-card.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { AgentsComponent } from './Components/Pages/gestion-agents/agents/agents.component';
import { ExportComponent } from './Components/Modals/export/export.component';
import { AddAgentDialogComponent } from './Components/Modals/add-agent-dialog/add-agent-dialog.component';
import { SuperAgentsComponent } from './Components/Pages/gestion-agents/super-agents/super-agents.component';
import { AddSuperAgentStepOneComponent } from './Components/Pages/gestion-agents/add-super-agent/add-super-agent-step-one/add-super-agent-step-one.component';
import { ClientMydirectcashComponent } from './Components/Pages/gestion-clients/client-mydirectcash/client-mydirectcash.component';
import { AddClientDialogComponent } from './Components/Modals/add-client-dialog/add-client-dialog.component';
import { ShowSuperAgengDialogComponent } from './Components/Modals/show-super-ageng-dialog/show-super-ageng-dialog.component';
import { BlockAccountDialogComponent } from './Components/Modals/block-account-dialog/block-account-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    BaseComponent,
    NavbarComponent,
    SidebarComponent,
    BasicCardComponent,
    DashboardComponent,
    ServiceCardComponent,
    AgentsComponent,
    ExportComponent,
    AddAgentDialogComponent,
    SuperAgentsComponent,
    AddSuperAgentStepOneComponent,
    ClientMydirectcashComponent,
    AddClientDialogComponent,
    ShowSuperAgengDialogComponent,
    BlockAccountDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxScrollTopModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
