export type ASSIGN_OWNER_PROJECT = {
  project_id: string;
  owner_id: string;
  owner_type: string;
};

export type ELECTRIC_LOAD = {
  watt: number;
  hour: number;
  name: string;
  quantity: number;
};
