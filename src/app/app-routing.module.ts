import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './Components/connexion/connexion.component';
import { BaseComponent } from './Components/base/base.component';

const routes: Routes = [
  {path : '', component: ConnexionComponent},
  {path: 'base', component: BaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
