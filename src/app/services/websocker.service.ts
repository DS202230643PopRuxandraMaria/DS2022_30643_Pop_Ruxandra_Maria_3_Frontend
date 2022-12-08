import {Injectable} from "@angular/core";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {Notification} from "../models/notification";


const USER_KEY = 'auth-user';

@Injectable()
export class WebSocketService {
  // @ts-ignore
  not: Notification;
  greetings: string[] = [];
  disabled = true;

  webSocketEndPoint: string = 'http://20.218.207.52:8080/ws';
  stompClient: any;
  dialogRef: MatDialogRef<WarningDialogComponent> | undefined;

  constructor(
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.connect();
  }


  connect() {
    let topic: string;
    let user = window.sessionStorage.getItem(USER_KEY);

    let id = 0;
    if (user) {
      id = JSON.parse(user).id;
    }
    topic = "/topic/alert." + id;
    console.log("Initialize WebSocket Connection", id);


    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function () {

      _this.stompClient.subscribe(topic, function (sdkEvent: any) {

        const newNotification: Notification = ({
          id: null,
          idUser: JSON.parse(sdkEvent.body)["idUser"],
          message: JSON.parse(sdkEvent.body)["message"],
          dates: JSON.parse(sdkEvent.body)["dates"]
        })

        _this.not = newNotification;
        _this.openDialog(newNotification.message + '.', newNotification.dates);
        //sa se inchida dupa o perioada de timp
        setTimeout(function () {
          _this.dialog.closeAll();
        }, 3000);
      });

    },);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  openDialog(message: string, message2: string) {
    this.dialogRef = this.dialog.open(WarningDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = message;
    this.dialogRef.componentInstance.confirmMessage2 = message2;

  }
}
