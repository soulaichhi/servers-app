import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Server } from '../models/server.model';
import { Site } from '../models/site.model';

@Injectable({
  providedIn: 'root',
})
export class ServersService {
  baseUrl = 'http://localhost:3000/servers';

  constructor(private http: HttpClient) {}

  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(this.baseUrl);
  }

  //
  getServerById(id: string): Observable<Server> {
    return this.http.get<Server>(`${this.baseUrl}/${id}`);
  }

  // updateServerById(serverId: number, serverData: any): Observable<Server> {
  //   return this.http.put<Server>(`${this.url}/${serverId}`, serverData);
  // }

  createServer(server: Server): Observable<Server> {
    return this.http.post<Server>(this.baseUrl, server);
  }

  deleteServer(id: number): Observable<object> {
    return this.http.delete<object>(`${this.baseUrl}/${id}`);
  }
}
