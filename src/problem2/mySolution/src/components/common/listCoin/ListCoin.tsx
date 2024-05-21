import React, { useEffect, useState } from "react";
import { TypeCurrency, fetchListCoinFromAPI } from "../../../mock/api";
import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { formatPrice } from "../../../utils/fomatPrice";
import { formatDate } from "../../../utils/formatDate";
import { motion } from "framer-motion";

export type ListCoinType = {
  label: string;
  style?: string;
  isValid?: {
    isError: boolean;
    errorMessage: string;
  };
  setError: (error: { isError: boolean; errorMessage: string }) => void ;
  coin: TypeCurrency | null | undefined;
  setCoin: (coin: TypeCurrency) => void;
  setValue?: any;
};

const ListCoin: React.FC<ListCoinType> = ({
  style,
  isValid,
  setCoin,
  coin,
  label,
  setError,
  setValue,
}) => {
  const [listCoin, setListCoin] = useState<TypeCurrency[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchListCoinFromAPI();
        setListCoin(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectionChange = (selectedKey: any) => {
    if (listCoin[selectedKey.currentKey]) {
      setCoin(listCoin[selectedKey.currentKey]);
      setError({ isError: false, errorMessage: "" });
    } else {
      setError({ isError: true, errorMessage: "You must select a valid coin" });
    }
  };

  return (
    <>
      <Select
        label={label}
        variant="bordered"
        labelPlacement="inside"
        placeholder={label}
        className={` ${style}`}
        radius="md"
        onSelectionChange={handleSelectionChange}
        isLoading={isLoading}
        errorMessage={isValid?.errorMessage || ""}
        isInvalid={isValid?.isError}
      >
        {listCoin.map((coin: TypeCurrency, index: number) => (
          <SelectItem
            key={index}
            value={coin.currency}
            startContent={
              <Avatar
                alt={coin.currency}
                className="w-6 h-6"
                src={`/public/tokens/${coin.currency}.svg`}
              />
            }
            endContent={
              <div className="text-sm">{formatPrice(coin.price)}</div>
            }
          >
            {coin.currency}
          </SelectItem>
        ))}
      </Select>
      {coin && (
        <span className="text-[0.9rem] ml-2 text-slate-600">
          price: {coin.price}
        </span>
      )}
    </>
  );
};

export default ListCoin;
