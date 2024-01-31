import { BATTERY_TYPE_NAME } from "@enum/battery-type.enum";
import { PANEL_TYPE_NAME } from "@enum/panel-type.enum";
import { FaCarBattery } from "react-icons/fa";
import { GiPowerGenerator, GiSolarPower } from "react-icons/gi";

export const component_type: any = {
  panel: {
    icon: <GiSolarPower color="orange" size={24} />,
    nature: (key: string) => PANEL_TYPE_NAME[key],
    total_quantity: "Panel Quantity",
  },
  battery: {
    icon: <FaCarBattery color="red" size={24} />,
    nature: (key: string) => BATTERY_TYPE_NAME[key],
    total_quantity: "Battery Quantity",
  },
  invertor: {
    icon: <GiPowerGenerator color="blue" size={24} />,
    nature: () => "invertor",
    total_quantity: "Invertor Quantity",
  },
};

export const component_type_options = [
  {
    label: "Panel",
    value: "panel",
  },
  {
    label: "Battery",
    value: "battery",
  },
  {
    label: "Invertor",
    value: "invertor",
  },
];
