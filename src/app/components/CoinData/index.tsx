"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CiLink } from "react-icons/ci";
import { FiCopy } from "react-icons/fi";
import PriceChange from "../PriceChange";
import { LuLayers3 } from "react-icons/lu";
import { MdArrowDropUp } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import DetailLine from "../DetailLine";
import LinkDiv from "../LinkDiv";
import { CoinPage } from "@/interfaces/CoinPageInterface";
import formatDate from "@/utlis/getFormattedDate";

const CoinData = ({ coinId }: { coinId: string }) => {
  const [coinData, setData] = useState<CoinPage>(Object);
  const price24Change: number =
    coinData?.market_data?.price_change_percentage_24h;
  const imageLink: string = coinData?.image?.thumb;

  useEffect(() => {
    fetchMoreData();
  }, [coinId]);

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      alert("error loading data");
    }
  };

  return (
    <div className=" w-screen h-[1200px]  dark:bg-[#13121A] relative dark:text-white font-[Space_Grotesk] bg-[#F3F5F9] text-[#353570] p-20 box-border">
      <div className=" absolute h-[420px] top-[248px] flex justify-between gap-[32px] ">
        <div className=" h-[333px] flex gap-[32px] ">
          <div className="w-[305px] h-[333px] flex flex-col gap-[16px]">
            <div className="h-[265px] w-[305px] rounded-[12px] pt-[40px] pr-[56px] pb-[40px] pl-[56px] flex flex-col gap-[24px] dark:bg-[#1E1932] bg-[#CCCCFA66]">
              <div className="w-[64px] h-[64px] rounded-[8px] p-[16px] dark: bg-[#2C2C4A] bg-[#CCCCFA66]  ">
                {imageLink && (
                  <Image
                    src={imageLink}
                    width={32}
                    height={32}
                    alt="coin-logo"
                  />
                )}
              </div>
              <div className="w-[178px] h-[28px]  text-[28px] font-[700] leading-[28px]  ">
                {coinData.name}
                <span> ({coinData?.symbol?.toUpperCase()})</span>
              </div>
            </div>
            <div className="w-[305px] h-[52px] rounded-[12px] pt-[16px] pr-[18px] pb-[16px] pl-[18px] flex gap-[16px] justify-around items-center dark:bg-[#1E1932] bg-[#CCCCFA66]">
              <CiLink className="w-[20px] h-[20px] dark:fill-white fill-[#353570]">
                <a href={coinData?.links?.homepage}></a>
              </CiLink>
              <div className="w-[180px]  font-[500] text-[16px] leading-[24px]">
                {coinData?.links?.homepage}
              </div>
              <FiCopy className="w-[20px] h-[20px]"></FiCopy>
            </div>
          </div>
          <div className="w-[355px] h-[333px] rounded-[12px] pt-[40px] pr-[56px] pb-[40px] pl-[56px] flex flex-col gap-[24px] dark:bg-[#1E1932] bg-[#CCCCFA66]">
            <div className="w-[243px] h-[69px]">
              <div className="flex justify-between items-center gap-[16px] w-[236px] h-[25px] ">
                <div className="w-[150px] h-[25px] font-[700] text-[36px] leading-[28px]  ">
                  {coinData?.market_data?.current_price.usd}
                </div>
                <div className="w-[82px] h-[20px]">
                  <div>
                    {" "}
                    <PriceChange value={price24Change} />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[243px] flex justify-center items-center">
              <LuLayers3 className="w-[24px] h-[24px]" />
            </div>

            <div className=" w-[243px] h-[112px] flex flex-col gap-[24px]">
              <div className="w-[240px] h-[44px] flex  justify-between gap-[16px]">
                <div className="h-[12px] w-[16px] top-[2px]">
                  <MdArrowDropUp className="fill-[#01F1E3] h-[30px] w-[30px]" />
                </div>
                <div className="w-[208px] h-[44px] flex flex-col gap-[12px]">
                  <div className="w-[196px] h-[14px]  font-[400] text-[16px] leading-[28px]  ">
                    All time high:{" "}
                    <span className="font-[500] text-[20px] leading-[24px]">
                      {coinData?.market_data?.ath?.usd}
                    </span>
                  </div>
                  <div className="w-[208px] h-[18px]  text-[14px] leading-[17.86px]">
                    {formatDate(coinData?.market_data?.ath_date?.usd)}
                  </div>
                </div>
              </div>
              <div className="w-[240px] h-[44px] flex gap-[16px] justify-between ">
                <div className="h-[12px] w-[16px] top-[2px]">
                  <MdArrowDropDown className="fill-[#FE2264] h-[30px] w-[30px]" />
                </div>
                <div className="w-[208px] h-[44px] flex flex-col gap-[12px]">
                  <div className="w-[196px] h-[14px]  font-[400] text-[16px] leading-[28px]  ">
                    All time Low:{" "}
                    <span className="font-[500] text-[20px] leading-[24px]">
                      {coinData?.market_data?.atl?.usd}
                    </span>
                  </div>
                  <div className="w-[208px] h-[18px]  text-[14px] leading-[17.86px]">
                    {formatDate(coinData?.market_data?.atl_date?.usd)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" h-[420px] rounded-[12px] p-8 flex flex-col gap-[16px] dark:bg-[#1E1932]  bg-[#CCCCFA66]">
          <div className=" h-[144px] flex flex-col gap-[16px] ">
            <DetailLine
              text={"Market Cap"}
              value={coinData?.market_data?.market_cap?.usd}
            />
            <DetailLine
              text={"Fully Diluted Valuation"}
              value={coinData?.market_data?.fully_diluted_valuation?.usd}
            />

            <DetailLine
              text={"Volume/Market"}
              value={Number(
                (
                  coinData?.market_data?.total_volume?.usd /
                  coinData?.market_data?.market_cap?.usd
                ).toFixed(2)
              )}
            />
          </div>
          <div className="w-full h-[104px] flex flex-col gap-[16px]">
            <DetailLine
              text={"Total Volume"}
              value={coinData?.market_data?.total_volume?.usd}
            />
            <DetailLine
              text={"Circulating Supply"}
              value={coinData?.market_data?.circulating_supply}
            />
            <DetailLine text={"Max Supply"} value={21000000} />
          </div>
        </div>
      </div>
      <div className=" absolute  top-[747px]  flex flex-col gap-3 ">
        <div className="font-[500] text-[20px] leading-[24px]">Description</div>

        <div className=" flex justify-between gap-6 pr-20 ">
          <div className="h-[202px] font-[400] text-[14px] leading-[21px]">
            {coinData?.description?.en}
          </div>
          <div className=" h-[52px] flex  flex-col gap-[24px]">
            <LinkDiv link={coinData?.links?.homepage[0]} />
            <LinkDiv link={coinData?.links?.blockchain_site[0]} />
            <LinkDiv link={coinData?.links?.blockchain_site[1]} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinData;
