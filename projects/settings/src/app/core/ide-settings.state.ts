import { IdeActivity, IdeSideBarAction, DataFlowModulePackSetup } from '@lcu/common';


export class IdeSettingsState {
  public Activities: IdeActivity[];

  public Arch: IdeSettingsArchitechtureState;

  public AddNew: {
    Activity: boolean;
    LCU: boolean;
    SectionAction: boolean;
  };

  public Config: IdeSettingsConfigState;

  public EditActivity: string;

  public EditSection: string;

  public EditSectionAction: string;

  public LCUSolutionOptions?: { [lcu: string]: string[] };

  public Loading?: boolean;

  public SectionActions: IdeSideBarAction[];

  public SideBarEditActivity: string;

  public SideBarSections: string[];

  public Step: IDESettingStepTypes;
}

export enum IDESettingStepTypes {
  Architecture = 'Architecture',
  Setup = 'Setup',
  Configuration = 'Configuration'
}

export class IdeSettingsArchitechtureState {
  public EditLCU: string;

  public LCUs: LowCodeUnitSetupConfig[];
}

export class IdeSettingsConfigState {
  public ActiveFiles: string[];

  public ActiveSolutions: IdeSettingsConfigSolution[];

  public ActiveModules: DataFlowModulePackSetup;

  public CurrentLCUConfig: string;

  public LCUConfig: LowCodeUnitConfiguration;
}

export class IdeSettingsConfigSolution {
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

  public Solutions: IdeSettingsConfigSolution[];
}
