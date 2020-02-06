import { IdeActivity, IdeSideBarAction, DataFlowModulePackSetup } from '@lcu/common';


export class IdeUserAccessState {
  public Activities: IdeActivity[];

  public Arch: IdeUserAccessArchitechtureState;

  public AddNew: {
    Activity: boolean;
    LCU: boolean;
    SectionAction: boolean;
  };

  public Config: IdeUserAccessConfigState;

  public EditActivity: string;

  public EditSection: string;

  public EditSectionAction: string;

  public LCUSolutionOptions?: { [lcu: string]: string[] };

  public Loading?: boolean;

  public SectionActions: IdeSideBarAction[];

  public SideBarEditActivity: string;

  public SideBarSections: string[];

  public Step: IdeUserAccesstepTypes;
}

export enum IdeUserAccesstepTypes {
  Architecture = 'Architecture',
  Setup = 'Setup',
  Configuration = 'Configuration'
}

export class IdeUserAccessArchitechtureState {
  public EditLCU: string;

  public LCUs: LowCodeUnitSetupConfig[];
}

export class IdeUserAccessConfigState {
  public ActiveFiles: string[];

  public ActiveSolutions: IdeUserAccessConfigSolution[];

  public ActiveModules: DataFlowModulePackSetup;

  public CurrentLCUConfig: string;

  public LCUConfig: LowCodeUnitConfiguration;
}

export class IdeUserAccessConfigSolution {
  public Element: string;

  public Name: string;
}

export class LowCodeUnitSetupConfig {
  public Lookup: string;

  public NPMPackage: string;

  public PackageVersion: string;
}

export class LowCodeUnitConfiguration {
  public Files: string[];

  public Modules: DataFlowModulePackSetup;

  public Solutions: IdeUserAccessConfigSolution[];
}
