import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerItemComponent } from './components/server-item/server-item.component';
import { ServersListComponent } from './pages/servers-list/servers-list.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import {ButtonModule} from "primeng/button";
import { ServerDetailComponent } from './pages/server-detail/server-detail.component';
import { PanelModule } from 'primeng/panel';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { InputSwitchModule } from 'primeng/inputswitch';
import {HttpClientModule} from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    ServerItemComponent,
    ServersListComponent,
    ServerDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    PanelModule,
    InputSwitchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
