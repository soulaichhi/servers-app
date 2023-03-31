import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerItemComponent } from './components/server-item/server-item.component';
import { ServersListComponent } from './pages/servers-list/servers-list.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import {ButtonModule} from "primeng/button";
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [
    AppComponent,
    ServerItemComponent,
    ServersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
