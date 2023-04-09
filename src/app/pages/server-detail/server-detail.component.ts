import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from '../../services/servers.service';
import { Server } from '../../models/server.model';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.scss'],
})
export class ServerDetailComponent implements OnInit, OnDestroy {
  server!: Server;
  endSubs$: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private serverService: ServersService,
    private router: Router,
    private location: Location
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

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  deleteSite(id: number) {
    this.server.sites?.splice(id - 1, 1);
  }

  goBack() {
    this.location.back();
  }

  editSite(id: number) {
    this.router.navigateByUrl(`/server/form/${id}`);
  }

  private _getServer(id: string) {
    return this.serverService
      .getServerById(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((server) => {
        this.server = server;
      });
  }
}
