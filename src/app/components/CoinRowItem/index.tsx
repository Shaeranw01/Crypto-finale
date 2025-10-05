import { Coin } from "@/interfaces/Coininterface";
import PriceChange from "../PriceChange";
import TableBar from "../TableBar";
import { GoDotFill } from "react-icons/go";
import Chart from "../TableChart";
import Image from "next/image";
import formatCompactNumber from "@/utlis/getFormattedPrice";
import Link from "next/link";

const CoinRowItem = ({ coin, index }: { coin: Coin; index: number }) => {
  const priceChange1h: number = coin.price_change_percentage_1h_in_currency;

  const priceChange24h: number = coin.price_change_percentage_24h_in_currency;

  const priceChange7d: number = coin.price_change_percentage_7d_in_currency;

  const priceArray: number[] = coin.sparkline_in_7d?.price;

  return (
    <div className="flex justify-between p-[20px] mb-2 items-center gap-[20px] dark:bg-[#191925] bg-white  rounded-lg">
      <div className="w-4 dark:text-white text-[#232336]">{index + 1}</div>
      <div className="w-56 dark:text-white  text-[#232336] flex gap-3 items-center">
        <div>
          <Image
            src={coin.image}
            width={30}
            height={30}
            alt="Picture of the coin"
          />
        </div>
        <div>
          <Link href={`/coin/${coin.id}`}>{coin.name}</Link>
        </div>
      </div>
      <div className="w-20 dark:text-white  text-[#232336]">
        {coin.current_price?.toFixed(2)}
      </div>
      <PriceChange value={priceChange1h} />
      <PriceChange value={priceChange24h} />
      <PriceChange value={priceChange7d} />
      <div className="w-48">
        <div className="flex-col w-[180px]">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <GoDotFill
                className={
                  priceChange24h > 0 ? "fill-[#03FDFC]" : "fill-[#fc8181]"
                }
              />
              <div
                className={
                  priceChange24h > 0 ? "text-[#03FDFC]" : "text-[#fc8181]"
                }
              >
                {formatCompactNumber(coin.total_volume)}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <GoDotFill
                className={
                  priceChange24h > 0
                    ? "fill-[#03FDFC] opacity-40"
                    : "fill-[#fc8181] opacity-40"
                }
              />
              <div
                className={
                  priceChange24h > 0
                    ? "dark:text-[#03FDFC] text-black dark:opacity-40"
                    : "dark:text-[#fc8181] text-black dark:opacity-40"
                }
              >
                {formatCompactNumber(coin.market_cap)}
              </div>
            </div>
          </div>
        </div>
        <TableBar
          dividend={coin.total_volume}
          divisor={coin.market_cap}
          fillColor={priceChange24h > 0 ? "bg-[#03FDFC]" : "bg-[#fc8181]"}
        ></TableBar>
      </div>

      <div className="w-48">
        <div className="flex-col w-[180px]">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <GoDotFill
                className={
                  priceChange24h > 0 ? "fill-[#03FDFC]" : "fill-[#fc8181]"
                }
              />
              <div
                className={
                  priceChange24h > 0 ? "text-[#03FDFC]" : "text-[#fc8181]  "
                }
              >
                {formatCompactNumber(coin.circulating_supply)}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <GoDotFill
                className={
                  priceChange24h > 0
                    ? "fill-[#03FDFC] opacity-40"
                    : "fill-[#fc8181] opacity-40"
                }
              />
              <div
                className={
                  priceChange24h > 0
                    ? "dark:text-[#03FDFC] dark:opacity-40 text-black"
                    : "dark:text-[#fc8181] dark:opacity-40 text-black"
                }
              >
                {formatCompactNumber(coin.total_supply)}
              </div>
            </div>
          </div>
        </div>
        <TableBar
          dividend={coin.circulating_supply}
          divisor={coin.total_supply}
          fillColor={priceChange24h > 0 ? "bg-[#03FDFC]" : "bg-[#fc8181]"}
        ></TableBar>
      </div>
      <div className="w-20">
        <Chart priceArray={priceArray} />
      </div>
    </div>
  );
};
export default CoinRowItem;
