import { INVENTORY } from "./inventory";

export type EQUIPMENT = {
  readonly id: string;
  quantity: number;
  inventory: INVENTORY;
};
