import { IdeActivity, IdeEditor, IdePanel, IdeSideBar } from '@lcu/common';

export class IdeManagementState {
  public Activities: IdeActivity[];

  public CurrentActivity: IdeActivity;

  public CurrentEditor: IdeEditor;

  public CurrentPanel: IdePanel;

  public Editors: IdeEditor[];

  public HeaderActions: Array<IdeAction>;

  public InfrastructureConfigured: boolean;

  public Loading: boolean;

  public Panels: IdePanel[];

  public RootActivities: IdeActivity[];

  public ShowPanels: boolean;

  public SideBar: IdeSideBar;

  public StatusChanges: string[];
}

export class IdeAction {
  public Icon: string;
  public Action: string;
  public Text: string;
  public Type: IdeActionTypes;
}

export enum IdeActionTypes {
  Link = 'Link',
  ExternalLink = 'ExternalLink',
  Modal = 'Modal'
}