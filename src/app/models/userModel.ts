import {Device} from "./device";

export interface User {
  id: number | null,
  firstName: string,
  lastName: string,
  username: string,
  address: string,
  password: string,
  role: string
}

