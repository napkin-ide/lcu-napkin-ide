import { Component, OnInit, Injector, SecurityContext } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';

export class LcuNapkinIdeShellHostElementState {
  public ShellSrc: string;
}

export class LcuNapkinIdeShellHostContext extends LCUElementContext<LcuNapkinIdeShellHostElementState> {}

export const SelectorLcuNapkinIdeShellHostElement = 'lcu-napkin-ide-shell-host-element';

@Component({
  selector: SelectorLcuNapkinIdeShellHostElement,
  templateUrl: './shell-host.component.html',
  styleUrls: ['./shell-host.component.scss']
})
export class LcuNapkinIdeShellHostElementComponent extends LcuElementComponent<LcuNapkinIdeShellHostContext> implements OnInit {
  //  Fields

  //  Properties
  public get ShellSource(): SafeValue {
    return this.context.State.ShellSrc ? this.sanitizer.bypassSecurityTrustResourceUrl(this.context.State.ShellSrc) : '';
  }

  //  Constructors
  constructor(protected injector: Injector, protected sanitizer: DomSanitizer) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    if (!this.context) {
      this.SetContext({
        State: {
          ShellSrc: 'http://valorem.fathym-it.com/forge/solutions/forge-solution/flux/manage'
        }
      });
    }
  }

  //  API Methods

  //  Helpers
}
