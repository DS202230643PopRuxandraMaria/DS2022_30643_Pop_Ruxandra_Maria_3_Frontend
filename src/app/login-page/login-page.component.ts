import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {WebSocketService} from "../services/websocker.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


username:string='';
  password:string='';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = '';
  dialogRef: MatDialogRef<WarningDialogComponent> | undefined;

  constructor(private authService: AuthService,
              private tokenStorage: TokenService,
              private router: Router,
              private webService:WebSocketService,
              public dialog: MatDialog,) {
  }

  openDialog(message1: string ,message2:string) {
    this.dialogRef = this.dialog.open(WarningDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = message1;
    this.dialogRef.componentInstance.confirmMessage2 = message2;

  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  readValueFromForm(elementID: string) {
    return (<HTMLInputElement>document.getElementById(elementID)).value;
  }

  onSubmit(): void {


    this.authService.login(this.username, this.password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        localStorage.setItem('STATE', 'true');
        localStorage.setItem('ROLE', data.role)
        this.webService.connect();
        this.router.navigateByUrl('home')
      },
      error: err => {
        localStorage.setItem('STATE', 'false');
        this.openDialog("Bad credentials! ","Try again!");
      }
    });
    this.isLoggedIn = this.isLogged();
  }




  isLogged() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLoggedIn = true;
    else
      this.isLoggedIn = false;
    return this.isLoggedIn;
  }

  reloadPage(): void {
    window.location.reload();
  }


  isAllComplete() {
    this.username = this.readValueFromForm('username');
    this.password = this.readValueFromForm('password');
    if(this.username!=' '&& this.password!='')
      return true
    return false;
  }

}
