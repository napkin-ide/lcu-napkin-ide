import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExternalDialogComponent, IDEStateManagementContext, IdeManagementState } from '@napkin-ide/lcu-napkin-ide-common';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { IdeActivity } from '@lcu/common';

@Component({
  selector: 'nide-ide-activity-bar',
  templateUrl: './ide-activity-bar.component.html',
  styleUrls: ['./ide-activity-bar.component.scss']
})
export class IdeActivityBarComponent implements OnInit {
  protected rootActDialog: MatDialogRef<ExternalDialogComponent, any>;

  public Activities: IdeActivity[];

  public CurrentActivity: IdeActivity;

  public InfraConfigured: boolean;

  public RootActivities: IdeActivity[];

  @Output('settings-opened') public emitSettingsOpened: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    protected ideState: IDEStateManagementContext,
    protected dialog: MatDialog
  ) { }

  // TODO: Trigger loading on any State actions
  public ngOnInit(): void {
    this.ideState.Context.subscribe((ideState: IdeManagementState) => {
      this.Activities = ideState.Activities;
      this.CurrentActivity = ideState.CurrentActivity;
      this.InfraConfigured = ideState.InfrastructureConfigured;
      this.RootActivities = ideState.RootActivities;

      if (!this.InfraConfigured && this.RootActivities && this.RootActivities.length === 1) {
        this.OpenRootActivity(this.RootActivities[0]);
      }
    });
  }

  public OpenRootActivity(act: IdeActivity): void {
    if (!this.rootActDialog) {
      this.rootActDialog = this.dialog.open(ExternalDialogComponent, {
        width: '90%',
        panelClass: 'settings-dialog-overlay',
        data: { ExternalPath: act.Lookup }
      });
      this.emitSettingsOpened.emit(true);

      this.rootActDialog.afterClosed().subscribe((result: Observable<any>) => {
        this.ideState.$Refresh();
        this.rootActDialog = null;
        this.emitSettingsOpened.emit(false);
      });
    }
  }

  public SelectActivity(activity: IdeActivity): void {
    this.ideState.SetActivity(activity.Lookup);
  }
}
