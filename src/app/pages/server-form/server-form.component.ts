import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Server } from '../../models/server.model';
import { Location } from '@angular/common';
import { ServersService } from '../../services/servers.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.scss'],
})
export class ServerFormComponent implements OnInit, OnDestroy {
  serverForm!: FormGroup;
  isSubmitted = false;
  endSubs$: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private serverService: ServersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  get sites(): FormArray {
    return this.serverForm.get('sites') as FormArray;
  }

  ngOnInit() {
    this.serverForm = this.fb.group({
      name: '',
      ipAddress: '',
      sites: this.fb.array([]),
    });
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  newSite(): FormGroup {
    return this.fb.group({
      name: '',
      domainName: '',
      ipAddress: '',
      active: false,
    });
  }

  addSites() {
    this.sites.push(this.newSite());
  }

  removeSite(i: number) {
    this.sites.removeAt(i);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.serverForm.invalid) {
      return;
    }

    //console.log(this.serverForm.value);
    const server: Server = this.serverForm.value;
    //console.log(server);

    this._addServer(server);
  }

  goBack() {
    this.location.back();
  }

  private _addServer(server: Server) {
    this.serverService
      .createServer(server)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(
        (server) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Server',
            detail: `The ${server.name} was Added`,
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error ${error.status}`,
          });
        }
      );
  }
}
