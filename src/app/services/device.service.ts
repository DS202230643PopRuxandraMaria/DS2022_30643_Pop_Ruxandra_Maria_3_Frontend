import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {Device} from "../models/device";


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  URLDevice = "http://20.218.207.52:8080/device";

  constructor(private http: HttpClient) {
  }

  getDeviceById(idDevice: number) {
    return this.http.get(this.URLDevice + '/byID/' + idDevice,);
  }

  async getDeviceUser(idDevice: number) {
    return this.http.get(this.URLDevice + '/findUserDevice/' + idDevice).toPromise();
  }

  getAllDevice() {
    return this.http.get<Device[]>(this.URLDevice + '/getAllDevice');
  }

  deleteDevice(id: number): Observable<any> {
    return this.http.delete(`${this.URLDevice}/${id}`, {responseType: 'text'});
  }

  addUserToDevice(idUser: number) {
    return this.http.post<any>(this.URLDevice + '/findUserByID/' + idUser, null);
  }

  addNewDevice(list: Device) {
    return this.http.post<any>(this.URLDevice + '/add', list).toPromise();
  }

  getAllUsersWithDevice() {
    return this.http.get<User[]>(this.URLDevice + '/getUsers');
  }

  getUsersWithoutDevice() {
    return this.http.get<User[]>(this.URLDevice + '/getUserWithoutDevices');
  }

  getOwner(idDevice: number) {
    return this.http.get<User>(this.URLDevice + '/findOwner/' + idDevice)
  }

  updateDevice(device: Device, username: number) {
    return this.http.post(this.URLDevice + "/updateDevice/" + username, device).toPromise();
  }
}
