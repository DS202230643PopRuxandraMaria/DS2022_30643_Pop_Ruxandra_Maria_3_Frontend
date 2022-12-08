import {Injectable} from '@angular/core';
import {lastValueFrom, Observable, publish, Subject, tap} from 'rxjs';
import {WebApiService} from "./web-api.service";
import {User} from "../models/user";
import {HttpParams} from "@angular/common/http";
import {Device} from "../models/device";
import {ChartDataMapper} from "../models/chartData";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as  Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Notification} from "../models/notification";

@Injectable({
  providedIn: 'root'
})

export class UserService {


  URLUser = "http://20.218.207.52:8080/user";
  URLMeasurement = "http://20.218.207.52:8080/measurement";

  constructor(private http: HttpClient) {
  }

  async getAllNotification(userID: number) {
    return this.http.get<Notification[]>(this.URLUser + '/getNotifications/' + userID);
  }

  async getAllUser() {
    return this.http.get<User[]>(this.URLUser + '/getAllUsers');
  }

  async getAllUserByRole() {
    return this.http.get<User[]>(this.URLUser + '/getAllByRole');
  }

  getMeasurement(idDevice: number, day: number, month: number, year: number) {
    let params = new HttpParams().set("day", day).set("month", month).set("year", year); //Create new HttpParams
    return this.http.get<ChartDataMapper[]>(this.URLMeasurement + '/consumation/' + idDevice, {params: params})
  }


  getDevice(username: string) {
    return this.http.get<Device>(this.URLUser + '/getDevice/' + username)
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.URLUser}/${id}`, {responseType: 'text'});
  }

  addNewUser(user: User) {
    return this.http.post<any>(this.URLUser + '/add', user).toPromise();
  }


  updateUser(user: User) {
    return this.http.post<any>(this.URLUser + '/update', user
    ).toPromise();
  }

  findUserByUsername(username: string) {
    return this.http.get<User>(this.URLUser + '/' + username)
  }

  deleteNotification(idNotification: number): Observable<any> {
    return this.http.delete(this.URLUser+'/deleteNotification/'+idNotification, {responseType: 'text'});
  }


}
