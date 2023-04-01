import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Server} from "../models/server.model";

@Injectable({
  providedIn: 'root'
})
export class ServersService {


  constructor(private http: HttpClient) { }
  getServers():Observable<Server[]>{
    const url = '../../assets/data/dummy-data.json';
    return this.http.get<Server[]>(url);
  }
}
