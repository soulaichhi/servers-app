import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../services/servers.service';
import { Server } from '../../models/server.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servers-list',
  templateUrl: './servers-list.component.html',
  styleUrls: ['./servers-list.component.scss'],
})
export class ServersListComponent implements OnInit {
  serversList: Server[] = [];

  constructor(private router: Router, private serverService: ServersService) {}

  ngOnInit() {
    this._getServersList();
  }

  goToServerDetail(id: number) {
    this.router.navigateByUrl(`/${id}`);
  }

  removeServer(id: number) {
    this.serverService.deleteServer(id).subscribe(() => {
      this._getServersList();
    });
  }

  private _getServersList() {
    return this.serverService.getServers().subscribe((response) => {
      this.serversList = response;
    });
  }
}
