"use client";

import { PiCurrencyDollarFill } from "react-icons/pi";

import { BiSolidUpArrow } from "react-icons/bi";

import { useState, useEffect } from "react";
import Image from "next/image";

import { GoDotFill } from "react-icons/go";
import formatCompactNumber from "@/utlis/getFormattedPrice";

export default function Coinbar() {
  const [marketData, setMarketData] = useState({
    activeCurrencies: 0,
    btcCap: 0,
    ethCap: 0,
    volume: 0,
    marketCap: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.coingecko.com/api/v3/global");
      let { data } = await response.json();

      setMarketData({
        activeCurrencies: data.active_cryptocurrencies,
        btcCap: data.market_cap_percentage.btc,
        ethCap: data.market_cap_percentage.eth,
        volume: data.total_volume.btc,
        marketCap: data.total_market_cap.btc,
      });
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="dark:bg-[#1E1932] bg-[#353570] h-14 flex-center  w-full ">
        <div className="container">
          <PiCurrencyDollarFill className="w-5 fill-white">
            {" "}
          </PiCurrencyDollarFill>
          <div>Coins</div>
          <div> {marketData.activeCurrencies}</div>
        </div>

        <div className="container">
          <BiSolidUpArrow className="w-5 fill-teal-500 "></BiSolidUpArrow>
          <div>{formatCompactNumber(marketData?.marketCap)}</div>
        </div>
        <div className="container">
          <GoDotFill fill="white"></GoDotFill>
          <div>{formatCompactNumber(marketData?.volume)} </div>
        </div>
        <div className="container">
          <div className=" rounded-full">
            <Image
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
              }
              width={80}
              height={80}
              alt="Picture of the coin"
            />
          </div>

          <div>{marketData.btcCap.toFixed(2)} </div>
          <div className="bg-gray-400 rounded-full w-[15rem] h-2">
            <div
              className="bg-yellow-500 rounded-full h-2 "
              style={{ width: `${marketData?.btcCap}%` }}
            ></div>
          </div>
        </div>
        <div className="container">
          <div className=" rounded-full  bg-blue-400">
            <Image
              src={"https://files.coinswitch.co/public/coins/eth.png"}
              width={80}
              height={80}
              alt="Picture of the coin"
            />
          </div>

          <div>{marketData.ethCap.toFixed(2)}</div>
          <div className="bg-gray-400 rounded-full w-[15rem] h-2">
            <div
              className=" bg-blue-400 rounded-full  h-2"
              style={{ width: `${marketData?.ethCap}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
