"use client";
import { useOutsideClick } from "@/app/hooks/useClickOutside";
import React, {
  useRef,
  useState,
  useEffect,
  ReactElement,
  useContext,
} from "react";
import { CoinDataContext } from "@/app/context/coinDataContext";

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

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // const [currentCurrency, setCurrency] = useState("usd");
  const [currentSymbol, setSymbol] = useState<React.ReactElement>(
    <AiOutlineDollar></AiOutlineDollar>
  );

  const { selectedCurrency, setSelectedCurrency } = useContext(CoinDataContext);

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
    setSymbol(newSymbol);
    setSelectedCurrency(newCurrency);
    console.log("selected currency in dropdown", newCurrency);
  };

  return (
    <div
      className="w-24 h-10  dark:bg-[#191925] flex flex-col items-center relative  dark:text-white transition delay-150 duration-700 ease-in-out rounded-lg  bg-[#CCCCFA66] text-[#424286]"
      ref={ref}
    >
      <button
        className="w-full flex gap-2 items-center dark:text-white text-[#424286] p-2"
        onClick={toggleDropDown}
      >
        {currentSymbol}
        <span className="text-lg ">{selectedCurrency.toUpperCase()}</span>
      </button>
      {isOpen && (
        <div className="w-full rounded-lg mt-1 dark:bg-[#191925] bg-[#CCCCFA66]">
          {currencyArray.map(({ name, symbol, id }) => {
            if (name === selectedCurrency) {
              return null;
            }
            return (
              <button
                key={id}
                className="w-full flex gap-2 items-center p-2 dark:text-white  text-[#424286]  "
                onClick={() => handleSelect(name, symbol)}
              >
                {symbol}
                <span className="text-lg">{name.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
