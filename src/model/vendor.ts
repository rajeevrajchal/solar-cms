import { INVENTORY } from "./inventory";

export type VENDOR = {
  readonly id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  code: string;
  description: string;
  inventory: INVENTORY[];
  // timestamp
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
