export const formatVoltage = (num: number, dec?: number) => {
  if (num === null || num === undefined) {
    return "-";
  }
  return `${num.toFixed(dec || 2)} Volt`;
};
