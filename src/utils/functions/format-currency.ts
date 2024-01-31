const currencySymbol = import.meta.env.VITE_APP_CURRENCY_SYMBOL || "USD";

export const formatCurrency = (amount: number) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Invalid amount. Please provide a valid number.");
  }
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencySymbol,
  });

  return formatter.format(amount);
};
