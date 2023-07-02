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

const routes: Routes = [
  {path : '', component: ConnexionComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'gestion-agents/agents', component: AgentsComponent},
  {path: 'gestion-agents/super-agents', component: SuperAgentsComponent},
  {path: 'gestion-agents/super-agents/add', component: AddSuperAgentStepOneComponent},
  {path: 'gestion-clients/clients-mydirectcash', component: ClientMydirectcashComponent},
  {path: 'gestion-clients/transactions-mydirectcash', component: TransactionMydirectcashComponent},
  {path: 'gestion-monnaie/approvisionner-agence', component: ApprovisionerAgenceComponent},
  {path: 'gestion-monnaie/approvisionner-agence/valider', component: ValiderApprovisionnementComponent},
  {path: 'gestion-monnaie/crediter-super-agent', component: CrediterSuperAgentComponent},
  {path: 'gestion-monnaie/crediter-super-agent/valider', component: ValiderCrediterSuperAgentComponent},
  {path: 'gestion-monnaie/valider-recharge', component: ValiderRechargeComponent},
  {path: 'gestion-monnaie/creation-monnaie', component: CreationMonnaieComponent},
  {path: 'tarifaire/commission-par-service', component: CommisionParServiceComponent},
  {path: 'tarifaire/grille-transfert-directcash', component: GrilleTransfertArgentDirectcashComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
