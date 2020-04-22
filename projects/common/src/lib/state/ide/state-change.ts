import { IdeManagementState } from './ide-management.state';
import { IdeStateChangeTypes } from './state-change-types';

export class IdeStateChange {
  public Types: IdeStateChangeTypes[];

  public State: IdeManagementState;
}
