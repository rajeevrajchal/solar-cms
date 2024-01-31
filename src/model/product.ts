import { STATUS } from "@enum/status.enum";
import { LOCATION } from "@type/location-type";

export type PRODUCT_TYPE = "panel" | "power_house";

export type PRODUCT_PANEL_ATTRIBUTE = {
  inclination: number;
  watt: number;
  voltage: number;
  panels: number;
  area: number;
  connection: "series" | "parallel" | "both";
};

export type PRODUCT_POWER_HOUSE_ATTRIBUTE = {
  watt: number;
  voltage: number;
  batteries: number;
  connection: "series" | "parallel" | "both";
};

type ProductAttributes<T extends PRODUCT_TYPE> = T extends "panel"
  ? PRODUCT_PANEL_ATTRIBUTE
  : T extends "power_house"
  ? PRODUCT_POWER_HOUSE_ATTRIBUTE
  : never;

export type PRODUCT = {
  id: string;
  slug: string;

  location: LOCATION;
  status: STATUS;

  max_energy?: number;
  min_energy?: number;

  start_date: string;
  end_date: string;

  worker_team: string;

  type: PRODUCT_TYPE;
  inventory_id: string;

  // attributes
  attributes: ProductAttributes<PRODUCT_TYPE>;

  is_deleted: boolean;

  // timestamp
  createdAt: string;
  updatedAt: string;
};
