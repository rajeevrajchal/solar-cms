import { USER_ROLE } from "@enum/user.role";
import { PROJECTS } from "./project";
import { QUOTE } from "./quote";

export type USER = {
  id: string;
  email: string;
  role: USER_ROLE;
  name: string;
  phone: string;
  location: string;
  type?: string;
  is_active: boolean;
  is_temp: boolean;
  project: PROJECTS[];
  quote: QUOTE[];
  created: Date;
};
