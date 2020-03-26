import { Injectable, Injector } from '@angular/core';
import { StateContext } from '@lcu/common';
import { IdeManagementState } from './ide-management.state';

@Injectable({
  providedIn: 'root'
})
export class IdeStateStateManagerContext extends StateContext<IdeManagementState> {
  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  API Methods
  public RemoveEditor(editorLookup: string) {
    this.Execute({
      Arguments: {
        EditorLookup: editorLookup
      },
      Type: 'RemoveEditor'
    });
  }

  public SelectEditor(editorLookup: string) {
    this.Execute({
      Arguments: {
        EditorLookup: editorLookup
      },
      Type: 'SelectEditor'
    });
  }

  public SelectSideBarAction(action: string, group: string, section: string) {
    this.Execute({
      Arguments: {
        Action: action,
        Group: group,
        Section: section
      },
      Type: 'SelectSideBarAction'
    });
  }

  public SetActivity(activity: string) {
    this.Execute({
      Arguments: {
        Activity: activity
      },
      Type: 'SetActivity'
    });
  }

  public ToggleShowPanels() {
    this.Execute({
      Arguments: {},
      Type: 'ToggleShowPanels'
    });
  }

  //  Helpers
  protected defaultValue() {
    return <IdeManagementState>{ Loading: true };
  }

  protected loadStateKey(): string {
    return 'main';
  }

  protected loadStateName(): string {
    return 'idemanagement';
  }
}
