export const formatDegree = (num: number, dec?: number) => {
  if (!num) {
    return "-";
  }
  return `${num.toFixed(dec || 2)}°`;
};
