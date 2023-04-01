import {Component, OnInit} from '@angular/core';
import {ServersService} from "../../services/servers.service";
import {Server} from "../../models/server.model";

@Component({
  selector: 'app-servers-list',
  templateUrl: './servers-list.component.html',
  styleUrls: ['./servers-list.component.scss']
})
export class ServersListComponent implements OnInit{
  serversList: Server[] = [];

  constructor(private serversService: ServersService) {
  }
  ngOnInit() {
    this._getServersList();
  }

  private _getServersList(){
    return this.serversService.getServers().subscribe(response =>{
      this.serversList = response;
    })
  }



}
