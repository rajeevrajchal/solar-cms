export enum QUOTE_STATUS {
  DRAFT = "draft",
  SENT = "sent",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  EXPIRED = "expired",
}

export const QUOTE_STATUS_COLOR: Record<QUOTE_STATUS, string> = {
  [QUOTE_STATUS.DRAFT]: "#F2F2F2",
  [QUOTE_STATUS.ACCEPTED]: "#00AA6E",
  [QUOTE_STATUS.SENT]: "#00B5FF",
  [QUOTE_STATUS.REJECTED]: "#FF5861",
  [QUOTE_STATUS.EXPIRED]: "#FF5861",
};

export const QUOTE_STATUS_NAME: Record<QUOTE_STATUS, string> = {
  [QUOTE_STATUS.DRAFT]: "draft",
  [QUOTE_STATUS.SENT]: "sent",
  [QUOTE_STATUS.ACCEPTED]: "accepted",
  [QUOTE_STATUS.REJECTED]: "rejected",
  [QUOTE_STATUS.EXPIRED]: "expired",
};
