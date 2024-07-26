export const formatWatt = (num: number, dec?: number) => {
  if (num === null || num === undefined) {
    return "-";
  }
  return `${num.toFixed(dec || 2)} Watt`;
};
