export type ELECTRIC_LOAD = {
  readonly id: string;
  readonly project_id: string;

  name: string;
  watt: number;
  quantity: number;
  hour: number;
  watt_per_hour: number;
};
