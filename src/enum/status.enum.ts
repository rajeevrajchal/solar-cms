export enum STATUS {
  NEW = "new",
  SITE_SURVEY = "site_survey",
  DESIGN_IN_PROGRESS = "design_in_progress",
  CUSTOMER_INQUIRY = "customer_inquiry",
  CUSTOMER_READY = "customer_ready",
  INSTALLATION_IN_PROGRESS = "installation_in_progress",
  ONLINE = "online",
  EQUIPMENT_SELECTION = "equipment_selection",
}

export const STATUS_COLOR: Record<string, string> = {
  [STATUS.NEW.toUpperCase()]: "#4169E1",
  [STATUS.ONLINE.toUpperCase()]: "#008080",
  [STATUS.EQUIPMENT_SELECTION.toUpperCase()]: "#8B4513",
  [STATUS.SITE_SURVEY.toUpperCase()]: "#008080",
  [STATUS.DESIGN_IN_PROGRESS.toUpperCase()]: "#FFA500 ",
  [STATUS.CUSTOMER_INQUIRY.toUpperCase()]: "#FF0000",
  [STATUS.CUSTOMER_READY.toUpperCase()]: "#A020F0",
  [STATUS.INSTALLATION_IN_PROGRESS.toUpperCase()]: "#555555",
};

export const STATUS_NAME: Record<string, string> = {
  [STATUS.NEW.toUpperCase()]: "new",
  [STATUS.SITE_SURVEY.toUpperCase()]: "site survey",
  [STATUS.DESIGN_IN_PROGRESS.toUpperCase()]: "design inProgress",
  [STATUS.CUSTOMER_READY.toUpperCase()]: "customer ready",
  [STATUS.INSTALLATION_IN_PROGRESS.toUpperCase()]: "installation inProgress",
  [STATUS.CUSTOMER_INQUIRY.toUpperCase()]: "customer inquiry",
  [STATUS.ONLINE.toUpperCase()]: "online",
  [STATUS.EQUIPMENT_SELECTION.toUpperCase()]: "equipment selection",
};
