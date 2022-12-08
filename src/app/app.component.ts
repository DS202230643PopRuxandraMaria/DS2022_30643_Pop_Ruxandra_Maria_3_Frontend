import {Component} from '@angular/core';
import {faBolt} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope, faPhone, faPrint} from "@fortawesome/free-solid-svg-icons";
import {WebSocketService} from "./services/websocker.service";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationPageComponent} from "./notification-page/notification-page.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  faBolt = faBolt;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faHome = faHome;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faPrint = faPrint;
  faBell = faBell;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  show: any = false;

  title = 'Energy Platform';

  dialogRef: MatDialogRef<NotificationPageComponent> | undefined;

  constructor(private router: Router,
              public authService: AuthService,
              private webService: WebSocketService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.webService.connect();
  }

  getRole() {
    const role = localStorage.getItem("ROLE")
    return role === "ROLE_ADMIN";
  }

  isLogged() {
    const loggedIn = localStorage.getItem('STATE');
    return loggedIn === 'true';
  }

  logOut() {
    this.webService._disconnect();
    this.router.navigateByUrl("/home")
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  isClicked() {
    this.show = true;
    this.dialogRef = this.dialog.open(NotificationPageComponent, {
      disableClose: false
    });
    this.dialogRef.afterClosed().subscribe(() =>
      this.show = false
    )
  }

}
