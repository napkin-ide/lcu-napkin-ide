import { Component, OnInit } from '@angular/core';
import { IdeStateService } from '../../svc/ide-state.service';
import { filter } from 'rxjs/operators';
import { IdeStateChangeTypes, IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'nide-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  //  Fields
  protected statusProcessing: any;

  //  Properties
  public Loading: boolean;

  public Status: string;

  //  Constructors
  constructor(protected ideState: IdeStateStateManagerContext) {
    this.Status = '';
  }

  //  Life Cycle
  public ngOnInit() {
    this.ideState.Context.subscribe((ideState) => {
      this.Loading = ideState.Loading;

      this.EnsureStatusProcessing();
    });
  }

  //  API Methods
  public EnsureStatusProcessing() {
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
