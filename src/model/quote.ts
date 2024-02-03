import { QUOTE_STATUS } from "@enum/quote-status.enum";
import { PROJECTS } from "./project";

export type QUOTE = {
  id: string;
  name: string;
  inventory_cost: number;
  net_total: number;
  installation_cost: number;
  discount: number;
  adjustment: number;
  vat: number;
  verification_file: null;
  status: QUOTE_STATUS;
  project_id: string;
  customer_id: string;
  created_by: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  project: PROJECTS;
};
