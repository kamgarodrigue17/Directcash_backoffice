import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTreeModule } from '@angular/material/tree';


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
import { ShowSuperAgengDialogComponent } from './Components/Pages/show-super-ageng-dialog/show-super-ageng-dialog.component';
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
import { GrilleTransfertArgentDirectcashInternationaleComponent } from './Components/Pages/tarifaire/grille-transfert-argent-directcash-internationale/grille-transfert-argent-directcash-internationale.component';
import { GrilleTransfertArgentPaiementFactureEneoComponent } from './Components/Pages/tarifaire/grille-transfert-argent-paiement-facture-eneo/grille-transfert-argent-paiement-facture-eneo.component';
import { GrilleTransfertArgentPaiementFactureCamwaterComponent } from './Components/Pages/tarifaire/grille-transfert-argent-paiement-facture-camwater/grille-transfert-argent-paiement-facture-camwater.component';
import { ConfirmationDialogComponent } from './Components/Modals/confirmation-dialog/confirmation-dialog.component';
import { GrilleTransfertDirectcashDialogComponent } from './Components/Modals/grille-transfert-directcash-dialog/grille-transfert-directcash-dialog.component';
import { GrilleTransfertArgentMydirectcashComponent } from './Components/Pages/tarifaire/grille-transfert-argent-mydirectcash/grille-transfert-argent-mydirectcash.component';
import { GrilleTarifairePaiementFactureComponent } from './Components/Pages/tarifaire/grille-tarifaire-paiement-facture/grille-tarifaire-paiement-facture.component';
import { GrilleTarifairePaiementMarchandComponent } from './Components/Pages/tarifaire/grille-tarifaire-paiement-marchand/grille-tarifaire-paiement-marchand.component';
import { RapportAirtimeComponent } from './Components/Pages/rapport/rapport-airtime/rapport-airtime.component';
import { AddAgentComponent } from './Components/Pages/gestion-agents/add-agent/add-agent.component';
import { RapportMomoOmComponent } from './Components/Pages/rapport/rapport-momo-om/rapport-momo-om.component';
import { RapportTransfertArgentDirectcashComponent } from './Components/Pages/rapport/rapport-transfert-argent-directcash/rapport-transfert-argent-directcash.component';
import { RapportPaiementFactureComponent } from './Components/Pages/rapport/rapport-paiement-facture/rapport-paiement-facture.component';
import { RapportPaiementMarchandComponent } from './Components/Pages/rapport/rapport-paiement-marchand/rapport-paiement-marchand.component';
import { RapportRechargeMydirectcashOnlineComponent } from './Components/Pages/rapport/rapport-recharge-mydirectcash-online/rapport-recharge-mydirectcash-online.component';
import { RapportRechargeMydirectcashPosComponent } from './Components/Pages/rapport/rapport-recharge-mydirectcash-pos/rapport-recharge-mydirectcash-pos.component';
import { GestionReclamationsComponent } from './Components/Pages/administration/gestion-reclamations/gestion-reclamations.component';
import { ShowReclamationDialogComponent } from './Components/Modals/show-reclamation-dialog/show-reclamation-dialog.component';
import { MouchardComponent } from './Components/Pages/administration/mouchard/mouchard.component';
import { GestionHabilitationComponent } from './Components/Pages/administration/gestion-habilitation/gestion-habilitation.component';
import { ShowInformationRapportTransactionDirectcashComponent } from './Components/Modals/show-information-rapport-transaction-directcash/show-information-rapport-transaction-directcash.component';
import { PasswordDialogComponent } from './Components/Modals/password-dialog/password-dialog.component';
import { HabilitationDialogComponent } from './Components/Modals/habilitation-dialog/habilitation-dialog.component';
import { AdminPlateformeComponent } from './Components/Pages/administration/admin-plateforme/admin-plateforme.component';
import { AdminDialogComponent } from './Components/Modals/admin-dialog/admin-dialog.component';
import { GestionFonctionnaliteComponent } from './Components/Pages/administration/gestion-fonctionnalite/gestion-fonctionnalite.component';
import { DetailFonctionnaliteComponent } from './Components/Pages/administration/detail-fonctionnalite/detail-fonctionnalite.component';
import { AddProfilDialogComponent } from './Components/Modals/add-profil-dialog/add-profil-dialog.component';
import { EtapeValidationComponent } from './Components/Pages/administration/etape-validation/etape-validation.component';
import { AgenceComponent } from './Components/Pages/administration/agence/agence.component';
import { AgenceDialogComponent } from './Components/Modals/agence-dialog/agence-dialog.component';
import { EtapeValidationDialogComponent } from './Components/Modals/etape-validation-dialog/etape-validation-dialog.component';
import { ChangerMotDePasseComponent } from './Components/Pages/administration/changer-mot-de-passe/changer-mot-de-passe.component';
import { DistributeurComponent } from './Components/Pages/gestion-agents/distributeur/distributeur.component';
import { TopAgentsComponent } from './Components/Pages/gestion-agents/top-agents/top-agents.component';
import { HttpInterceptore } from './interceptor/http.interceptor';
import { AddDistributeurComponent } from './Components/Pages/gestion-agents/add-distributeur/add-distributeur.component';
import { AddTopAgentComponent } from './Components/Pages/gestion-agents/add-top-agent/add-top-agent.component';
import { RequeteEmissionDialogComponent } from './Components/Modals/requete-emission-dialog/requete-emission-dialog.component';

