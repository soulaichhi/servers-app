import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServersListComponent} from "./pages/servers-list/servers-list.component";
import {ServerDetailComponent} from "./pages/server-detail/server-detail.component";
import {ServerFormComponent} from "./pages/server-form/server-form.component";

const routes: Routes = [
  {path: '', component: ServersListComponent},
  {path: 'server', component: ServerDetailComponent},
  {path: 'server/form', component: ServerFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
