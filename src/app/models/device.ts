import {User} from "./user";
import {Measurement} from "./measurement";


export interface Device {
  id: number | null,
  description: string,
  address: string,
  maxConsumation: number,
  user: User | null |undefined,
  measurement: Measurement
}
