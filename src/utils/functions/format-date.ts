import dayjs from "dayjs";

const dateFormats = {
  US: "MM/DD/YYYY",
  EU: "DD/MM/YYYY",
  MMM_DD_YYYY: "MMM DD YYYY",
  DD_MMM_YYYY: "DD MMM, YYYY",
  O: "YYYY/MM/DD",
} as const;

type DateFormat = (typeof dateFormats)[keyof typeof dateFormats];

export const formatDate = (
  date: string | Date,
  format?: DateFormat
): string => {
  return dayjs(date).format(format || "DD MMM, YYYY");
};
