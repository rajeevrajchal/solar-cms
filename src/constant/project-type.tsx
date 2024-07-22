import { FaArrowUpFromWaterPump } from "react-icons/fa6";
import { GiLowTide, GiWindTurbine } from "react-icons/gi";
import { MdSolarPower } from "react-icons/md";

export const project_type: any = {
  solar: {
    icon: <MdSolarPower className="text-yellow-500" />,
    label: "solar",
  },
  wind: {
    icon: <GiWindTurbine className="text-gray-400" />,
    label: "wind",
  },
  tidal: {
    icon: <GiLowTide className="text-blue-400" />,
    label: "tidal",
  },
  hydro: {
    icon: <FaArrowUpFromWaterPump className="text-gray-400" />,
    label: "hydro",
  },
};
