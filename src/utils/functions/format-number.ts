export const formatNumber = (num: number, dec?: number) => {
  if (!num) {
    return "-";
  }
  return num.toFixed(dec || 2);
};
