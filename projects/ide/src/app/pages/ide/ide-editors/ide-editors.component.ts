import { Component, OnInit } from '@angular/core';
import { IDEStateManagementContext } from '@napkin-ide/lcu-napkin-ide-common';
import { LazyElementConfig } from '@lowcodeunit/lazy-element';
import { IdeEditor } from '@lcu/common';

@Component({
  selector: 'nide-ide-editors',
  templateUrl: './ide-editors.component.html',
  styleUrls: ['./ide-editors.component.scss']
})
export class IdeEditorsComponent implements OnInit {
  public Config: LazyElementConfig;
  public Context: any = null;
  public CurrentEditor: IdeEditor;
  public Editors: IdeEditor[];

  constructor(
    protected ideState: IDEStateManagementContext
  ) { }

  // TODO: Trigger loading on any State actions
  public ngOnInit(): void {
    this.ideState.Context.subscribe((ideState: any)  => {
      this.Editors = ideState.Editors;
      this.CurrentEditor = ideState.CurrentEditor;

      if (this.CurrentEditor) {
       this.Config = {
          Assets: [this.CurrentEditor.Toolkit],
          ElementName: this.CurrentEditor.Editor
        };

        /** FOR TESTING ***************************************
         * This is for testing limited trial locally - Shannon
         * Don't check this in, use the above config for that
         * Also, need to change APIRoot in index.html
         * ****************************************************
         */
      //    this.Config = {
      //      Assets: ['https://limited.fathym-int.com/_lcu/lcu-limited-trial/wc/lcu-limited-trial.lcu.js'],
      //      ElementName: this.CurrentEditor.Editor
      //   };
      }
    });
  }

  public CurrentEditorIndex(): number {
    return this.Editors ? this.Editors.findIndex(e => e.Lookup === this.CurrentEditor.Lookup) : -1;

    
  }

  public Remove(editor: IdeEditor, event: MouseEvent): void {
    this.ideState.RemoveEditor(editor.Lookup);
    return event.stopImmediatePropagation();
  }

  public Select(editor: IdeEditor): void {
    this.ideState.SelectEditor(editor.Lookup);
  }
}
