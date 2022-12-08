import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Notification} from "../models/notification";
import {lastValueFrom} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss']
})

export class NotificationPageComponent implements OnInit {
  notifications: Notification[] = [];
  isHover: boolean = false;

  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<NotificationPageComponent>) {
  }

  async ngOnInit() {
    let user = window.sessionStorage.getItem(USER_KEY);
    let id = 0;
    if (user) {
      id = JSON.parse(user).id;
    }
    const users$ = this.userService.getAllNotification(id);
    this.notifications = await lastValueFrom(await users$);

  }


  alo(notificationID: number) {
    console.log("Sal ", notificationID)
    this.userService.deleteNotification(notificationID).subscribe()
    this.notifications = this.notifications.filter(item => item.id != notificationID)
  }
}
