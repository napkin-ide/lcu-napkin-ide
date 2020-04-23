import { IDESettingsState, LowCodeUnitSetupConfig, IdeSettingsConfigSolution } from './ide-settings.state';
import { StateContext } from '@lcu/common';
import { Injectable, Injector } from '@angular/core';
import { IdeActivity, IdeSideBarAction, DataFlowModulePackSetup } from '@lcu/common';

@Injectable({
  providedIn: 'root'
})
export class IDESettingsStateContext extends StateContext<IDESettingsState> {
  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  API Methods
  public AddDefaultDataAppsLCUs() {
    this.Execute({
      Arguments: {},
      Type: 'AddDefaultDataAppsLCUs'
    });
  }

  public AddDefaultDataFlowLCUs() {
    this.Execute({
      Arguments: { },
      Type: 'AddDefaultDataFlowLCUs'
    });
  }

  public AddSideBarSection(section: string) {
    this.Execute({
      Arguments: {
        Section: section
      },
      Type: 'AddSideBarSection'
    });
  }

  public DeleteActivity(activityLookup: string) {
    this.Execute({
      Arguments: {
        Activity: activityLookup
      },
      Type: 'DeleteActivity'
    });
  }

  public DeleteLCU(lcuLookup: string) {
    this.Execute({
      Arguments: {
        LCU: lcuLookup
      },
      Type: 'DeleteLCU'
    });
  }

  public DeleteSectionAction(action: string, group: string) {
    this.Execute({
      Arguments: {
        Action: action,
        Group: group
      },
      Type: 'DeleteSectionAction'
    });
  }

  public DeleteSideBarSection(section: string) {
    this.Execute({
      Arguments: {
        Section: section
      },
      Type: 'DeleteSideBarSection'
    });
  }

  public SaveActivity(activity: IdeActivity) {
    this.Execute({
      Arguments: {
        Activity: activity
      },
      Type: 'SaveActivity'
    });
  }

  public SaveLCU(lcu: LowCodeUnitSetupConfig) {
    this.Execute({
      Arguments: {
        LCU: lcu
      },
      Type: 'SaveLCU'
    });
  }

  public SaveLCUCapabilities(lcuLookup: string, files: string[], solutions: IdeSettingsConfigSolution[], modules: DataFlowModulePackSetup) {
    this.Execute({
      Arguments: {
        LCUConfig: {
          Files: files,
          Modules: modules,
          Solutions: solutions
        },
        LCULookup: lcuLookup
      },
      Type: 'SaveLCUCapabilities'
    });
  }

  public SaveSectionAction(action: IdeSideBarAction) {
    this.Execute({
      Arguments: {
        Action: action
      },
      Type: 'SaveSectionAction'
    });
  }

  public SetConfigLCU(lcuLookup: string) {
    this.Execute({
      Arguments: {
        LCU: lcuLookup
      },
      Type: 'SetConfigLCU'
    });
  }

  public SetEditActivity(activityLookup: string) {
    this.Execute({
      Arguments: {
        Activity: activityLookup
      },
      Type: 'SetEditActivity'
    });
  }

  public SetEditLCU(lcuLookup: string) {
    this.Execute({
      Arguments: {
        LCU: lcuLookup
      },
      Type: 'SetEditLCU'
    });
  }

  public SetEditSection(sectionLookup: string) {
    this.Execute({
      Arguments: {
        Section: sectionLookup
      },
      Type: 'SetEditSection'
    });
  }

  public SetEditSectionAction(action: string) {
    this.Execute({
      Arguments: {
        Action: action
      },
      Type: 'SetEditSectionAction'
    });
  }

  public SetSideBarEditActivity(activityLookup: string) {
    this.Execute({
      Arguments: {
        Activity: activityLookup
      },
      Type: 'SetSideBarEditActivity'
    });
  }

  public ToggleAddNewActivity() {
    this.Execute({
      Arguments: {},
      Type: 'ToggleAddNewActivity'
    });
  }

  public ToggleAddNewLCU() {
    this.Execute({
      Arguments: {},
      Type: 'ToggleAddNewLCU'
    });
  }

  public ToggleAddNewSectionAction() {
    this.Execute({
      Arguments: {},
      Type: 'ToggleAddNewSectionAction'
    });
  }

  //  Helpers
  protected defaultValue() {
    return <IDESettingsState>{ Loading: true };
  }

  protected loadStateKey(): string {
    return 'settings';
  }

  protected loadStateName(): string {
    return 'idemanagement';
  }
}
