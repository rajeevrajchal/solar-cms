export interface CREATE_PROJECT {
  type: string;
  name: string;
  roof_area: number;
  solar_irradiance: number;
  shading_factors: number;
  roof_orientation: string;
  tilt_angle: number;
  power_out_watt: number;
  power_out_voltage: number;
  reserve_power_for: number;
  electrical_capacity: number;
  panel_type: string;
}
