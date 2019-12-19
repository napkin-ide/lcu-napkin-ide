import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
      Name: new FormControl(''),
      CompanyEmail: new FormControl(''),
      Company: new FormControl(''),
      CompanyURL: new FormControl(''),
    });
    this.ProfileForm.patchValue({
      Name: this.UserEntity.Name,
      CompanyEmail: this.UserEntity.CompanyEmail,
      Company: this.UserEntity.Company,
      CompanyURL: this.UserEntity.CompanyURL
    });

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
  }

  public OnSubmit() {
    console.log(this.ProfileForm);
    this.EditingForm = false;
  }

}
