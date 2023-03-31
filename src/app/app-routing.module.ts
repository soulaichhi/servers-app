import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServersListComponent} from "./pages/servers-list/servers-list.component";

const routes: Routes = [
  {path: '', component: ServersListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
