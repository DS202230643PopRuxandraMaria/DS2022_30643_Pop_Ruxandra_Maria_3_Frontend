import {Device} from "./device";

export interface ChartDataMapper {
  hour: string,
  consumation: number
  device?: Device
}
