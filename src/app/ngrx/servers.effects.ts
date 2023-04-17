import { Injectable } from '@angular/core';
import { ServersService } from '../services/servers.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  GetAllServersActionError,
  GetAllServersActionSuccess,
  ServersActionsTypes,
} from './servers.actions';

@Injectable()
export class ServersEffects {
  getAllServersEffect: Observable<Action> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ServersActionsTypes.GET_ALL_SERVERS),
      mergeMap((action) => {
        return this.serversService.getServers().pipe(
          map((servers) => new GetAllServersActionSuccess(servers)),
          catchError((err) => of(new GetAllServersActionError(err)))
        );
      })
    )
  );

  constructor(
    private serversService: ServersService,
    private effectActions: Actions
  ) {}
}
