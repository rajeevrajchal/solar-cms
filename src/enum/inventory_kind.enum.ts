export enum INVENTORY_KIND {
  SOLAR_PANEL = "solar_panel",
  BATTERY = "battery",
  WIRE = "wire",
  BRACKETS = "bracket",
  OTHERS = "others",
}

export const INVENTORY_NAME: Record<INVENTORY_KIND, string> = {
  [INVENTORY_KIND.BATTERY]: "battery",
  [INVENTORY_KIND.WIRE]: "wire",
  [INVENTORY_KIND.BRACKETS]: "brackets",
  [INVENTORY_KIND.OTHERS]: "others",
  [INVENTORY_KIND.SOLAR_PANEL]: "solar panel",
};
