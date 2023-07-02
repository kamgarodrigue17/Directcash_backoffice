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
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path : '', component: ConnexionComponent},
  {path: 'dashboard', component: DashboardComponent,/*canActivate: [AuthGuard]*/},
  {path: 'gestion-agents/agents', component: AgentsComponent},
  {path: 'gestion-agents/super-agents', component: SuperAgentsComponent},
  {path: 'gestion-agents/super-agents/add', component: AddSuperAgentStepOneComponent},
  {path: 'gestion-clients/clients-mydirectcash', component: ClientMydirectcashComponent},
  {path: 'gestion-clients/transactions-mydirectcash', component: TransactionMydirectcashComponent},
  {path: 'gestion-monnaie/approvisionner-agence', component: ApprovisionerAgenceComponent},
  {path: 'gestion-monnaie/approvisionner-agence/valider-approvisionnement', component: ValiderApprovisionnementComponent},
  {path: 'gestion-monnaie/crediter-super-agent', component: CrediterSuperAgentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
