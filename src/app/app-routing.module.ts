import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './Components/connexion/connexion.component';
import { DashboardComponent } from './Components/Pages/dashboard/dashboard.component';
import { AgentsComponent } from './Components/Pages/gestion-agents/agents/agents.component';
import { SuperAgentsComponent } from './Components/Pages/gestion-agents/super-agents/super-agents.component';

const routes: Routes = [
  {path : '', component: ConnexionComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'gestion-agents/agents', component: AgentsComponent},
  {path: 'gestion-agents/super-agents', component: SuperAgentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
