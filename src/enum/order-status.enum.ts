export enum ORDER_STATUS {
  ORDERED = "ordered",
  CANALED = "cancel",
}

export const ORDER_STATUS_COLOR: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.ORDERED]: "#00AA6E",
  [ORDER_STATUS.CANALED]: "#FF5861",
};

export const ORDER_STATUS_NAME: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.ORDERED]: "ordered",
  [ORDER_STATUS.CANALED]: "cancel",
};