import { RapportPaiementFactureEneoComponent } from './Components/Pages/rapport/rapport-paiement-facture-eneo/rapport-paiement-facture-eneo.component';
import { RapportPaiementFactureCamwaterComponent } from './Components/Pages/rapport/rapport-paiement-facture-camwater/rapport-paiement-facture-camwater.component';
import { EntrepriseComponent } from './Components/Pages/administration/entreprise/entreprise.component';
import { EntrepriseDialogComponent } from './Components/Modals/entreprise-dialog/entreprise-dialog.component';
import { RequeteEmissionComponent } from './Components/Pages/gestion-monnaie/requete-emission/requete-emission.component';
import { RapportCollecteFondComponent } from './Components/Pages/rapport/rapport-collecte-fond/rapport-collecte-fond.component';
import { StockDirectcashDialogComponent } from './Components/Modals/stock-directcash-dialog/stock-directcash-dialog.component';
import { RechargeOnlineComponent } from './Components/Pages/gestion-clients/recharge-online/recharge-online.component';
import { IsFirstimeDialogComponent } from './Components/Modals/is-firstime-dialog/is-firstime-dialog.component';
import { DistributeurDialogComponent } from './Components/Modals/distributeur-dialog/distributeur-dialog.component';
import { NumberFormatterPipe } from './number-formatter.pipe';
import { CustomBadgeComponent } from './Components/custom-badge/custom-badge.component';
import { AlertComponent } from './Components/alert/alert.component';
import { DatePipe } from '@angular/common';
import { KycComponent } from './Components/Pages/kyc/kyc.component';
import { ImageSelectorComponent } from './Components/image-selector/image-selector.component';
import {MatRadioModule} from '@angular/material/radio';
import { ImageViewerComponent } from './Components/image-viewer/image-viewer.component';


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
    GrilleTransfertArgentDirectcashInternationaleComponent,
    ConfirmationDialogComponent,
    GrilleTransfertDirectcashDialogComponent,
    GrilleTransfertArgentMydirectcashComponent,
    GrilleTarifairePaiementFactureComponent,
    GrilleTransfertArgentPaiementFactureEneoComponent,
    GrilleTransfertArgentPaiementFactureCamwaterComponent,
    GrilleTarifairePaiementMarchandComponent,
    RapportAirtimeComponent,
    AddAgentComponent,
    RapportMomoOmComponent,
    RapportTransfertArgentDirectcashComponent,
    RapportPaiementFactureComponent,
    RapportPaiementFactureEneoComponent,
    RapportPaiementFactureCamwaterComponent,
    RapportPaiementMarchandComponent,
    RapportRechargeMydirectcashOnlineComponent,
    RapportRechargeMydirectcashPosComponent,
    GestionReclamationsComponent,
    ShowReclamationDialogComponent,
    MouchardComponent,
    GestionHabilitationComponent,
    ShowInformationRapportTransactionDirectcashComponent,
    PasswordDialogComponent,
    HabilitationDialogComponent,
    AdminPlateformeComponent,
    AdminDialogComponent,
    GestionFonctionnaliteComponent,
    DetailFonctionnaliteComponent,
    AddProfilDialogComponent,
    EtapeValidationComponent,
    AgenceComponent,
    AgenceDialogComponent,
    EtapeValidationDialogComponent,
    ChangerMotDePasseComponent,
    DistributeurComponent,
    AddDistributeurComponent,
    TopAgentsComponent,
    AddTopAgentComponent,
    EntrepriseComponent,
    EntrepriseDialogComponent,
    RequeteEmissionComponent,
    RequeteEmissionDialogComponent,
    RapportCollecteFondComponent,
    StockDirectcashDialogComponent,
    RechargeOnlineComponent,
    RequeteEmissionDialogComponent,
    IsFirstimeDialogComponent,
    DistributeurDialogComponent,
    NumberFormatterPipe,
    CustomBadgeComponent,
    AlertComponent,
    KycComponent,
    ImageSelectorComponent,
    ImageViewerComponent
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
    MatDatepickerModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTreeModule,
    MatRadioModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptore,
      multi: true
    },
    { provide: DatePipe },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
