import {Component, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UserService} from "../services/user.service";
import {lastValueFrom} from "rxjs";
import {User} from "../models/user";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {Router} from "@angular/router";
import {faUndo} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit, OnChanges {

  @Input()
  usernameCurrent: string = '';

  faUndo=faUndo;

  list: string[] = [];
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  password: string = '';
  username: string = '';
  //@ts-ignore
  currentUser: User ;
  dialogRef: MatDialogRef<WarningDialogComponent> | undefined;

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private router: Router) {
  }

  readValueFromForm(elementID: string) {
    return (<HTMLInputElement>document.getElementById(elementID)).value;
  }



  async autocompleteForm(user: User) {
    (<HTMLInputElement>document.getElementById("LastName")).value = user.lastName;
    (<HTMLInputElement>document.getElementById("FirstName")).value = user.firstName;
    (<HTMLInputElement>document.getElementById("Password")).value = user.password;
    (<HTMLInputElement>document.getElementById("Username")).value = user.username;
    (<HTMLInputElement>document.getElementById("Address")).value = user.address;
  }

  openDialog(message: string) {
    this.dialogRef = this.dialog.open(WarningDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = message;
  }

  async ngOnInit() {
    this.usernameCurrent = history.state.username;
    const categories$ = this.userService.findUserByUsername(this.usernameCurrent)
    this.currentUser = await lastValueFrom(await categories$);
    await this.autocompleteForm(this.currentUser);
  }

  async ngOnChanges() {
    const categories$ = this.userService.findUserByUsername(this.usernameCurrent)
    this.currentUser = await lastValueFrom(await categories$);
    await this.autocompleteForm(this.currentUser);
  }

  async editUser() {

    this.firstName = this.readValueFromForm("FirstName")
    this.lastName = this.readValueFromForm("LastName")
    this.password = this.readValueFromForm("Password")
    this.address = this.readValueFromForm("Address")

    if (this.firstName != '' && this.lastName != '' && this.password != '' && this.address != '') {
     this.currentUser.firstName=this.firstName;
     this.currentUser.lastName=this.lastName;
     this.currentUser.password=this.password;
     this.currentUser.address=this.address;


      await this.userService.updateUser(this.currentUser).finally(() => this.goTOUserPage());

    } else {
      this.openDialog("Complete all fields!");
    }

  }

  async discardChanges() {
    if (this.currentUser) {
      await this.autocompleteForm(this.currentUser);
    }

  }

  goTOUserPage() {
    this.router.navigateByUrl('app-user-page')
  }

}
