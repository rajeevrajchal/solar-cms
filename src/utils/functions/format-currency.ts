const currencySymbol = import.meta.env.VITE_APP_CURRENCY_SYMBOL || "USD";

export const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencySymbol,
  });
  if (typeof amount !== "number" || isNaN(amount)) {
    return formatter.format(0);
  }

  return formatter.format(amount);
};
