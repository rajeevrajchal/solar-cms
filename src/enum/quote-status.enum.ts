export enum QUOTE_STATUS {
  DRAFT = "draft",
  SENT = "sent",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  EXPIRED = "expired",
}

export const QUOTE_STATUS_COLOR: Record<QUOTE_STATUS, string> = {
  [QUOTE_STATUS.DRAFT]: "badge-neutral",
  [QUOTE_STATUS.ACCEPTED]: "badge-success",
  [QUOTE_STATUS.SENT]: "badge-primary",
  [QUOTE_STATUS.REJECTED]: "badge-warning",
  [QUOTE_STATUS.EXPIRED]: "badge-error",
};

export const QUOTE_STATUS_NAME: Record<QUOTE_STATUS, string> = {
  [QUOTE_STATUS.DRAFT]: "draft",
  [QUOTE_STATUS.SENT]: "sent",
  [QUOTE_STATUS.ACCEPTED]: "accepted",
  [QUOTE_STATUS.REJECTED]: "rejected",
  [QUOTE_STATUS.EXPIRED]: "expired",
};
