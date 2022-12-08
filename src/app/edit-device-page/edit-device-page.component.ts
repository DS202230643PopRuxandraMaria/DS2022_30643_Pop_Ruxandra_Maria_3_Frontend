import {Component, Input, OnInit} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {UserService} from "../services/user.service";
import {DeviceService} from "../services/device.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../models/user";
import {Device} from "../models/device";
import {Router} from "@angular/router";
import {faUndo} from "@fortawesome/free-solid-svg-icons";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";

@Component({
  selector: 'app-edit-device-page',
  templateUrl: './edit-device-page.component.html',
  styleUrls: ['./edit-device-page.component.scss']
})
export class EditDevicePageComponent implements OnInit {
  @Input()
  idCurrent: number = 0;
  owner: string = "None"
  usersWithDevice: User[] = [];
  allUsers: User[] = [];
  usersWithoutDevice: User[] = [];
  //@ts-ignore
  currentDevice: Devive;
  faUndo = faUndo;
  description: string = '';
  address: string = '';
  maxConsumation: string = '';
  dialogRef: MatDialogRef<WarningDialogComponent> | undefined;

  constructor(private userService: UserService,
              private deviceService: DeviceService,
              public dialog: MatDialog,
              private router: Router) {

  }

  userDevice: User | undefined;

  async autocompleteForm(device: Device) {

    (<HTMLInputElement>document.getElementById("Description")).value = device.description;
    (<HTMLInputElement>document.getElementById("MaxConsumation")).value = String(device.maxConsumation);
    (<HTMLInputElement>document.getElementById("Address")).value = device.address;
    if (device.user !== null) {
      //@ts-ignore
      this.owner = device.user?.id;
    }

  }


  async ngOnInit(): Promise<void> {

    this.idCurrent = history.state.idDevice;
    const device$ = this.deviceService.getDeviceById(this.idCurrent);

    this.currentDevice = await lastValueFrom(await device$);

    await this.getAllUsers();
    this.autocompleteForm(this.currentDevice)
  }

  async getAllUsers() {

    const allUsers$ = this.userService.getAllUser();
    this.allUsers = await lastValueFrom(await allUsers$);
    const usersWithDevice$ = this.deviceService.getAllUsersWithDevice();
    this.usersWithDevice = await lastValueFrom(await usersWithDevice$);

    this.usersWithoutDevice = this.allUsers.filter(o => o.role === 'ROLE_USER' && !this.usersWithDevice.some(i => i.id === o.id));
    if (this.currentDevice.user != null) {
      this.usersWithoutDevice.push(this.currentDevice.user)
    }
  }

  readValueFromForm(elementID: string) {
    return (<HTMLInputElement>document.getElementById(elementID)).value;
  }


  async editUser() {
    this.description = this.readValueFromForm("Description")
    this.address = this.readValueFromForm("Address")
    this.maxConsumation = this.readValueFromForm("MaxConsumation")
    this.address = this.readValueFromForm("Address")
    if (this.description != '' && this.address != '' && this.maxConsumation != '') {
      this.currentDevice.address = this.address;
      this.currentDevice.description = this.description;
      this.currentDevice.maxConsumation = this.maxConsumation;
      if (this.owner == 'None') {
        await this.deviceService.updateDevice(this.currentDevice, 0).finally(() => this.goTODevicePage());
      } else {
        // @ts-ignore
        await this.deviceService.updateDevice(this.currentDevice, +this.owner).finally(() => this.goTODevicePage());
      }
    } else {
      this.openDialog("Complete all fields!");
    }
  }

  async discardChanges() {
    if (this.currentDevice) {
      await this.autocompleteForm(this.currentDevice);
    }
  }

  goTODevicePage() {
    this.router.navigateByUrl("app-device-page")
  }

  openDialog(message: string) {
    this.dialogRef = this.dialog.open(WarningDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = message;
  }
}
