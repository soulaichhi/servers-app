import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServersService } from '../../services/servers.service';
import { Server } from '../../models/server.model';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.scss'],
})
export class ServerDetailComponent implements OnInit {
  server!: Server;

  constructor(
    private route: ActivatedRoute,
    private serverService: ServersService
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   const id = params.id;
    //   if (id) {
    //     this._getServer(id);
    //   }
    // });
    this.route.params.subscribe((params) => {
      if (params.id) {
        this._getServer(params.id);
      }
    });
    // this.route.params.subscribe((params) => {
    //   console.log(params);
    // });
  }

  private _getServer(id: string) {
    return this.serverService.getServerById(id).subscribe((server) => {
      this.server = server;
    });
  }
}
