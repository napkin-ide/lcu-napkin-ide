import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  IDESettingsState,
  LowCodeUnitSetupConfig,
  IDESettingStepTypes,
} from '../../core/ide-settings.state';
import { IDESettingsStateContext } from '../../core/ide-settings-state-manager.context';
import { MatSelectChange } from '@angular/material/select';
import { MatListOption } from '@angular/material/list';
import { IdeActivity, IdeSideBarAction } from '@lcu/common';
import { Constants } from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'lcu-settings-setup',
  templateUrl: './settings-setup.component.html',
  styleUrls: ['./settings-setup.component.scss'],
})
export class SettingsSetupComponent implements OnInit {
  public get ExpandActivityBar(): boolean {
    return (
      !!this.State.EditActivity ||
      (this.State.AddNew && this.State.AddNew.Activity) ||
      !this.State.Activities ||
      this.State.Activities.length <= 0
    );
  }

  public get ExpandSideBar(): boolean {
    return (
      !this.State.EditActivity &&
      (!this.State.AddNew || !this.State.AddNew.Activity) &&
      this.State.Activities &&
      this.State.Activities.length > 0
    );
  }

  public get LCUGroups(): string[] {
    return Object.keys(this.State.LCUSolutionOptions);
  }

  public CurrentSection: string;

  public IsNewSideBarSection = false;

  public LCUText: string = Constants.LCU_TEXT;

  public NewActivityForm: FormGroup;

  public NewLCUForm: FormGroup;

  public NewSectionActionForm: FormGroup;

  public NewSideBarSectionForm: FormGroup;

  /**
   * Current state
   */
  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: IDESettingsState;

  @Input('setting-step-types')
  public SettingStepTypes: IDESettingStepTypes;

  //  Constructors
  constructor(
    protected formBldr: FormBuilder,
    protected IDESettingsState: IDESettingsStateContext
  ) {}

  //  Life Cycle

  /**
   * Settings-SetupComponent
   */

  public ngOnInit() {
    this.NewActivityForm = this.formBldr.group({
      title: ['', Validators.required],
      lookup: ['', Validators.required],
      icon: ['', Validators.required],
      iconSet: [''],
    });

    this.NewLCUForm = this.formBldr.group({
      lookup: ['', Validators.required],
      npmPkg: ['', Validators.required],
      pkgVer: ['', Validators.required],
    });

    this.NewSectionActionForm = this.formBldr.group({
      title: ['', Validators.required],
      action: ['', Validators.required],
      group: ['', Validators.required],
    });

    this.NewSideBarSectionForm = this.formBldr.group({
      name: ['', Validators.required],
    });

    this.IDESettingsState.Context.subscribe((state) => {
      this.resetForms();

      this.State = state;
    });
  }

  //  API methods
  public AddDefaultDataAppsLCUs() {
    this.State.Loading = true;

    this.IDESettingsState.AddDefaultDataAppsLCUs();
  }

  public AddDefaultDataFlowsLCUs() {
    this.State.Loading = true;

    this.IDESettingsState.AddDefaultDataFlowLCUs();
  }

  public AddNewActivity() {
    this.SaveActivity({
      Title: this.NewActivityForm.controls.title.value,
      Lookup: this.NewActivityForm.controls.lookup.value,
      Icon: this.NewActivityForm.controls.icon.value,
      IconSet: this.NewActivityForm.controls.iconSet.value,
    });
  }

  public AddNewLCU() {
    this.SaveLCU({
      Lookup: this.NewLCUForm.controls.lookup.value,
      NPMPackage: this.NewLCUForm.controls.npmPkg.value,
      PackageVersion: this.NewLCUForm.controls.pkgVer.value,
    });
  }

  public AddNewSectionAction() {
    this.SaveSectionAction({
      Title: this.NewSectionActionForm.controls.title.value,
      Section: this.State.EditSection,
      Action: this.NewSectionActionForm.controls.action.value,
      Group: this.NewSectionActionForm.controls.group.value,
    });
  }

  public AddSideBarSection() {
    this.State.Loading = true;
    this.IsNewSideBarSection = false;
    this.IDESettingsState.AddSideBarSection(
      this.NewSideBarSectionForm.controls.name.value
    );
  }

