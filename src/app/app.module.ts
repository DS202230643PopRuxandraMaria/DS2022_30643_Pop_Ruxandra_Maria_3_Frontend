import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {LayoutModule} from '@angular/cdk/layout';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {MatDialogModule} from '@angular/material/dialog';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {MatToolbarModule} from "@angular/material/toolbar";
import {UserPageComponent} from './user-page/user-page.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {AddUserPageComponent} from "./add-user-page/add-user-page.component";
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {WarningDialogComponent} from './warning-dialog/warning-dialog.component';
import {EditUserPageComponent} from './edit-user-page/edit-user-page.component';
import {MatTableModule} from "@angular/material/table";
import {DevicePageComponent} from './device-page/device-page.component';
import {AddDevicePageComponent} from './add-device-page/add-device-page.component';
import {TwoDigitDecimalNumberDirective} from "./two-digit-decimal-number.directive";
import {EditDevicePageComponent} from './edit-device-page/edit-device-page.component';
import {ClientPageComponent} from './client-page/client-page.component';
import {ChartComponent} from './chart/chart.component';
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {AuthInterceptor} from "./services/interceptors/auth.interceptor";
import {AuthService} from "./services/auth.service";
import {AppRoutingModule} from "./app-routing.module";
import {HomePageComponent} from './home-page/home-page.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ButtonModule} from '@syncfusion/ej2-angular-buttons';
import {CarouselModule} from '@syncfusion/ej2-angular-navigations';
import {IvyCarouselModule} from 'angular-responsive-carousel2';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';
import {WebSocketService} from "./services/websocker.service";
import { NotificationPageComponent } from './notification-page/notification-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserPageComponent,
    AddUserPageComponent,
    ConfirmDialogComponent,
    WarningDialogComponent,
    EditUserPageComponent,
    DevicePageComponent,
    AddDevicePageComponent,
    TwoDigitDecimalNumberDirective,
    EditDevicePageComponent,
    ClientPageComponent,
    ChartComponent,
    HomePageComponent,
    NotificationPageComponent,

  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    Ng2OrderModule,
    FontAwesomeModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    MatTableModule,
    TableModule,
    DialogModule,
    DialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    MatTooltipModule,
    NgbModule,
    NgbCarouselModule,
    ButtonModule, CarouselModule,
    IvyCarouselModule,
    MdbCarouselModule
  ],

  providers: [
    [WebSocketService],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
