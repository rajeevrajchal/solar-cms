export enum PANEL_TYPE {
  MONOCRYSTALLINE = "mono_crystalline",
  POLYCRYSTALLINE = "poly_crystalline",
  THIN_FILM = "thin_film",
  BIFACIAL = "bifacial",
}

export const PANEL_TYPE_NAME: any = {
  [PANEL_TYPE.MONOCRYSTALLINE]: "mono crystalline",
  [PANEL_TYPE.POLYCRYSTALLINE]: "poly crystalline",
  [PANEL_TYPE.THIN_FILM]: "thin film",
  [PANEL_TYPE.BIFACIAL]: "bi facial",
};

export const panelTypeOptions = [
  {
    label: PANEL_TYPE_NAME[PANEL_TYPE.MONOCRYSTALLINE],
    value: PANEL_TYPE.MONOCRYSTALLINE,
  },
  {
    label: PANEL_TYPE_NAME[PANEL_TYPE.POLYCRYSTALLINE],
    value: PANEL_TYPE.POLYCRYSTALLINE,
  },
  { label: PANEL_TYPE_NAME[PANEL_TYPE.THIN_FILM], value: PANEL_TYPE.THIN_FILM },
  { label: PANEL_TYPE_NAME[PANEL_TYPE.BIFACIAL], value: PANEL_TYPE.BIFACIAL },
];
