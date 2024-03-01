export enum ORDER_STATUS {
  ORDER = "order",
  CANCEL = "cancel",
}

export const ORDER_STATUS_COLOR: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.ORDER]: "#00B5FF",
  [ORDER_STATUS.CANCEL]: "#FF5861",
};

export const ORDER_STATUS_NAME: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.ORDER]: "order",
  [ORDER_STATUS.CANCEL]: "cancel",
};
