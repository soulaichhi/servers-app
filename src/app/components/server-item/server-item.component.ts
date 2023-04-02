import { Component, Input } from '@angular/core';
import { Server } from '../../models/server.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-item',
  templateUrl: './server-item.component.html',
  styleUrls: ['./server-item.component.scss'],
})
export class ServerItemComponent {
  @Input('server') serverInfo!: Server;

  constructor(private router: Router) {}

  goToServerDetail(id: number) {
    this.router.navigateByUrl(`/${id}`);
  }
}
