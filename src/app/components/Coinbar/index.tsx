"use client";

import { PiCurrencyDollarFill } from "react-icons/pi";

import { BiSolidUpArrow } from "react-icons/bi";

import { useState, useEffect } from "react";
import Image from "next/image";

import { GoDotFill } from "react-icons/go";

export default function Coinbar() {
  const [marketData, setMarketData] = useState({
    activeCurrencies: 0,
    btcCap: 0,
    ethCap: 0,
    volume: 0,
    marketCap: 0,
  });
  const fetchData = async () => {
    const data = await fetch("https://api.coingecko.com/api/v3/global");
    let jsonData = await data.json();
    jsonData = jsonData.data;

    setMarketData({
      activeCurrencies: jsonData.active_cryptocurrencies,
      btcCap: jsonData.market_cap_percentage.btc,
      ethCap: jsonData.market_cap_percentage.eth,
      volume: jsonData.total_volume.btc,
      marketCap: jsonData.total_market_cap.btc,
    });

    return jsonData;
  };

  function formatCompactNumber(number: number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1_000_000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
      return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "") + "T";
    }
  }

  useEffect(() => {
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
          <div>{formatCompactNumber(marketData.marketCap)}</div>
        </div>
        <div className="container">
          <GoDotFill fill="white"></GoDotFill>
          <div>{formatCompactNumber(marketData.volume)} </div>
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
              style={{ width: `${marketData.btcCap}%` }}
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
              style={{ width: `${marketData.ethCap}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
