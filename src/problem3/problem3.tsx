interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

/*
  extend the interface WalletBalance interface
  avoid to double declare
*/
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  /*
    Use the priorityMap  instead of the switch case there are many several reason:
    1. increasing the performance because using a map provides a direct lookup with average time complexity of O(1).
    2. easy to maintain 
    3. easy to read
  */
  const getPriority = (blockchain: string): number => {
    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorityMap[blockchain] ?? -99;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
         // Include only balances with positive amounts and valid priorities
        return balancePriority > -99 && balance.amount > 0; // remove if use && to easy to achieve readable code
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority; // use this instead of if else -> make this code easier to read and maintain 
      });
  }, [balances]); // prices parameters don't use to this useMomo method

  /*
    wap this function to useMemo Because:
    1. This function should only run when sortedBalances changes, avoiding unnecessary recalculations. 
  */
  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2), // Fixed to 2 decimal places for better formatting
    }));
  }, [sortedBalances]);


  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
