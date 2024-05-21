export const convertCoin = (
  initialAmount: number,
  initialPrice: number,
  targetPrice: number
): number => {
  // Calculate the value of the initial coin in USDT
  const valueInAmount: number = initialAmount * initialPrice;

  // Convert the value from USDT to the target coin
  const valueInReceive: number = valueInAmount / targetPrice;

  return Number(valueInReceive);
};
