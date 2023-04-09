import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Server } from '../../models/server.model';
import { Location } from '@angular/common';
import { ServersService } from '../../services/servers.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { findIndex, Subject, takeUntil, timer } from 'rxjs';
import { Site } from '../../models/site.model';

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.scss'],
})
export class ServerFormComponent implements OnInit, OnDestroy {
  serverForm!: FormGroup;
  isSubmitted = false;
  endSubs$: Subject<any> = new Subject<any>();
  currentId!: number;
  server!: Server;
  editeMode = false;

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
      name: ['', Validators.required],
      ipAddress: ['', Validators.required],
      sites: this.fb.array([]),
    });
    this._cheEditMode();
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  newSite(): FormGroup {
    return this.fb.group({
      name: [''],
      domainName: [''],
      ipAddress: [
        '',
        Validators.pattern(
          '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
        ),
      ],
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
    const server: Server = this.serverForm.value;
    if (!this.editeMode) {
      if (this.serverForm.invalid) {
        return;
      }

      //console.log(this.serverForm.value);

      //console.log(server);

      this._addServer(server);
    } else {
      this._updateServer(server);
    }
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

  private _updateServer(server: Server) {
    this.serverService.updateServerById(server).subscribe(
      (server) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Server',
          detail: `The ${server.name} was Updated`,
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

  private _cheEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editeMode = true;
        this.currentId = params.id;
        this.serverService.getServerById(params.id).subscribe((server) => {
          this.server = server;
          console.log(server);
          this.server.sites?.map((site: Site) => {
            const sitesForm = this.fb.group({
              name: site.name,
              domainName: site.domainName,
              ipAddress: site.ipAddress,
              active: site.active,
            });

            this.sites.push(sitesForm);
          });
          this.serverForm.patchValue({
            name: this.server.name,
            ipAddress: this.server.ipAddress,
          });
          console.log(this.serverForm.value);
        });
      }
    });
  }
}
