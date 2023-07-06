import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './Components/connexion/connexion.component';
import { DashboardComponent } from './Components/Pages/dashboard/dashboard.component';
import { AgentsComponent } from './Components/Pages/gestion-agents/agents/agents.component';
import { SuperAgentsComponent } from './Components/Pages/gestion-agents/super-agents/super-agents.component';
import { AddSuperAgentStepOneComponent } from './Components/Pages/gestion-agents/add-super-agent/add-super-agent-step-one/add-super-agent-step-one.component';
import { ClientMydirectcashComponent } from './Components/Pages/gestion-clients/client-mydirectcash/client-mydirectcash.component';
import { TransactionMydirectcashComponent } from './Components/Pages/gestion-clients/transaction-mydirectcash/transaction-mydirectcash.component';
import { ApprovisionerAgenceComponent } from './Components/Pages/gestion-monnaie/approvisioner-agence/approvisioner-agence.component';
import { ValiderApprovisionnementComponent } from './Components/Pages/gestion-monnaie/valider-approvisionnement/valider-approvisionnement.component';
import { CrediterSuperAgentComponent } from './Components/Pages/gestion-monnaie/crediter-super-agent/crediter-super-agent.component';
import { ValiderCrediterSuperAgentComponent } from './Components/Pages/gestion-monnaie/valider-crediter-super-agent/valider-crediter-super-agent.component';
import { ValiderRechargeComponent } from './Components/Pages/gestion-monnaie/valider-recharge/valider-recharge.component';
import { CreationMonnaieComponent } from './Components/Pages/gestion-monnaie/creation-monnaie/creation-monnaie.component';
import { CommisionParServiceComponent } from './Components/Pages/tarifaire/commision-par-service/commision-par-service.component';
import { GrilleTransfertArgentDirectcashComponent } from './Components/Pages/tarifaire/grille-transfert-argent-directcash/grille-transfert-argent-directcash.component';
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
import { MouchardComponent } from './Components/Pages/administration/mouchard/mouchard.component';
import { GestionHabilitationComponent } from './Components/Pages/administration/gestion-habilitation/gestion-habilitation.component';
import { AdminPlateformeComponent } from './Components/Pages/administration/admin-plateforme/admin-plateforme.component';
import { GestionFonctionnaliteComponent } from './Components/Pages/administration/gestion-fonctionnalite/gestion-fonctionnalite.component';
import { DetailFonctionnaliteComponent } from './Components/Pages/administration/detail-fonctionnalite/detail-fonctionnalite.component';
import { AgenceComponent } from './Components/Pages/administration/agence/agence.component';
import { EtapeValidationComponent } from './Components/Pages/administration/etape-validation/etape-validation.component';
import { ChangerMotDePasseComponent } from './Components/Pages/administration/changer-mot-de-passe/changer-mot-de-passe.component';
import { DistributeurComponent } from './Components/Pages/gestion-agents/distributeur/distributeur.component';
import { TopAgentsComponent } from './Components/Pages/gestion-agents/top-agents/top-agents.component';

const routes: Routes = [
  {path : '', component: ConnexionComponent},

  // DASBOARD ==============================
  {path: 'dashboard', component: DashboardComponent},

  // GESTION DES AGENTS ==============================
  {path: 'gestion-agents/agents', component: AgentsComponent},
  {path: 'gestion-agents/agents/ajouter', component: AddAgentComponent},
  {path: 'gestion-agents/super-agents', component: SuperAgentsComponent},
  {path: 'gestion-agents/super-agents/add', component: AddSuperAgentStepOneComponent},
  {path: 'gestion-agents/distributeurs', component: DistributeurComponent},
  {path: 'gestion-agents/top-agents', component: TopAgentsComponent},

  // GESTION DES CLIENTS ==============================
  {path: 'gestion-clients/clients-mydirectcash', component: ClientMydirectcashComponent},
  {path: 'gestion-clients/transactions-mydirectcash', component: TransactionMydirectcashComponent},

  // GESTION DE LA MONNAIE ==============================
  {path: 'gestion-monnaie/approvisionner-agence', component: ApprovisionerAgenceComponent},
  {path: 'gestion-monnaie/approvisionner-agence/valider', component: ValiderApprovisionnementComponent},
  {path: 'gestion-monnaie/crediter-super-agent', component: CrediterSuperAgentComponent},
  {path: 'gestion-monnaie/crediter-super-agent/valider', component: ValiderCrediterSuperAgentComponent},
  {path: 'gestion-monnaie/valider-recharge', component: ValiderRechargeComponent},
  {path: 'gestion-monnaie/creation-monnaie', component: CreationMonnaieComponent},

  // TARIFAIRE ==============================
  {path: 'tarifaire/commission-par-service', component: CommisionParServiceComponent},
  {path: 'tarifaire/grille-transfert-directcash', component: GrilleTransfertArgentDirectcashComponent},
  {path: 'tarifaire/grille-transfert-mydirectcash', component: GrilleTransfertArgentMydirectcashComponent},
  {path: 'tarifaire/grille-tarifaire-paiement-facture', component: GrilleTarifairePaiementFactureComponent},
  {path: 'tarifaire/grille-tarifaire-paiement-marchand', component: GrilleTarifairePaiementMarchandComponent},

  // RAPPORTS ==============================
  {path: 'rapports/airtime', component: RapportAirtimeComponent},
  {path: 'rapports/momo-om', component: RapportMomoOmComponent},
  {path: 'rapports/transfert-argent-directcash', component: RapportTransfertArgentDirectcashComponent},
  {path: 'rapports/paiement-facture', component: RapportPaiementFactureComponent},
  {path: 'rapports/paiement-marchand', component: RapportPaiementMarchandComponent},
  {path: 'rapports/recharges-mydirectcash-online', component: RapportRechargeMydirectcashOnlineComponent},
  {path: 'rapports/recharges-mydirectcash-pos', component: RapportRechargeMydirectcashPosComponent},

  // ADMINISTRATION ==============================
  {path: 'administration/agences', component: AgenceComponent},
  {path: 'administration/etapes-validation', component: EtapeValidationComponent},
  {path: 'administration/gestion-reclamations', component: GestionReclamationsComponent},
  {path: 'administration/mouchard', component: MouchardComponent},
  {path: 'administration/gestion-habilitations', component: GestionHabilitationComponent},
  {path: 'administration/admins', component: AdminPlateformeComponent},
  {path: 'administration/gestion-fonctionnalites', component: GestionFonctionnaliteComponent},
  {path: 'administration/gestion-fonctionnalites/detail', component: DetailFonctionnaliteComponent},
  {path: 'administration/changer-mot-de-passe', component: ChangerMotDePasseComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
