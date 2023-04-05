import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServersService } from '../../services/servers.service';
import { Server } from '../../models/server.model';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-servers-list',
  templateUrl: './servers-list.component.html',
  styleUrls: ['./servers-list.component.scss'],
})
export class ServersListComponent implements OnInit, OnDestroy {
  serversList: Server[] = [];
  endSubs$: Subject<any> = new Subject<any>();

  constructor(private router: Router, private serverService: ServersService) {}

  ngOnInit() {
    this._getServersList();
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
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
    return this.serverService
      .getServers()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((response) => {
        this.serversList = response;
      });
  }
}
