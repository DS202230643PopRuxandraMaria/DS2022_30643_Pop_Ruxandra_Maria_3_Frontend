import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {User} from "../models/user";

import {lastValueFrom} from "rxjs";
import {faUndo} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddUserPageComponent implements OnInit {

  faUndo = faUndo;
  existingUsers: User[] = []
  list: string[] = [];
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  password: string = '';
  username: string = '';


  isSubmitted: boolean = false;
  dialogRef: MatDialogRef<WarningDialogComponent> | undefined;

  constructor(private router: Router,
              private employeeService: UserService,
              public dialog: MatDialog,
  ) {
  }

  async setUsers() {
    const users$ = this.employeeService.getAllUser();
    this.existingUsers = await lastValueFrom(await users$);
  }

  ngOnInit(): void {
    this.setUsers();
  }


  openDialog(message: string) {
    this.dialogRef = this.dialog.open(WarningDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = message;

  }

  readValueFromForm(elementID: string) {
    return (<HTMLInputElement>document.getElementById(elementID)).value;
  }


  checkIFUsernameAlreadyExists(username: string) {
    for (const user of this.existingUsers) {
      if (user.username.toUpperCase() === username.toUpperCase()) {
        return true;
      }

    }
    return false;
  }

  async addNewUser() {

    this.firstName = this.readValueFromForm("FirstName")
    this.lastName = this.readValueFromForm("LastName")
    this.password = this.readValueFromForm("Password")
    this.address = this.readValueFromForm("Address")
    this.username = this.readValueFromForm("Username")
    if (this.firstName != '' && this.lastName != '' && this.password != '' && this.address != '' && this.username != '') {
      if (this.checkIFUsernameAlreadyExists(this.username)) {
        this.openDialog("This username already exists!");
        return;
      }

      const newUser :User=({
        id:null,
        firstName:this.firstName,
        lastName:this.lastName,
        username:this.username,
        address:this.address,
        password:this.password,
        role:"ROLE_USER",

      })

      await this.employeeService.addNewUser(newUser).finally(() => this.router.navigateByUrl("/app-user-page"));

    } else {
      this.openDialog("Complete all fields!");
    }
  }


  goTOUserPage() {
    this.router.navigateByUrl('app-user-page')
  }
}


