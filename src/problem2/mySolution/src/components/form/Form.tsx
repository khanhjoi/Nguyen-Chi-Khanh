import React, { useEffect, useState } from "react";

import ListCoin from "../common/listCoin/ListCoin";
import { InputCustom } from "./input/InputCustom";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { convertCoin } from "../../utils/coinvertCoin";
import { TypeCurrency } from "../../mock/api";
import ShowResult, { ShowResultProps } from "../ShowResult";

export type FormProps = {
  style?: string;
};

const Form: React.FC<FormProps> = ({ style }) => {
  const [numberAmount, setNumberAmount] = useState<number>();
  const [numberReceive, setNumberReceive] = useState<number | string>();
  const [selectAmount, setSelectAmount] = useState<
    TypeCurrency | null | undefined
  >();
  const [selectReceive, setSelectReceive] = useState<
    TypeCurrency | null | undefined
  >();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [errorInput1, setErrorInPut1] = useState<{
    isError: boolean;
    errorMessage: string;
  }>({ isError: false, errorMessage: "" });

  const [errorInput2, setErrorInPut2] = useState<{
    isError: boolean;
    errorMessage: string;
  }>({ isError: false, errorMessage: "" });

  const [errorSelect1, setErrorSelect1] = useState<{
    isError: boolean;
    errorMessage: string;
  }>({ isError: false, errorMessage: "" });

  const [errorSelect2, setErrorSelect2] = useState<{
    isError: boolean;
    errorMessage: string;
  }>({ isError: false, errorMessage: "" });

  const onSubmit = (e: any) => {
    e.preventDefault();
    setIsShow(false);

    validateInput(numberAmount, setErrorInPut1);
    validateInput(numberReceive, setErrorInPut2);
    validateInput(selectAmount, setErrorSelect1);
    validateInput(selectReceive, setErrorSelect2);
    const coinGet = convertCoin(
      Number(numberAmount),
      Number(selectAmount?.price),
      Number(selectReceive?.price)
    );
    setNumberReceive(coinGet);
    if (coinGet) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  const validateInput = (value: any, setError: any) => {
    if (!value) {
      setError({
        isError: true,
        errorMessage: "Amount is not empty",
      });
    }

    return false;
  };

  useEffect(() => {
    const coinGet = convertCoin(
      Number(numberAmount),
      Number(selectAmount?.price),
      Number(selectReceive?.price)
    );
    setNumberReceive(coinGet);
  }, [selectAmount, selectReceive]);

  return (
    <Card
      isBlurred
      isFooterBlurred
      radius="lg"
      className="border-none w-3/4 md:w-1/2 min-h-[20rem] bg-white  rounded-lg mx-auto shadow-xl translate-y-8"
    >
      <form className={`${style}`} onSubmit={onSubmit}>
        <h5 className="text-[3rem] font-bold text-center mb-8 bg-gradient-to-r from-pink-500  via-purple-500  to-indigo-500 bg-clip-text text-transparent">
          Swap Currency
        </h5>
        <div className="md:flex block min-h-[6rem] my-8">
          <div className="w-full md:block relative z-0 md:w-1/2 mt-4 md:mx-2 md:mt-0 group">
            <InputCustom
              value={numberAmount}
              setValue={setNumberAmount}
              label="Number amount"
              isError={errorInput1}
              setErrors={setErrorInPut1}
            />
            <ListCoin
              label="Select amount coins"
              style="mt-4"
              coin={selectAmount}
              setCoin={setSelectAmount}
              isValid={errorSelect1}
              setError={setErrorSelect1}
            />
          </div>
          <div className="w-full md:block relative z-0 md:w-1/2 md:mx-2 mt-4 md:mt-0 group">
            <InputCustom
              value={numberReceive}
              setValue={setNumberReceive}
              label="Number receive"
              disabled={true}
            />
            <ListCoin
              label="Select receive coins"
              style="mt-4"
              coin={selectReceive}
              setCoin={setSelectReceive}
              isValid={errorSelect2}
              setError={setErrorSelect2}
            />
          </div>
        </div>
        <div className="md:flex block min-h-[4rem] my-4 ml-2">
          {isShow && (
            <ShowResult
              coinAmount={selectAmount}
              coinReceived={selectReceive}
              numberCoinReceived={Number(numberReceive)}
            />
          )}
        </div>
        <Button
          type="submit"
          color="primary"
          className="w-full text-2xl font-bold bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
        >
          Swap
        </Button>
      </form>
      <div></div>
    </Card>
  );
};

export default Form;
