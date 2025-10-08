"use client";
import React from "react";
import Image from "next/image";

import { Coin } from "@/interfaces/Coininterface";
import PriceChange from "../PriceChange";
import TableBar from "../TableBar";
import ColorCode from "../ColorCode";
import { TiDeleteOutline } from "react-icons/ti";

const AssetStats = ({
  assetCoins,
  editAsset,
  setAssetCoins,
}: {
  assetCoins: Coin[];
  editAsset: boolean;
  setAssetCoins: React.Dispatch<React.SetStateAction<Coin[]>>;
}) => {
  const handleRemove = (id: string) => {
    const filteredAssets = assetCoins.filter((coin) => coin.id !== id);

    setAssetCoins(filteredAssets);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full mt-10 mb-10 z-100 flex flex-col gap-4">
        {assetCoins.map((asset: Coin, index: number) => {
          return (
            <div
              className={`relative ${editAsset ? "animate-wobble" : ""}`}
              key={`${asset.id}-${index}`}
            >
              {editAsset && (
                <button className="absolute -top-3 -right-3 z-100">
                  <TiDeleteOutline
                    className="w-6 h-6 dark:fill-white"
                    onClick={() => handleRemove(asset.id)}
                  ></TiDeleteOutline>
                </button>
              )}

              <div className="w-full h-60  dark:bg-[#1E1932] bg-white rounded-xl flex justify-start overflow-hidden text-[#424286] dark:text-white">
                <div className="w-1/3 p-6 flex flex-col gap-5 border-r-2 border-[#D1D1D1]">
                  <div className="flex justify-start gap-3">
                    <Image
                      src={asset.image}
                      width={30}
                      height={30}
                      alt="Picture of the coin"
                    />
                    <div className="font-[Space Grotesk] font-bold">
                      {asset.name} <span>({asset.symbol.toUpperCase()})</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-normal font-[Space Grotesk]">
                      Total Purchase
                    </div>
                    <div className=" font-bold font-[Space Grotesk]">
                      {(asset.purchaseAmount * asset.current_price).toFixed(2)}{" "}
                      {""} USD
                    </div>
                    <div className="dark:text-[#D1D1D1] font-normal font-[Space Grotesk]">
                      Purchased: {asset.purchaseDate}
                    </div>
                  </div>
                </div>
                <div className="w-2/3 p-6 grid grid-cols-2 gap-4">
                  <div className="p-3 dark:bg-[#1E1932] bg-[#CCCCFA66] flex flex-col border-dashed border-2 dark:border-gray-500  border-[#424286] rounded-lg">
                    <div className="font-[14px]">
                      {asset.current_price.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className=" font-light">Current Price</div>
                  </div>
                  <div className="p-3 dark:bg-[#1E1932] bg-[#CCCCFA66] flex flex-col border-dashed border-2 dark:border-gray-500  border-[#424286]  rounded-lg">
                    <div className="font-[20px]">
                      <PriceChange
                        value={asset.price_change_percentage_24h}
                      ></PriceChange>
                    </div>
                    <div className="font-[14px] dark:text-[#D1D1D1]">24h%</div>
                  </div>
                  <div className="p-3 dark:bg-[#1E1932] bg-[#CCCCFA66] flex flex-col border-dashed border-2 dark:border-gray-500  border-[#424286]  rounded-lg">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-start gap-3 items-center">
                        <ColorCode
                          dividend={asset.total_volume}
                          divisor={asset.market_cap}
                        ></ColorCode>
                        <TableBar
                          dividend={asset.total_volume}
                          divisor={asset.market_cap}
                          fillColor={
                            asset.total_volume / asset.market_cap > 0
                              ? "bg-[#03FDFC]"
                              : "bg-[#fc8181]"
                          }
                        ></TableBar>
                      </div>
                      <div className="dark:text-[#D1D1D1] font-[14px]">
                        Market Cap vs Volume
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="p-3 dark:bg-[#1E1932] bg-[#CCCCFA66] flex flex-col border-dashed border-2 dark:border-gray-500  border-[#424286] gap-3  rounded-lg">
                    <div className="font-[20px]">
                      <ColorCode
                        dividend={asset.circulating_supply}
                        divisor={asset.max_supply}
                      ></ColorCode>
                    </div>
                    <div className="font-[14px] dark:text-[#D1D1D1]">
                      Circ Supply vs Max Supply
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AssetStats;
