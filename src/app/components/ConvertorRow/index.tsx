"use client";

import { useState, useEffect, useContext, ChangeEvent } from "react";

import { Coin } from "@/interfaces/Coininterface";

import { CoinDataContext } from "@/app/context/coinDataContext";
import Image from "next/image";
interface CoinRowProps {
  currentCoin: Coin | null;
  amount: number;
  handleCoinSelect: (coin: Coin) => void;
  handleAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const ConvertorRow = ({
  currentCoin,
  amount,
  handleCoinSelect,
  handleAmountChange,
}: CoinRowProps) => {
  const { coinData } = useContext(CoinDataContext);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [coinSearch, setCoinSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setCoinSearch(searchValue);
    setShowDropdown(true);
  };
  const coinList = coinData.filter((coin: Coin) =>
    coin.name.toLowerCase().includes(coinSearch)
  );

  const onSelectCoin = (coin: Coin) => {
    setShowDropdown(false);
    handleCoinSelect(coin);
    setCoinSearch(coin.name);
  };

  useEffect(() => {
    if (currentCoin) {
      setCoinSearch(currentCoin.name);
    }
  }, [currentCoin]);

  return (
    <div className="w-full h-[200px] dark:bg-[#191932] flex flex-col gap-[40px] rounded-[16px] p-[24px] bg-white">
      <div className=" h-[24px] font-[Space_Grotesk] font-[400] text-[14px] dark:text-white text-[#424286] ">
        You Sell
      </div>
      <div className="w-full h-[88px] flex flex-col gap-[24px]">
        <div className=" h-[24px] flex justify-between">
          <div className="relative flex items-center justify-between w-full">
            <div className="flex gap-2">
              {currentCoin && (
                <Image
                  src={currentCoin.image}
                  alt={currentCoin.name}
                  width={25}
                  height={25}
                  className=""
                />
              )}
              <input
                className="w-full h-[24px] flex  dark:bg-[#191932] dark:text-white focus:outline-none bg-[#F3F5F9] text-[#424286] rounded-lg p-1"
                value={coinSearch}
                onChange={handleSearch}
                onFocus={() => setShowDropdown(true)}
              ></input>
            </div>

            <input
              className="w-[50px] h-[40px]   dark:bg-[#191932] dark:text-white focus:outline-none bg-[#F3F5F9] text-[#424286] rounded-lg p-1"
              value={amount}
              onChange={handleAmountChange}
            ></input>

            {showDropdown && (
              <div className="h-auto w-full flex flex-col overflow-y-scroll bg-[#191932] text-white absolute z-10 rounded-2xl top-8 ml-6">
                {coinList.map((coin: Coin) => (
                  <button
                    key={coin.id}
                    className="p-2 w-full text-white h-12 text-left"
                    onClick={() => onSelectCoin(coin)}
                  >
                    {coin.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <hr className="border-white mt-1 mb-3" />

        {currentCoin && (
          <div className="flex items-center gap-2 text-white text-sm">
            <span>1 {currentCoin.symbol.toUpperCase()}</span>

            {currentCoin.current_price}
          </div>
        )}
      </div>
    </div>
  );
};
export default ConvertorRow;
