import { Component, OnInit } from '@angular/core';
import { IDEStateManagementContext } from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'nide-ide-status-bar',
  templateUrl: './ide-status-bar.component.html',
  styleUrls: ['./ide-status-bar.component.scss']
})
export class IdeStatusBarComponent implements OnInit {
  protected statusProcessing: any;

  public Loading: boolean;
  public Status: string;

  constructor(
    protected ideState: IDEStateManagementContext
  ) {
    this.Status = '';
  }

  public ngOnInit(): void {
    this.ideState.Context.subscribe((ideState) => {
      this.Loading = ideState.Loading;

      this.EnsureStatusProcessing();
    });
  }

  public EnsureStatusProcessing(): void {
    // this.Status = this.ideState.RemoveNextStatusChange();

    if (this.Status) {
      this.statusProcessing = setTimeout(() => {
        this.EnsureStatusProcessing();
      }, 2250);
    } else {
      clearTimeout(this.statusProcessing);

      this.statusProcessing = null;
    }
  }
}
