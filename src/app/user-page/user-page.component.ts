import {Component, OnInit} from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {lastValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  show: boolean = false;
  userList: User[] = [];
  faCoffee = faCoffee;
  faEdit = faEdit;
  faTrash = faTrash;
  dialogRef: MatDialogRef<ConfirmDialogComponent> | undefined;

  constructor(private employeeService: UserService,
              public dialog: MatDialog,
              private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    await this.getAllUsers();
  }

  async getAllUsers() {
    const categories$ = this.employeeService.getAllUserByRole();
    this.userList = await lastValueFrom(await categories$);
  }


  deleteEmployeeConfirmation(id: string) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteUser(id).subscribe()
        this.userList = this.userList.filter(item => item.username != id)
      }
    });
  }

  addEmployee() {
    this.router.navigateByUrl('add-user-page');
  }

  updateShow(value: boolean) {
    this.show = value;
  }

  editUser(username: string) {

    this.router.navigate(['app-edit-user-page'], {
      state: {username: username}
    })
  }

}
