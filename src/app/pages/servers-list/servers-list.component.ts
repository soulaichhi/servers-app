import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServersService } from '../../services/servers.service';
import { Server } from '../../models/server.model';
import { Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { ServersState, ServersStateEnum } from '../../ngrx/servers.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-servers-list',
  templateUrl: './servers-list.component.html',
  styleUrls: ['./servers-list.component.scss'],
})
export class ServersListComponent implements OnInit, OnDestroy {
  serversList: Server[] = [];
  endSubs$: Subject<any> = new Subject<any>();
  serversState$!: Observable<ServersState>;
  readonly ServersStateEnum = ServersStateEnum;

  constructor(
    private store: Store<any>,
    private router: Router,
    private serverService: ServersService
  ) {}

  ngOnInit() {
    this._getServersList();
    this.serversState$ = this.store.pipe(
      map((state) => state.serversListState)
    );
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  goToServerDetail(id: number) {
    this.router.navigateByUrl(`/${id}`);
  }

  updateServer(serverId: number) {
    this.router.navigateByUrl(`/server/form/${serverId}`);
  }

  removeServer(id: number) {
    this.serverService
      .deleteServer(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(() => {
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
