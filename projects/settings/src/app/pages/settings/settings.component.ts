import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdeSettingsState, LowCodeUnitSetupConfig, IDESettingStepTypes } from '../../core/ide-settings.state';
import { IdeSettingsStateManagerContext } from '../../core/ide-settings-state-manager.context';
import { MatSelectChange, MatListOption } from '@angular/material';
import { IdeActivity, IdeSideBarAction } from '@lcu/common';
import { SettingsSetupComponent } from '../settings-setup/settings-setup.component';
import { SettingsConfigComponent } from '../settings-config/settings-config.component';
import { SettingsArchComponent } from '../settings-arch/settings-arch.component';

@Component({
  selector: 'lcu-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: []
})
export class SettingsComponent implements OnInit {
  //  Fields

  //  Properties

  public get MainLoading(): boolean {
    return this.State.Loading && (!this.State.Arch || !this.State.Arch.LCUs || this.State.Arch.LCUs.length === 0);
  }

  public NewActivityForm: FormGroup;

  public NewLCUForm: FormGroup;

  public NewSectionActionForm: FormGroup;

  public NewSideBarSectionForm: FormGroup;

  public State: IdeSettingsState;
  //  Constructors
  constructor(protected formBldr: FormBuilder, protected ideSettingsState: IdeSettingsStateManagerContext) {}

  //  Life Cycle


  /**
   * Settings-SetupComponent
   */
  @ViewChildren(SettingsSetupComponent)
  public SettingsSetupComponent: QueryList<SettingsSetupComponent>;

  /**
   * Settings-ConfigComponent
   */
  @ViewChildren(SettingsConfigComponent)
  public SettingsConfigComponent: QueryList<SettingsConfigComponent>;

  /**
   * Settings-ArchComponent
   */
  @ViewChildren(SettingsArchComponent)
  public SettingsArchComponent: QueryList<SettingsArchComponent>;


  public SettingStepTypes = IDESettingStepTypes;

  public ngOnInit() {

    this.NewActivityForm = this.formBldr.group({
      title: ['', Validators.required],
      lookup: ['', Validators.required],
      icon: ['', Validators.required],
      iconSet: ['']
    });

    this.NewLCUForm = this.formBldr.group({
      lookup: ['', Validators.required],
      npmPkg: ['', Validators.required],
      pkgVer: ['', Validators.required]
    });

    this.NewSectionActionForm = this.formBldr.group({
      title: ['', Validators.required],
      action: ['', Validators.required],
      group: ['', Validators.required]
    });

    this.NewSideBarSectionForm = this.formBldr.group({
      name: ['', Validators.required]
    });

    this.ideSettingsState.Context.subscribe(state => {
      this.resetForms();

      this.State = state;
      this.SetStep(IDESettingStepTypes.Setup);
    });
  }

  public get LCUGroups(): string[] {
    return Object.keys(this.State.LCUSolutionOptions);
  }

  //  API methods
  public AddDefaultDataAppsLCUs() {
    this.State.Loading = true;

    this.ideSettingsState.AddDefaultDataAppsLCUs();
  }

  public AddDefaultDataFlowsLCUs() {
    this.State.Loading = true;

    this.ideSettingsState.AddDefaultDataFlowLCUs();
  }

  public AddNewActivity() {
    this.SaveActivity({
      Title: this.NewActivityForm.controls.title.value,
      Lookup: this.NewActivityForm.controls.lookup.value,
      Icon: this.NewActivityForm.controls.icon.value,
      IconSet: this.NewActivityForm.controls.iconSet.value
    });
  }

  public AddNewLCU() {
    this.SaveLCU({
      Lookup: this.NewLCUForm.controls.lookup.value,
      NPMPackage: this.NewLCUForm.controls.npmPkg.value,
      PackageVersion: this.NewLCUForm.controls.pkgVer.value
    });
  }

  public AddNewSectionAction() {
    this.SaveSectionAction({
      Title: this.NewSectionActionForm.controls.title.value,
      Section: this.State.EditSection,
      Action: this.NewSectionActionForm.controls.action.value,
      Group: this.NewSectionActionForm.controls.group.value
    });
  }

