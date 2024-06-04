const p = import.meta.env.VITE_APP_PREFIX;

export const formatCode = (code: number, totalDigits: number = 4): string => {
  const n = code.toString().padStart(totalDigits, "0");
  return `${p}-${n}`;
};
