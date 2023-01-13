import {Timestamp} from "rxjs";

export interface ChatMessage{
  id:number |null,
  message: string,
  timestamp:Timestamp<any> |null,
  idReceiver:number |null,
  idSender :number|null,
}
