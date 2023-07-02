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
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


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
import { TransactionMydirectcashComponent } from './Components/Pages/gestion-clients/transaction-mydirectcash/transaction-mydirectcash.component';
import { ShowTransMydirectcashDialogComponent } from './Components/Modals/show-trans-mydirectcash-dialog/show-trans-mydirectcash-dialog.component';
import { ApprovisionerAgenceComponent } from './Components/Pages/gestion-monnaie/approvisioner-agence/approvisioner-agence.component';
import { ValiderApprovisionnementComponent } from './Components/Pages/gestion-monnaie/valider-approvisionnement/valider-approvisionnement.component';
import { ApprovisionnerAgenceDialogComponent } from './Components/Modals/approvisionner-agence-dialog/approvisionner-agence-dialog.component';
import { CrediterSuperAgentComponent } from './Components/Pages/gestion-monnaie/crediter-super-agent/crediter-super-agent.component';
import { ValiderCrediterSuperAgentComponent } from './Components/Pages/gestion-monnaie/valider-crediter-super-agent/valider-crediter-super-agent.component';
import { ValiderRechargeComponent } from './Components/Pages/gestion-monnaie/valider-recharge/valider-recharge.component';
import { GestionMonnaieShowInformationDialogComponent } from './Components/Modals/gestion-monnaie-show-information-dialog/gestion-monnaie-show-information-dialog.component';
import { CreationMonnaieComponent } from './Components/Pages/gestion-monnaie/creation-monnaie/creation-monnaie.component';
import { NotifierRechargeDialogComponent } from './Components/Modals/notifier-recharge-dialog/notifier-recharge-dialog.component';
import { CommisionParServiceComponent } from './Components/Pages/tarifaire/commision-par-service/commision-par-service.component';
import { AddCommissionDialogComponent } from './Components/Modals/add-commission-dialog/add-commission-dialog.component';
import { GrilleTransfertArgentDirectcashComponent } from './Components/Pages/tarifaire/grille-transfert-argent-directcash/grille-transfert-argent-directcash.component';
import { ConfirmationDialogComponent } from './Components/Modals/confirmation-dialog/confirmation-dialog.component';

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
    BlockAccountDialogComponent,
    TransactionMydirectcashComponent,
    ShowTransMydirectcashDialogComponent,
    ApprovisionerAgenceComponent,
    ValiderApprovisionnementComponent,
    ApprovisionnerAgenceDialogComponent,
    CrediterSuperAgentComponent,
    ValiderCrediterSuperAgentComponent,
    ValiderRechargeComponent,
    GestionMonnaieShowInformationDialogComponent,
    CreationMonnaieComponent,
    NotifierRechargeDialogComponent,
    CommisionParServiceComponent,
    AddCommissionDialogComponent,
    GrilleTransfertArgentDirectcashComponent,
    ConfirmationDialogComponent
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
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
