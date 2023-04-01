import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServersListComponent} from "./pages/servers-list/servers-list.component";
import {ServerDetailComponent} from "./pages/server-detail/server-detail.component";

const routes: Routes = [
  {path: '', component: ServersListComponent},
  {path: 'server', component: ServerDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
