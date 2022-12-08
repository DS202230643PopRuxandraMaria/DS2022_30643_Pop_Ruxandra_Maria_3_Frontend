import {Component, OnInit} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {Device} from "../models/device";
import {DeviceService} from "../services/device.service";
import {faMapMarkerAlt, faTrash, faBolt} from "@fortawesome/free-solid-svg-icons";
import {faEdit, faUser} from "@fortawesome/free-solid-svg-icons";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-device-page',
  templateUrl: './device-page.component.html',
  styleUrls: ['./device-page.component.scss']
})
export class DevicePageComponent implements OnInit {

  user: User | undefined;
  deviceList: Device[] = [];
  faTrash = faTrash;
  faEdit = faEdit;
  faMarker = faMapMarkerAlt;
  faUser = faUser;
  faBolt = faBolt;
  faInfo = faInfoCircle;
  dialogRef: MatDialogRef<ConfirmDialogComponent> | undefined;

  constructor(private deviceService: DeviceService,
              public dialog: MatDialog,
              private router: Router) {
  }

  async ngOnInit() {
    this.getDevice();
  }

  async getDevice() {
    const categories$ = this.deviceService.getAllDevice();
    this.deviceList = await lastValueFrom(await categories$);
  }

  addDevice() {
    this.router.navigateByUrl("app-add-device-page");
  }

  deleteDeviceConfirmation(idDevice: any) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.deviceService.deleteDevice(idDevice).subscribe()
        this.deviceList = this.deviceList.filter(item => item.id != idDevice)
      }
    });

  }

  editDevice(id: number) {
    this.router.navigate(['app-edit-device-page'], {
      state: {idDevice: id}
    })

  }

   check(user :User | null |undefined){
    if(user==null){
      return false;
    }
    return true;
   }
}
