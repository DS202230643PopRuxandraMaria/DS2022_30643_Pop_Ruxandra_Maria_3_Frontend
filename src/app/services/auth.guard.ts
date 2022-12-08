import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authorizationService: AuthService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data['allowedRoles'];
    const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);
    if (!isAuthorized) {
      this.router.navigateByUrl('/home');
    }

    return isAuthorized;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data['allowedRoles'];
    const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);
    if (!isAuthorized) {
      this.router.navigateByUrl('/home');
    }

    return isAuthorized;
  }
}
