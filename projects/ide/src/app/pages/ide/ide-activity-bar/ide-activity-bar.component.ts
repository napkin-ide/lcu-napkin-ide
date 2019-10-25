import { Component, OnInit } from '@angular/core';
import { ExternalDialogComponent, IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';
import { MatDialogRef, MatDialog } from '@angular/material';
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
  public Loading: boolean;
  public RootActivities: IdeActivity[];

  constructor(
    protected ideState: IdeStateStateManagerContext,
    protected dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.ideState.Context.subscribe(ideState => {
      this.Activities = ideState.Activities;

      this.CurrentActivity = ideState.CurrentActivity;

      this.InfraConfigured = ideState.InfrastructureConfigured;

      this.Loading = ideState.Loading;

      this.RootActivities = ideState.RootActivities;

      console.log(ideState);

      if (!this.InfraConfigured && this.RootActivities && this.RootActivities.length === 1) {
        this.OpenRootActivity(this.RootActivities[0]);
      }

      // this.ideState.AddStatusChange('Activities Loaded...');
    });
  }

  public OpenRootActivity(act: IdeActivity): void {
    if (!this.rootActDialog) {
      this.rootActDialog = this.dialog.open(ExternalDialogComponent, {
        width: '90%',
        data: { ExternalPath: act.Lookup }
      });

      this.rootActDialog.afterClosed().subscribe(result => {
        this.Loading = true;

        this.ideState.$Refresh();

        this.rootActDialog = null;
      });
    }
  }

  public SelectActivity(activity: IdeActivity): void {
    this.Loading = true;
    this.ideState.SetActivity(activity.Lookup);
  }
}
