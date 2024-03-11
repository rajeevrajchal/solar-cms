export enum ORDER_STATUS {
  ORDERED = "ordered",
  CANALED = "cancel",
  ON_HOLD = "on_hold",
  PAYMENT_DONE = "payment_done",
}

export const ORDER_STATUS_COLOR: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.ORDERED]: "#4169E1",
  [ORDER_STATUS.CANALED]: "#FF0000",
  [ORDER_STATUS.ON_HOLD]: "#A020F0",
  [ORDER_STATUS.PAYMENT_DONE]: "#008080",
};

export const ORDER_STATUS_NAME: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.ORDERED]: "ordered",
  [ORDER_STATUS.CANALED]: "cancel",
  [ORDER_STATUS.ON_HOLD]: "on hold",
  [ORDER_STATUS.PAYMENT_DONE]: "payment complete",
};
