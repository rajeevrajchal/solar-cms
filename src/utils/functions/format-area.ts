export const formatArea = (num: number, dec?: number) => {
  if (!num) {
    return "-";
  }
  return `${num.toFixed(dec || 2)}m²`;
};
