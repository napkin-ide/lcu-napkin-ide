import { Component, OnInit } from '@angular/core';
import { IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';
import { FaviconsService } from '@lcu/common';

@Component({
  selector: 'nide-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public SelectedTheme: string;
  public ShowPanels: boolean;

  constructor(
    protected faviconsService: FaviconsService,
    protected ideState: IdeStateStateManagerContext
  ) { }

  /**
   * Angular Lifecycle Hook
   */
  public ngOnInit() {
    this.ideState.Context.subscribe(ideState => {
      this.ShowPanels = ideState.ShowPanels;

      // this.ideState.AddStatusChange('Editors Loaded...');
    });

    this.resetFavicon();
  }

  /**
   * Set default favicon
   */
  protected resetFavicon(): void {
    this.faviconsService.reset();
  }
}
