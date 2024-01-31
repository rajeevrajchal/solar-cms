import { INVENTORY_KIND } from "@enum/inventory_kind.enum";

export type PROJECT_INVENTORY = {
  [kind in INVENTORY_KIND]: {
    qty: number;
    id: string;
    extra: string | object | number;
  };
};
