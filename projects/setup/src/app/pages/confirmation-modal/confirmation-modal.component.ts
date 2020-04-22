import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lcu-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,) { }

  ngOnInit() {
  }

  public Cancel() {
    this.close('cancel');
  }

  public Confirm() {
    this.close('confirm');
  }

 

  protected close(response: string){
    this.dialogRef.close(response);
  }

}
