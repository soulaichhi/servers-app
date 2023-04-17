import { Action } from '@ngrx/store';
import { Server } from '../models/server.model';

export enum ServersActionsTypes {
  GET_ALL_SERVERS = '[Servers] Get All Servers',
  GET_ALL_SERVERS_SUCCESS = '[Servers] Get All Servers Success',
  GET_ALL_SERVERS_ERROR = '[Servers] Get All Servers error',
}

export class GetAllServersAction implements Action {
  type: ServersActionsTypes = ServersActionsTypes.GET_ALL_SERVERS;

  constructor(public payload: any) {}
}

export class GetAllServersActionSuccess implements Action {
  type: ServersActionsTypes = ServersActionsTypes.GET_ALL_SERVERS_SUCCESS;

  constructor(public payload: Server[]) {}
}

export class GetAllServersActionError implements Action {
  type: ServersActionsTypes = ServersActionsTypes.GET_ALL_SERVERS_ERROR;

  constructor(public payload: string) {}
}

export type ServersActions =
  | GetAllServersAction
  | GetAllServersActionSuccess
  | GetAllServersActionError;