  public AddSideBarSection() {
    this.State.Loading = true;

    this.ideSettingsState.AddSideBarSection(this.NewSideBarSectionForm.controls.name.value);
  }

  public DeleteActivity(activity: IdeActivity) {
    if (confirm(`Are you sure you want to delete ${activity.Title}?`)) {
      this.State.Loading = true;

      this.ideSettingsState.DeleteActivity(activity.Lookup);
    }
  }

  public DeleteLCU(lcu: LowCodeUnitSetupConfig) {
    if (confirm(`Are you sure you want to delete ${lcu.Lookup}?`)) {
      this.State.Loading = true;

      this.ideSettingsState.DeleteLCU(lcu.Lookup);
    }
  }

  public DeleteSectionAction(action: IdeSideBarAction) {
    if (confirm(`Are you sure you want to delete ${action.Action}?`)) {
      this.State.Loading = true;

      this.ideSettingsState.DeleteSectionAction(action.Action, action.Group);
    }
  }

  public DeleteSideBarSection(section: string) {
    if (confirm(`Are you sure you want to delete ${section}?`)) {
      this.State.Loading = true;

      this.ideSettingsState.DeleteSideBarSection(section);
    }
  }

  public HasCapability(name: string) {
    return this.State.Config.ActiveSolutions && !!this.State.Config.ActiveSolutions.find(s => s.Name === name);
  }

  public SaveActivity(activity: IdeActivity) {
    this.State.Loading = true;

    this.ideSettingsState.SaveActivity(activity);
  }

  public SaveLCU(lcu: LowCodeUnitSetupConfig) {
    this.State.Loading = true;

    this.ideSettingsState.SaveLCU(lcu);
  }

  public SaveLCUCapabilities(lcuLookup: string, capabilities: MatListOption[]) {
    this.State.Loading = true;

    this.ideSettingsState.SaveLCUCapabilities(
      lcuLookup,
      this.State.Config.ActiveFiles,
      capabilities.map(c => this.State.Config.LCUConfig.Solutions.find(s => s.Name === c.value)),
      this.State.Config.ActiveModules
    );
  }

  public SaveSectionAction(action: IdeSideBarAction) {
    this.State.Loading = true;

    this.ideSettingsState.SaveSectionAction(action);
  }

  public SetConfigLCU(event: MatSelectChange) {
    this.State.Loading = true;

    this.ideSettingsState.SetConfigLCU(event.value);
  }

  public SetEditActivity(activity: IdeActivity) {
    this.State.Loading = true;

    this.ideSettingsState.SetEditActivity(activity ? activity.Lookup : null);
  }

  public SetEditLCU(lcu: LowCodeUnitSetupConfig) {
    this.State.Loading = true;

    this.ideSettingsState.SetEditLCU(lcu ? lcu.Lookup : null);
  }

  public SetEditSection(section: string) {
    this.State.Loading = true;

    this.ideSettingsState.SetEditSection(section);
  }

  public SetEditSectionAction(action: IdeSideBarAction) {
    this.State.Loading = true;

    this.ideSettingsState.SetEditSectionAction(action ? action.Action : null);
  }

  public SetSideBarEditActivity(event: MatSelectChange) {
    this.State.Loading = true;

    this.ideSettingsState.SetSideBarEditActivity(event.value);
  }

  public SetStep(step: IDESettingStepTypes) {
    this.State.SetupStep = step;
  }

  public ToggleAddNewActivity() {
    this.State.Loading = true;

    this.ideSettingsState.ToggleAddNewActivity();
  }

  public ToggleAddNewLCU() {
    this.State.Loading = true;

    this.ideSettingsState.ToggleAddNewLCU();
  }

  public ToggleAddNewSectionAction() {
    this.State.Loading = true;

    this.ideSettingsState.ToggleAddNewSectionAction();
  }

  public UpdateLCU(lcu: LowCodeUnitSetupConfig) {
    if (confirm(`Are you sure you want to update ${lcu.Lookup} version ${lcu.PackageVersion} to latest?`)) {
      this.State.Loading = true;

      this.ideSettingsState.SaveLCU({ ...lcu, PackageVersion: 'latest' });
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
