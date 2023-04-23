import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Server } from '../models/server.model';
import { ServersService } from './servers.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private servers = new BehaviorSubject<Server[]>([]);
  servers$ = this.servers.asObservable();

  constructor(private serverService: ServersService) {}

  search(textSearch: string) {
    this.serverService.getServers().subscribe((servers) => {
      const filteredServers = servers.filter((s) =>
        s.name?.includes(textSearch)
      );
      this.servers.next(filteredServers);
    });
  }
}
