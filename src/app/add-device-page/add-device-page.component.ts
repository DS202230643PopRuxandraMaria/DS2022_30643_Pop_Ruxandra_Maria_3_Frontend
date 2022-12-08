import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {lastValueFrom} from "rxjs";

import {DeviceService} from "../services/device.service";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {faUndo} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../services/user.service";
import {Device} from "../models/device";
import {newMeasurement} from "../models/measurement";

@Component({
  selector: 'app-add-device-page',
  templateUrl: './add-device-page.component.html',
  styleUrls: ['./add-device-page.component.scss']
})
export class AddDevicePageComponent implements OnInit {

  constructor(private userService: UserService,
              private deviceService: DeviceService,
              public dialog: MatDialog,
              private router: Router) {
  }

  faUndo = faUndo;
  maxConsumation: any = '';
  description: string = '';
  address: string = '';
  owner: any = "None";
  usersWithoutDevice: User[] = [];

  newDevice: string[] = [];
  dialogRef: MatDialogRef<WarningDialogComponent> | undefined;
  private userOfDevice: User | null | undefined;


  async ngOnInit(): Promise<void> {
    await this.getUsersWithoutDevice();
  }

  async getUsersWithoutDevice() {
    const usersWithoutDevice$ = this.deviceService.getUsersWithoutDevice()
    this.usersWithoutDevice = await lastValueFrom(await usersWithoutDevice$);
  }

  readValueFromForm(elementID: string) {
    return (<HTMLInputElement>document.getElementById(elementID)).value;
  }

  openDialog(message: string) {
    this.dialogRef = this.dialog.open(WarningDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = message;
  }

  async createDevice() {
    this.description = this.readValueFromForm("Description")
    this.address = this.readValueFromForm("Address")
    this.maxConsumation = this.readValueFromForm("MaxConsumation")
    if (this.description != '' && this.address != '' && this.maxConsumation != '') {

      if (this.owner != "None") {
        const getUser = this.deviceService.addUserToDevice(+this.owner);
        this.userOfDevice = await lastValueFrom(await getUser);

      }

      const newDevice: Device = ({
        id: null,
        description: this.description,
        address: this.address,
        maxConsumation: +this.maxConsumation,
        measurement: newMeasurement,
        user: this.userOfDevice,
      })

      await this.deviceService.addNewDevice(newDevice);
      this.goTODevicePage();
    } else {
      this.openDialog("Complete all fields!");
    }
  }

  goTODevicePage() {
    this.router.navigateByUrl('app-device-page')
  }
}
