import {Site} from "./site.model";

export class Server{
  id?: number;
  name?: string;
  ipAddress?:string;
  sites?: Site;
}
