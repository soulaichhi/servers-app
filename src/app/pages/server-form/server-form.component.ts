import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.scss'],
})
export class ServerFormComponent {
  serverForm: FormGroup;
  editMode = false;

  constructor(private fb: FormBuilder) {
    this.serverForm = this.fb.group({
      serverName: '',
      serverIpAddress: '',
      sites: this.fb.array([]),
    });
  }

  get sites(): FormArray {
    return this.serverForm.get('sites') as FormArray;
  }

  newSite(): FormGroup {
    return this.fb.group({
      siteName: '',
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
    console.log(this.serverForm.value);
  }

  goBack() {}
}
