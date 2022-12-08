import {Component, Input, OnInit} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {Device} from "../models/device";
import {faInfoCircle, faLineChart, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {faUser,faBolt} from "@fortawesome/free-solid-svg-icons";
import {ChartDataMapper} from "../models/chartData";

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  @Input()
  usernameCurrent: string = '';
  user: User | undefined;
  device: Device | undefined;
  faChart = faLineChart;
  measuremets: ChartDataMapper[] = [];
  showConsumation: boolean = false;
  showDate: boolean = false;
  idDevice: number = 0;
  faUser = faUser;
  faBolt = faBolt;
  faInfo = faInfoCircle;
  faMarker = faMapMarkerAlt;

  constructor(private userService: UserService) {
  }

  show: boolean = false;
  currentDate: Date = new Date();


  async ngOnInit() {

    this.usernameCurrent = JSON.parse(<string>window.sessionStorage.getItem(USER_KEY)).username;

    const users$ = this.userService.findUserByUsername(this.usernameCurrent)
    this.user = await lastValueFrom(await users$);
    const devices$ = this.userService.getDevice(this.usernameCurrent)
    this.device = await lastValueFrom(await devices$);

  }


  async generateConsumation(idDevice: number) {
    this.idDevice = idDevice;
    await this.generateChart()
    this.showConsumation = true
    this.showDate = true


  }

  async generateChart() {
    this.showConsumation = false;
    let curr_day = this.currentDate.getDate();

    let curr_month = this.currentDate.getMonth();

    let curr_year = this.currentDate.getFullYear()

    const measurement$ = this.userService.getMeasurement(this.idDevice, curr_day, curr_month, curr_year)

    this.measuremets = await lastValueFrom(await measurement$);
    console.log("mas ",this.measuremets)
    localStorage.setItem("Date", JSON.stringify(this.measuremets))
  }

  async changeDate() {
    //@ts-ignore
    this.currentDate = (<HTMLInputElement>document.getElementById("date")).valueAsDate;
    await this.generateChart();
    this.showConsumation = true
  }

  closeConsumation() {
    this.showConsumation = false;
    this.showDate = false;
  }
}
