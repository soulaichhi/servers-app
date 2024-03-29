import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServersListComponent } from './pages/servers-list/servers-list.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ServerDetailComponent } from './pages/server-detail/server-detail.component';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HttpClientModule } from '@angular/common/http';
import { ServerFormComponent } from './pages/server-form/server-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';
import { TagModule } from 'primeng/tag';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ServersReducer } from './ngrx/servers.reducer';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchServersComponent } from './components/search-servers/search-servers.component';
import { ServersEffects } from './ngrx/servers.effects';

@NgModule({
  declarations: [
    AppComponent,

    ServersListComponent,
    ServerDetailComponent,
    ServerFormComponent,
    HeaderComponent,
    FooterComponent,
    SearchServersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ serversListState: ServersReducer }),
    EffectsModule.forRoot([ServersEffects]),
    StoreDevtoolsModule.instrument(),
    AppRoutingModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    PanelModule,
    InputSwitchModule,
    InputTextModule,
    InputMaskModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    StyleClassModule,
    FormsModule,
    Ng2SearchPipeModule,

    TagModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
