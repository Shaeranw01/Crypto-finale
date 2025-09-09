"use client";

import { useState, useEffect, createContext } from "react";

import { Coin } from "../interfaces/Coininterface";
import { CoinContextType } from "../interfaces/CoinContextType";

export const CoinDataContext = createContext<CoinContextType | null>(null);

export const CoinContext = ({ children }: { children: React.ReactNode }) => {
  const [coinData, setData] = useState<Coin[]>([]);
  const [page, setPage] = useState<number>(1);
  const [showConvertor, setShowConvertor] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("usd");

  const [showComparison, setShowComparison] = useState<boolean>(false);
  function useDebouncedValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
  }
  const debouncedCurrency = useDebouncedValue(selectedCurrency, 600);
  useEffect(() => {
    // Reset data and page, then fetch fresh
    setData([]);
    setPage(1);
    fetchInitialData();
  }, [debouncedCurrency]);

  const fetchInitialData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${debouncedCurrency}&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    const data = await response.json();
    setData(data);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${debouncedCurrency}&order=market_cap_desc&per_page=50&page=${nextPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    const data = await response.json();

    setData((prev) => prev.concat(data));

    setPage(nextPage);
  };

  return (
    <CoinDataContext.Provider
      value={{
        coinData,
        fetchMoreData,
        showConvertor,
        setShowConvertor,
        showComparison,
        setShowComparison,
        selectedCurrency,
        setSelectedCurrency,
        debouncedCurrency,
      }}
    >
      {children}
    </CoinDataContext.Provider>
  );
};
