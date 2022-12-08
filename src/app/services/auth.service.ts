import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://20.218.207.52:8080/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = '';
  role: string | null = '';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      username,
      password
    }, httpOptions);

  }

  getRole() {
    this.role = localStorage.getItem('ROLE');
    return this.role;
  }

  isLogged() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLoggedIn = true;
    else
      this.isLoggedIn = false;
    return this.isLoggedIn;
  }
  isAuthorized(givenRole:String){
    return localStorage.getItem('ROLE')==givenRole;
  }

}
