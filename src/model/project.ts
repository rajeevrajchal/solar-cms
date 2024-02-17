import { STATUS } from "@enum/status.enum";
import { USER } from "./user";
import { ELECTRICLOAD } from "./electric_load";
import { PROJECT_COMPONENT } from "./project-component";
import { EQUIPMENT } from "./equipment";
import { QUOTE } from "./quote";

export type PROJECT_MODEL = {
  id: string;
  model_url: string;
  image_id: string;
  project_id: string;
};

export type PROJECTS = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  location: string;

  actual_area: number;
  sun_hour_summer: number;
  sun_hour_winter: number;
  sun_hour_monsoon: number;
  sun_hour_average: number;
  sun_direction: string;
  total_sun_power_need: number;
  correction_factor: number;
  power_out_watt: number;
  power_out_voltage: number;
  reserve_power_for: number;
  panel_info: string;
  battery_type: string;

  cleaning: boolean;
  mark_location_customer: boolean;

  start_date: Date;
  end_date: Date;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  customer_id: string;
  creator_id: string;
  engineer_id: string;
  parent_id: string;

  estimated_area: number;
  capacity: number;

  equipment: EQUIPMENT[];
  quote: QUOTE[];

  electric_load: ELECTRICLOAD[];
  component: PROJECT_COMPONENT[];
  status: STATUS;
  customer: USER;
  creator: USER;
  engineer: USER;
  model: PROJECT_MODEL[];

  children: PROJECTS[];
};
