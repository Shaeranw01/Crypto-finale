import { CoinDataContext } from "@/app/context/coinDataContext";
import { useContext } from "react";

export function useCoinContext() {
  const context = useContext(CoinDataContext);
  if (!context) {
    throw new Error("useCoinContext must be used within a CoinDataProvider");
  }
  return context;
}
