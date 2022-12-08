import {User} from "./user";

export interface Notification{
  id:number |null,
  idUser: number | null,
  message: string,
  dates: string,
}