  public DeleteActivity(activity: IdeActivity) {
    if (confirm(`Are you sure you want to delete ${activity.Title}?`)) {
      this.State.Loading = true;

      this.IDESettingsState.DeleteActivity(activity.Lookup);
    }
  }

  public DeleteLCU(lcu: LowCodeUnitSetupConfig) {
    if (confirm(`Are you sure you want to delete ${lcu.Lookup}?`)) {
      this.State.Loading = true;

      this.IDESettingsState.DeleteLCU(lcu.Lookup);
    }
  }

  public DeleteSectionAction(action: IdeSideBarAction) {
    if (confirm(`Are you sure you want to delete ${action.Action}?`)) {
      this.State.Loading = true;

      this.IDESettingsState.DeleteSectionAction(action.Action, action.Group);
    }
  }

  public DeleteSideBarSection(section: string) {
    if (confirm(`Are you sure you want to delete ${section}?`)) {
      this.State.Loading = true;

      this.IDESettingsState.DeleteSideBarSection(section);
    }
  }

  public HasCapability(name: string) {
    return (
      this.State.Config.ActiveSolutions &&
      !!this.State.Config.ActiveSolutions.find((s) => s.Name === name)
    );
  }

  public SaveActivity(activity: IdeActivity) {
    this.State.Loading = true;

    this.IDESettingsState.SaveActivity(activity);
  }

  public SaveLCU(lcu: LowCodeUnitSetupConfig) {
    this.State.Loading = true;

    this.IDESettingsState.SaveLCU(lcu);
  }

  public SaveLCUCapabilities(lcuLookup: string, capabilities: MatListOption[]) {
    this.State.Loading = true;

    this.IDESettingsState.SaveLCUCapabilities(
      lcuLookup,
      this.State.Config.ActiveFiles,
      capabilities.map((c) =>
        this.State.Config.LCUConfig.Solutions.find((s) => s.Name === c.value)
      ),
      this.State.Config.ActiveModules
    );
  }

  public SaveSectionAction(action: IdeSideBarAction) {
    this.State.Loading = true;

    this.IDESettingsState.SaveSectionAction(action);
  }

  public SetConfigLCU(event: MatSelectChange) {
    this.State.Loading = true;

    this.IDESettingsState.SetConfigLCU(event.value);
  }

  public SetEditActivity(activity: IdeActivity) {
    this.State.Loading = true;

    this.IDESettingsState.SetEditActivity(activity ? activity.Lookup : null);
  }

  public SetEditLCU(lcu: LowCodeUnitSetupConfig) {
    this.State.Loading = true;

    this.IDESettingsState.SetEditLCU(lcu ? lcu.Lookup : null);
  }

  public SetEditSection(section: string) {
    this.State.Loading = true;
    this.CurrentSection = section;

    this.IDESettingsState.SetEditSection(section);
  }

  public SetEditSectionAction(action: IdeSideBarAction) {
    this.State.Loading = true;

    this.IDESettingsState.SetEditSectionAction(action ? action.Action : null);
  }

  public SetSideBarEditActivity(event: MatSelectChange) {
    this.State.Loading = true;

    this.IDESettingsState.SetSideBarEditActivity(event.value);
  }

  public ToggleAddNewActivity() {
    this.State.Loading = true;

    this.IDESettingsState.ToggleAddNewActivity();
  }

  public ToggleAddNewLCU() {
    this.State.Loading = true;

    this.IDESettingsState.ToggleAddNewLCU();
  }

  public ToggleAddNewSectionAction() {
    this.State.Loading = true;

    this.IDESettingsState.ToggleAddNewSectionAction();
  }

  public ToggleAddNewSideBarSection() {
    // TODO: Add this to the State instead
    // this.State.Loading = true;
    this.IsNewSideBarSection = !this.IsNewSideBarSection;
  }

  public UpdateLCU(lcu: LowCodeUnitSetupConfig) {
    if (
      confirm(
        `Are you sure you want to update ${lcu.Lookup} version ${lcu.PackageVersion} to latest?`
      )
    ) {
      this.State.Loading = true;

      this.IDESettingsState.SaveLCU({ ...lcu, PackageVersion: 'latest' });
    }
  }

  //  Helpers
  protected resetForms() {
    this.NewActivityForm.reset();

    this.NewLCUForm.reset();

    this.NewSectionActionForm.reset();

    this.NewSideBarSectionForm.reset();
  }
}
