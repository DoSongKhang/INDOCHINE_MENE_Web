export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPriceNumber = (amount: number): string => {
  return amount.toLocaleString('vi-VN') + ' ₫';
};
