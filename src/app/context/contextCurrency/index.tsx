"use client";

import { useState, useEffect, createContext } from "react";

import { Coin } from "@/interfaces/Coininterface";

export const CoinDataContext = createContext();

export const CoinContext = ({ children }) => {
  const [coinData, setData] = useState<Coin[]>([]);
  const [page, setPage] = useState<number>(1);
  const [showConvertor, setShowConvertor] = useState<boolean>(false);
  const [selectedCurrency, setCurrency] = useState<string>("usd");

  const [showComparison, setShowComparison] = useState<boolean>(false);
  useEffect(() => {
    fetchMoreData();
  }, [selectedCurrency]);

  const fetchMoreData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    const data = await response.json();

    setData(coinData.concat(data));

    setPage(page + 1);
    console.log(coinData);
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
      }}
    >
      {children}
    </CoinDataContext.Provider>
  );
};
