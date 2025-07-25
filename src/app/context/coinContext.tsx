import { useState, useEffect, useContext, createContext } from "react";
import { CoinPage } from "@/interfaces/CoinPageInterface";

export const CoinContext = createContext();

export const CoinContextComponent = () => {
  const [coinData, setData] = useState<CoinPage>(Object);

  function setChartData(data) {
    setData(data);
  }

  return (
    <CoinContext.Provider
      value={{ setChartData, coinData }}
    ></CoinContext.Provider>
  );
};
