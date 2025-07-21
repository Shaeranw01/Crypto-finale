export interface SliderCoin {
  name: string;
  id: string;
  image: string;
  high_24h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_change_24h: number;
  circulating_supply: number;
  total_volume: number;
  market_cap: number;
  total_supply: number;
  current_price: number;
  price_change_percentage_24h: number;
  symbol: string;
  sparkline_in_7d: {
    price: number[];
  };
  selected: boolean;
}
