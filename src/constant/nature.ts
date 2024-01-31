import { batteryTypeOptions } from "@enum/battery-type.enum";
import { panelTypeOptions } from "@enum/panel-type.enum";

export default {
  panel: panelTypeOptions,
  battery: batteryTypeOptions,
} as Record<string, any>;
