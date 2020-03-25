import { Component } from '@angular/core';
import { IdeStateStateManagerContext } from 'projects/common/src/lib/core/ide/ide-state-state-manager.context';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'platform-usage';
  constructor(protected ideState: IdeStateStateManagerContext){
    this.ideState.Context.subscribe(ideState => {});
  }
 


}
