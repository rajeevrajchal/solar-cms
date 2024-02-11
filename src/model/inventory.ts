import { INVENTORY_KIND } from "@enum/inventory_kind.enum";
import { VENDOR } from "./vendor";

export type INVENTORY = {
  id: string;
  name: string;
  category: INVENTORY_KIND;
  nature: string;
  product_image: any;
  description: string;
  watt: number;
  voltage: number;
  ampere: number;
  buying_cost: number;
  selling_cost: number;
  max_flat_discount: number;
  max_discount: number;
  status: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  vendor_id: string;
  vendor: VENDOR;
};
