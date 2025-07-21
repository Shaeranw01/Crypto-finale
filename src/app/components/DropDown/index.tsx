"use client";
import { useOutsideClick } from "@/app/hooks/useClickOutside";
import React, { useRef, useState, useEffect, ReactElement } from "react";

import { AiOutlineDollar } from "react-icons/ai";
import { AiOutlineEuroCircle } from "react-icons/ai";
import { AiOutlinePound } from "react-icons/ai";
import { FaBitcoin } from "react-icons/fa6";
import { FaEthereum } from "react-icons/fa6";

interface Currency {
  name: string;
  symbol: ReactElement;
  id: number;
}
//React element — a JS object that React can render into real DOM.
export const currencyArray: Currency[] = [
  {
    name: "usd",
    symbol: <AiOutlineDollar />,
    id: 1,
  },
  {
    name: "euro",
    symbol: <AiOutlineEuroCircle />,
    id: 2,
  },
  {
    name: "gbp",
    symbol: <AiOutlinePound />,
    id: 3,
  },
  {
    name: "btc",
    symbol: <FaBitcoin />,
    id: 6,
  },
  {
    name: "eth",
    symbol: <FaEthereum />,
    id: 7,
  },
];

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentCurrency, setCurrency] = useState("usd");
  const [currentSymbol, setSymbol] = useState<React.ReactElement>(
    <AiOutlineDollar></AiOutlineDollar>
  );

  const ref = useRef(null);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropDown = () => {
    setIsOpen(false);
  };

  useOutsideClick(ref, closeDropDown);
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSelect = (newCurrency: string, newSymbol: React.ReactElement) => {
    setCurrency(newCurrency);
    setSymbol(newSymbol);
  };

  return (
    <div
      className="w-24 h-10  dark:bg-[#191925] flex flex-col items-center relative  dark:text-white transition delay-150 duration-700 ease-in-out rounded-xl  bg-[#CCCCFA66] text-[#424286]"
      ref={ref}
    >
      <button
        className="flex gap-2 justify-center items-center p-1 dark:text-white text-[#424286] rounded-xl"
        onClick={toggleDropDown}
      >
        {currentSymbol}
        <span className="text-lg ">{currentCurrency.toUpperCase()}</span>
      </button>
      {isOpen &&
        currencyArray.map(({ name, symbol, id }) => {
          if (name !== currentCurrency)
            return (
              <button
                key={id}
                className="flex gap-2 justify-center items-center p-1 dark:text-white dark:bg-[#191925] w-full bg-[#CCCCFA66] text-[#424286] "
                onClick={() => handleSelect(name, symbol)}
              >
                {symbol}
                <span className="text-lg">{name.toUpperCase()}</span>
              </button>
            );
        })}
    </div>
  );
}
