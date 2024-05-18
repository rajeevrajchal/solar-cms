export enum PROJECT_TYPE {
  SOLAR = "solar",
  TIDAL = "tidal",
  WIND = "wind",
  HYDRO = "hydro",
}

export const PROJECT_TYPE_COLOR: Record<string, string> = {
  [PROJECT_TYPE.SOLAR.toUpperCase()]: "#4169E1",
  [PROJECT_TYPE.TIDAL.toUpperCase()]: "#008080",
  [PROJECT_TYPE.WIND.toUpperCase()]: "#FFA500 ",
  [PROJECT_TYPE.HYDRO.toUpperCase()]: "#FF0000",
};

export const PROJECT_TYPE_NAME: Record<string, string> = {
  [PROJECT_TYPE.SOLAR.toUpperCase()]: "solar",
  [PROJECT_TYPE.TIDAL.toUpperCase()]: "tidal",
  [PROJECT_TYPE.WIND.toUpperCase()]: "wind",
  [PROJECT_TYPE.HYDRO.toUpperCase()]: "hydro",
};
