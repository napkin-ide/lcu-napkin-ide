import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IdeSettingsState } from '../../../core/ide-settings.state';
import { IdeSettingsStateManagerContext } from '../../../core/ide-settings-state-manager.context';

@Component({
  selector: 'lcu-marketplace-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class MarketplaceProfileComponent implements OnInit {

  // FIELDS

  /**
   * name constant
   */
  protected readonly NAME: string = 'Name';

  /**
   * company email constant
   */
  protected readonly COMPANY_EMAIL: string = 'CompanyEmail';

  /**
   * company constant
   */
  protected readonly COMPANY: string = 'CompanyEmail';

  /**
   * company url constant
   */
  protected readonly COMPANY_URL: string = 'CompanyURL';

  // PROPERTIES

  /**
   * configuration for the listed options in the profile section sidebar
   */
  public ProfileSideBarOptions: any;

  /**
   * the currently active sidebar list option
   */
  public ActiveOptionValue: string;

  /**
   * boolean that determines / indicates whether profile form is currently being edited
   */
  public EditingForm: boolean;

  /**
   * the user entity from which the current user's profile is generated
   */
  public UserEntity: any;

  /**
   * the profile form used to edit the user's profile data
   */
  public ProfileForm: FormGroup;

  /**
   * the current state
   */
  public State: IdeSettingsState;

  // CONSTRUCTORS

  constructor(protected ideSettingsState: IdeSettingsStateManagerContext) {
    // get user / company from state...
    this.UserEntity = {
      Name: 'Chris P. Bacon',
      CompanyEmail: 'bacon@eggs.com',
      Company: 'EggsRSides LLC',
      CompanyURL: 'www.eggstobacon.yum'
    };
    this.EditingForm = false;
    this.ProfileSideBarOptions = [
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
    this.ProfileForm.controls[this.NAME].disable();
    this.ProfileForm.controls[this.COMPANY_EMAIL].disable();
    this.ProfileForm.controls[this.COMPANY].disable();
    this.ProfileForm.controls[this.COMPANY_URL].disable();

  }

  // LIFECYCLE

  ngOnInit() {
    this.ideSettingsState.Context.subscribe(state => {
      this.State = state;
    });
  }

  // API METHODS

  /**
   *
   * @param value the option to set as active
   *
   * sets the chosen option as the active option and switches views
   */
  public SetActiveOption(value: string): void {
    this.ProfileSideBarOptions.forEach((op: object, idx: number) => {
      if (op['Value'] === value) {
        this.ProfileSideBarOptions[idx].Active = true;
        this.ActiveOptionValue = this.ProfileSideBarOptions[idx].Value;
      } else {
        this.ProfileSideBarOptions[idx].Active = false;
      }
    });
  }

  /**
   * when user clicks 'Edit', this runs and puts the form in 'edit mode'
   */
  public EditForm(): void {
    this.EditingForm = true;
    this.ProfileForm.controls[this.NAME].enable();
    this.ProfileForm.controls[this.COMPANY_EMAIL].enable();
    this.ProfileForm.controls[this.COMPANY].enable();
    this.ProfileForm.controls[this.COMPANY_URL].enable();
  }

  /**
   * when user clicks 'Save', this runs and returns the form to 'read-only mode'
   */
  public OnSubmit(): void {
    this.EditingForm = false;
    this.ProfileForm.controls[this.NAME].disable();
    this.ProfileForm.controls[this.COMPANY_EMAIL].disable();
    this.ProfileForm.controls[this.COMPANY].disable();
    this.ProfileForm.controls[this.COMPANY_URL].disable();
    // make the call to save profile here...
  }

  // HELPERS

}
