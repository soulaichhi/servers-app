import { Server } from '../models/server.model';
import { ServersActions, ServersActionsTypes } from './servers.actions';
import { Action } from '@ngrx/store';

export enum ServersStateEnum {
  LOADING = 'Loading',
  LOADED = 'Loaded',
  Error = 'Error',
  INITIAL = 'Initial',
}

export interface ServersState {
  servers: Server[];
  errorMessage: string;
  dataState: ServersStateEnum;
}

const initialState: ServersState = {
  servers: [],
  errorMessage: '',
  dataState: ServersStateEnum.INITIAL,
};

export function ServersReducer(
  state: ServersState = initialState,
  action: Action
): ServersState {
  switch (action.type) {
    case ServersActionsTypes.GET_ALL_SERVERS:
      return { ...state, dataState: ServersStateEnum.LOADING };
    case ServersActionsTypes.GET_ALL_SERVERS_SUCCESS:
      return {
        ...state,
        dataState: ServersStateEnum.LOADED,
        servers: (<ServersActions>action).payload,
      };
    case ServersActionsTypes.GET_ALL_SERVERS_ERROR:
      return {
        ...state,
        dataState: ServersStateEnum.Error,
        errorMessage: (<ServersActions>action).payload,
      };
    default:
      return { ...state };
  }
}
