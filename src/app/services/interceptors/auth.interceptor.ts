import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Observable, tap, throwError} from "rxjs";
import {TokenService} from "../token.service";
import {Router} from "@angular/router";
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = JSON.parse(<string>window.sessionStorage.getItem(USER_KEY));
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {

        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
        }
      }));
  }



}

