import { IdeActivity, IdeEditor, IdePanel, IdeSideBar } from '@lcu/common';

export class IdeManagementState {
  public Activities: IdeActivity[];

  public CurrentActivity: IdeActivity;

  public CurrentEditor: IdeEditor;

  public CurrentPanel: IdePanel;

  public Editors: IdeEditor[];

  public HeaderActions: Array<IDEAction>;

  public InfrastructureConfigured: boolean;

  public IsActiveSubscriber: boolean;

  public Loading: boolean;

  public Panels: IdePanel[];

  public RootActivities: IdeActivity[];

  public ShowPanels: boolean;

  public SideBar: IdeSideBar;

  public StatusChanges: string[];

  public Username: string;
}

export class IDEAction {
  public Icon: string;
  public Action: string;
  public Text: string;
  public Type: IDEActionTypes;
}

export enum IDEActionTypes {
  Link = 'Link',
  ExternalLink = 'ExternalLink',
  Modal = 'Modal',
}
