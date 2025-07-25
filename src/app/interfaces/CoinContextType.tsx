import { Coin } from "./Coininterface";

export interface CoinContextType {
  coinData: Coin[];
  fetchMoreData: () => void;
  showConvertor: boolean;
  setShowConvertor: (val: boolean) => void;
  showComparison: boolean;
  setShowComparison: (val: boolean) => void;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}
