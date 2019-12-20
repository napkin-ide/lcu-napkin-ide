import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lcu-marketplace-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class MarketplaceProfileComponent implements OnInit {

  public ProfileOptions: any;
  public ActiveOptionValue: string;
  public EditingForm: boolean;
  public UserEntity: any;
  public ProfileForm: FormGroup;

  constructor() {
    // get user / company from state...
    this.UserEntity = {
      Name: 'Chris P. Bacon',
      CompanyEmail: 'bacon@eggs.com',
      Company: 'EggsRSides LLC',
      CompanyURL: 'www.eggstobacon.yum'
    };
    this.EditingForm = false;
    this.ProfileOptions = [
      { Title: 'My Info', Active: false, Value: 'myInfo' },
      { Title: 'Password', Active: false, Value: 'password' },
      { Title: 'Subscriptions', Active: false, Value: 'subscriptions' }
    ];
    this.SetActiveOption('myInfo');
    this.ProfileForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      CompanyEmail: new FormControl('', Validators.required),
      Company: new FormControl('', Validators.required),
      CompanyURL: new FormControl(''),
    });
    this.ProfileForm.patchValue({
      Name: this.UserEntity.Name,
      CompanyEmail: this.UserEntity.CompanyEmail,
      Company: this.UserEntity.Company,
      CompanyURL: this.UserEntity.CompanyURL
    });
    this.ProfileForm.controls['Name'].disable();
    this.ProfileForm.controls['CompanyEmail'].disable();
    this.ProfileForm.controls['Company'].disable();
    this.ProfileForm.controls['CompanyURL'].disable();

  }

  ngOnInit() {
  }

  public SetActiveOption(value) {
    this.ProfileOptions.forEach((op, idx) => {
      if (op.Value === value) {
        this.ProfileOptions[idx].Active = true;
        this.ActiveOptionValue = this.ProfileOptions[idx].Value;
      } else {
        this.ProfileOptions[idx].Active = false;
      }
    });
  }

  public EditForm() {
    this.EditingForm = true;
    this.ProfileForm.controls['Name'].enable();
    this.ProfileForm.controls['CompanyEmail'].enable();
    this.ProfileForm.controls['Company'].enable();
    this.ProfileForm.controls['CompanyURL'].enable();
  }

  public OnSubmit() {
    console.log('sending user info change: ', this.ProfileForm.value);
    this.EditingForm = false;
    this.ProfileForm.controls['Name'].disable();
    this.ProfileForm.controls['CompanyEmail'].disable();
    this.ProfileForm.controls['Company'].disable();
    this.ProfileForm.controls['CompanyURL'].disable();
  }

}
