import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {AddUserPageComponent} from "./add-user-page/add-user-page.component";
import {EditUserPageComponent} from "./edit-user-page/edit-user-page.component";
import {DevicePageComponent} from "./device-page/device-page.component";
import {AddDevicePageComponent} from "./add-device-page/add-device-page.component";
import {EditDevicePageComponent} from "./edit-device-page/edit-device-page.component";
import {ClientPageComponent} from "./client-page/client-page.component";
import {ChartComponent} from "./chart/chart.component";
import {AuthGuard} from "./services/auth.guard";
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./home-page/home-page.component";
import {NotificationPageComponent} from "./notification-page/notification-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'app-user-page',
    component: UserPageComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'add-user-page',
    component: AddUserPageComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'app-notification-page',
    component: NotificationPageComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['ROLE_USER']
    }
  },
  {
    path: 'app-edit-user-page',
    component: EditUserPageComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'app-device-page',
    component: DevicePageComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'app-add-device-page',
    component: AddDevicePageComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'app-edit-device-page',
    component: EditDevicePageComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'app-client-page',
    component: ClientPageComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['ROLE_USER']
    }
  },
  {
    path: 'app-chart',
    component: ChartComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['ROLE_USER']
    }
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
