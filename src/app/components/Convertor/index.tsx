"use client";

import { useState, useEffect, useContext, ChangeEvent } from "react";
import { CoinDataContext } from "@/app/context/coinDataContext";
import { TbSwitchHorizontal } from "react-icons/tb";
import { TbSwitch3 } from "react-icons/tb";
import { Coin } from "@/interfaces/Coininterface";
import ConvertorRow from "../ConvertorRow";
import ConvertorChart from "../ConvertorChart";

const Convertor = () => {
  const { coinData } = useContext(CoinDataContext);
  const [toCoin, setToCoin] = useState<Coin | null>(null);
  const [fromCoin, setFromCoin] = useState<Coin | null>(null);
  const [amount, setAmount] = useState<string>("1");
  const [conversionRate, setConversionRate] = useState<number>(1);
  const [switchMode, setSwitch] = useState<boolean>(false);

  const todayDate: string = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      alert("Please enter a number");
    } else setAmount(e.target.value);
  };

  useEffect(() => {
    if (coinData.length > 0) {
      const firstCoin: Coin = coinData[0];
      const secondCoin: Coin = coinData[1];
      const rate: number = firstCoin.current_price / secondCoin.current_price;
      setConversionRate(rate);
      setFromCoin(firstCoin);
      setToCoin(secondCoin);
    }
  }, []);

  useEffect(() => {
    if (fromCoin != null && toCoin != null) {
      const rate: number = fromCoin.current_price / toCoin.current_price;
      setConversionRate(rate);
    }
  }, [toCoin, fromCoin]);

  let fromAmount, toAmount;

  const handleSwitch = () => {
    setToCoin(fromCoin);
    setFromCoin(toCoin);
    setSwitch(!setSwitch);
  };
  if (switchMode) {
    fromAmount = amount;
    toAmount = amount / conversionRate;
  } else {
    fromAmount = amount;
    toAmount = amount * conversionRate;
  }

  return (
    <div>
      <h2 className="dark:text-[#DEDEDE] pt-20 text-[#424286]">
        Online Currency Converter
      </h2>
      <span className="dark:text-[#DEDEDE] text-[#424286]">{todayDate}</span>
      <div className=" h-[200px] mt-8  flex gap-1  justify-between">
        <ConvertorRow
          currentCoin={fromCoin}
          amount={fromAmount}
          handleCoinSelect={(coin: Coin) => setFromCoin(coin)}
          handleAmountChange={handleAmountChange}
        ></ConvertorRow>
        <div className="flex justify-center items-center">
          <button
            className="flex justify-center items-center bg-white h-10 rounded-full"
            onClick={handleSwitch}
          >
            <TbSwitch3 className="w-[30px] h-[30px]" />
          </button>
        </div>

        <ConvertorRow
          currentCoin={toCoin}
          amount={toAmount}
          handleCoinSelect={(coin) => setToCoin(coin)}
          handleAmountChange={handleAmountChange}
        ></ConvertorRow>
      </div>
      {fromCoin !== null && toCoin !== null && (
        <ConvertorChart fromCoin={fromCoin} toCoin={toCoin}></ConvertorChart>
      )}
    </div>
  );
};
export default Convertor;
