import { OrgModel } from '../../models/org.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'lcu-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {

  public Orgs: Array<OrgModel> = [
    {Value: 'org-one', Label: 'Organization One', Disabled: false},
    {Value: 'org-two', Label: 'Organization Two', Disabled: true},
    {Value: 'org-three', Label: 'Organization Three', Disabled: false},
    {Value: 'org-four', Label: 'Organization Four', Disabled: false},
    {Value: 'org-five', Label: 'Organization Five', Disabled: true},
    {Value: 'org-six', Label: 'Organization Six', Disabled: false},
    {Value: 'org-seven', Label: 'Organization Seven', Disabled: false}
  ];

  /**
   * property for reactive form
   */
  public Form: FormGroup;

  /**
   * property when an unathorized org is selected
   */
  public UnathorizedSelected: OrgModel;

  /**
   * Access UsernameInput field
   */
  public get OrgControl(): AbstractControl {
    return this.Form.get('orgControl');
  }

  constructor() {
    this.UnathorizedSelected = null;
  }

  ngOnInit() {
    this.setupForm();
  }

  /**
   * Setup the reactive form
   */
  protected setupForm(): void {
    this.Form = new FormGroup({
      orgControl: new FormControl('')
    });

    this.onChanges();
  }

  /**
   * On form changes
   */
  protected onChanges(): void {
    this.OrgControl.valueChanges.subscribe((val: OrgModel) => {
      if (val.Disabled) {
        this.UnathorizedSelected = val;
      } else {
        this.UnathorizedSelected = null;
      }
    });
  }

}
