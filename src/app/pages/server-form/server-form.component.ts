import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Server } from '../../models/server.model';
import { Location } from '@angular/common';
import { ServersService } from '../../services/servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.scss'],
})
export class ServerFormComponent implements OnInit {
  serverForm!: FormGroup;
  editMode = false;
  isSubmitted = false;
  serverId!: string;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private serverService: ServersService,
    private route: ActivatedRoute
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
    this._checkEditMode();
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
    console.log(server);
    if (this.editMode) {
      this._updateServer(server);
    } else {
      this._addServer(server);
    }
  }

  goBack() {
    this.location.back();
  }

  private _addServer(server: Server) {
    this.serverService.createServer(server).subscribe();
  }

  private _updateServer(server: Server) {
    this.serverService.updateServerById(server).subscribe();
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.serverId = params.id;
        this.serverService.getServerById(params.id).subscribe((server) => {
          this.serverForm.setValue(server);
        });
      }
    });
  }
}
