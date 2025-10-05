import Image from "next/image";

import PriceChange from "../PriceChange";

const CarouselCoinContainer = ({
  selected,
  image,
  name,
  symbol,
  current_price,
  price_change_24h,
  selectedCurrency,
}: {
  selected: boolean;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_24h: number;
  selectedCurrency: string;
}) => {
  return (
    <div
      className={`${
        selected
          ? " bg-[#6161D680] text-[#424286] dark:bg-[#6161D680] dark:text-white"
          : "bg-white dark:bg-[#232336] text-[#424286]  dark:text-white"
      } w-[300px] h-[80px] flex items-center  rounded-lg p-2`}
    >
      <Image src={image} width={32} height={32} alt="Picture of the coin" />

      <div className="flex flex-col gap-1">
        <div className="dark:text-white text-[#353570] ">
          {name}
          <span>({symbol.toUpperCase()})</span>
        </div>
        <div className="flex items-center gap-1">
          <div>
            {current_price?.toFixed(2)} {selectedCurrency?.toUpperCase()}
          </div>
          <PriceChange value={price_change_24h} />
        </div>
      </div>
    </div>
  );
};

export default CarouselCoinContainer;
