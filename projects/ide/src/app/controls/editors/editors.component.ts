import { Component, OnInit } from '@angular/core';
import { IdeEditor, IdeStateChangeTypes, IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';
import { filter } from 'rxjs/operators';
import { LazyElementConfig } from '@lowcodeunit/lazy-element';

@Component({
  selector: 'nide-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss']
})
export class EditorsComponent implements OnInit {
  // Properties
  public CurrentEditor: IdeEditor;

  public Editors: IdeEditor[];

  public Config: LazyElementConfig;

  public Context: any = null;

  public Loading: boolean;

  //  Constructors
  constructor(protected ideState: IdeStateStateManagerContext) {}

  //  Life Cycle
  public ngOnInit() {
    this.ideState.Context.subscribe(ideState => {
      this.Editors = ideState.Editors;

      this.CurrentEditor = ideState.CurrentEditor;

      if (this.CurrentEditor) {
        this.Config = {
          Assets: [this.CurrentEditor.Toolkit],
          ElementName: this.CurrentEditor.Editor
        };
      }

      this.Loading = ideState.Loading;

      // this.ideState.AddStatusChange('Editors Loaded...');
    });
  }

  //  API Methods
  public CurrentEditorIndex() {
    return this.Editors ? this.Editors.findIndex(e => e.Lookup === this.CurrentEditor.Lookup) : -1;
  }

  public Remove(editor: IdeEditor, event: MouseEvent) {
    this.Loading = true;

    this.ideState.RemoveEditor(editor.Lookup);

    return event.stopImmediatePropagation();
  }

  public Select(editor: IdeEditor) {
    this.Loading = true;

    this.ideState.SelectEditor(editor.Lookup);
  }
}
