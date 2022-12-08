import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css']
})

export class WarningDialogComponent {
  constructor(public dialogRef: MatDialogRef<WarningDialogComponent>) {
  }


  public confirmMessage: string = '';
  public confirmMessage2: string = '';

}
