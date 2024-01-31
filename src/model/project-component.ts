export type PROJECT_COMPONENT = {
  id: string;
  component_type: string;
  connection_type: string;
  nature: string;
  name: string;
  voltage: number;
  amperage: number;
  loose_connection_factor: number;
  efficiency: number;
  aging: number;
  dod: number;
  operation_temperature: any;
  each_item_rating_volts: number;
  each_item_rating_ampre: number;
  quantity: number;
  project_id: string;
};
