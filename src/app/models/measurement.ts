import {Timestamp} from "rxjs";


export interface Measurement{
  idMeasurement:number | null,
  timestamp:Timestamp<any> |null,
  maxConsumation:number |null


}

export  const newMeasurement=({
  idMeasurement:null,
  timestamp:null,
  maxConsumation:null
})
