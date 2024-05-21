import { PROJECT_TYPE } from "@enum/project-type.enum";
import { STATUS } from "@enum/status.enum";
import { ELECTRICLOAD } from "./electric_load";
import { EQUIPMENT } from "./equipment";
import { PROJECT_COMPONENT } from "./project-component";
import { QUOTE } from "./quote";
import { USER } from "./user";

export type PROJECT_MODEL = {
  id: string;
  model_url: string;
  image_id: string;
  project_id: string;
};

export type PROJECT_INFO = {
  id: string;
  area: number;
  power_out_watt: number;
  power_out_voltage: number;
  reserve_power_for: number;
  environmental_data?: string;

  tidal_range?: number;
  tidal_currents?: number;
  tidal_cycle_duration?: number;
  bathymetry_data?: string;
  water_density?: number;
  seabed_conditions?: string;

  flow_rate?: number;
  head?: number;
  reservoir_capacity?: number;
  water_quality?: string;
  environmental_impact?: string;

  roof_area?: number;
  roof_orientation?: string;
  shading_factors?: string;
  electrical_capacity?: string;
  solar_irradiance?: number;
  temperature_data?: string;

  terrain_elevation?: number;
  terrain_roughness?: number;
  obstacle_data?: number;
  wind_measurements?: object;
};

export type PROJECTS = {
  id: string;
  code: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  location: string;
  mark_location_customer: boolean;

  type: PROJECT_TYPE;
  status: STATUS;
  start_date: Date;
  end_date: Date;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  customer_id: string;
  customer: USER;

  creator_id: string;
  creator: USER;

  engineer_id: any;
  engineer: USER | null;

  sale_user_id: string;
  sale_user: USER | null;

  project_info: PROJECT_INFO;

  equipment: EQUIPMENT[];
  quote: QUOTE[];

  electric_load: ELECTRICLOAD[];
  component: PROJECT_COMPONENT[];

  model: PROJECT_MODEL[];

  parent_id: any;
  children: PROJECTS[];
};
