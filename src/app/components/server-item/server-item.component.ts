import {Component, Input} from '@angular/core';
import {Server} from "../../models/server.model";

@Component({
  selector: 'app-server-item',
  templateUrl: './server-item.component.html',
  styleUrls: ['./server-item.component.scss']
})
export class ServerItemComponent {
  @Input() serverInfo!: Server;

}
