import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class ExternalDialogData {
  public ExternalPath: string;
}

@Component({
  selector: 'nide-external-dialog',
  templateUrl: './external-dialog.component.html',
  styleUrls: ['./external-dialog.component.scss']
})
export class ExternalDialogComponent implements OnInit {
  //  Properties
  public ExternalPath: SafeResourceUrl;

  //  Constructors
  constructor(protected dialogRef: MatDialogRef<ExternalDialogComponent>, @Inject(MAT_DIALOG_DATA) protected data: ExternalDialogData,
    protected sanitizer: DomSanitizer) {}

  //  Life Cycle
  public ngOnInit() {
    this.ExternalPath = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.ExternalPath);
  }

  //  API Methods
  public CloseSettings(): void {
    this.dialogRef.close();
  }
}
