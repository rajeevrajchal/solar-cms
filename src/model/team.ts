import { USER } from "./user";

export interface Team {
  id: string;
  name: string;
  point: number;
  users: {
    user: USER;
  }[];
}
