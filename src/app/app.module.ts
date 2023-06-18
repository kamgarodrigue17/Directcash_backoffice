import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ConnexionComponent } from './Components/connexion/connexion.component';
import { BaseComponent } from './Components/base/base.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    BaseComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
