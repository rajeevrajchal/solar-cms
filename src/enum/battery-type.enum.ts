export enum BATTERY_TYPE {
  ACID = "acid",
  DRY_CELL = "dry_cell",
}

export const BATTERY_TYPE_NAME: any = {
  [BATTERY_TYPE.ACID]: "acid",
  [BATTERY_TYPE.DRY_CELL]: "dry cell",
};

export const batteryTypeOptions = [
  { label: BATTERY_TYPE_NAME[BATTERY_TYPE.ACID], value: BATTERY_TYPE.ACID },
  {
    label: BATTERY_TYPE_NAME[BATTERY_TYPE.DRY_CELL],
    value: BATTERY_TYPE.DRY_CELL,
  },
];
