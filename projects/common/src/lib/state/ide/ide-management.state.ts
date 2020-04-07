import { IdeActivity, IdeEditor, IdePanel, IdeSideBar } from '@lcu/common';

export class IdeManagementState {
  public Activities: IdeActivity[];

  public CurrentActivity: IdeActivity;

  public CurrentEditor: IdeEditor;

  public CurrentPanel: IdePanel;

  public Editors: IdeEditor[];

  public InfrastructureConfigured: boolean;

  public Loading: boolean;

  public Panels: IdePanel[];

  public RootActivities: IdeActivity[];

  public ShowPanels: boolean;

  public SideBar: IdeSideBar;

  public StatusChanges: string[];
}
