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
  [STATUS.NEW.toUpperCase()]: "#A9A9A9", // Using a grey color as an example
  [STATUS.ONLINE.toUpperCase()]: "#00FF00", // Green color
  [STATUS.SITE_SURVEY.toUpperCase()]: "#0000FF", // Blue color
  [STATUS.EQUIPMENT_SELECTION.toUpperCase()]: "#808080", // Another grey color as an example
  [STATUS.DESIGN_IN_PROGRESS.toUpperCase()]: "#C0C0C0", // Silver color
  [STATUS.CUSTOMER_INQUIRY.toUpperCase()]: "#6495ED", // Cornflower blue color
  [STATUS.CUSTOMER_READY.toUpperCase()]: "#000080", // Navy blue color
  [STATUS.INSTALLATION_IN_PROGRESS.toUpperCase()]: "#FFA500",
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
