"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import Slider from "react-slick";

import { useCoinContext } from "@/app/hooks/useCoinContext";

import { Coin } from "@/app/interfaces/Coininterface";

import HomeComparisonChart from "../HomeComparisonChart";
import CarouselCoinContainer from "../CarouselCoinContainer";
import { SliderCoin } from "@/interfaces/SliderCoinInterface";

const Carousel = () => {
  const { coinData, showComparison, setShowComparison, selectedCurrency } =
    useCoinContext();
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const [sliderData, setSliderData] = useState<SliderCoin[]>([]);

  const [selectedSlides, setSelectedSlides] = useState<SliderCoin[]>([]);

  function slider(array: SliderCoin[]) {
    setSliderData(array);
  }

  useEffect(() => {
    if (coinData.length > 0) {
      const coinsInSlides = coinData.map((coin: Coin, index: number) => ({
        ...coin,
        selected: index === 0,
      }));

      slider(coinsInSlides);
    }
  }, [coinData]);

  const numberofSelectedSlides: number = sliderData.filter(
    (coin) => coin.selected
  ).length;

  const handleSelect = (coin: SliderCoin) => {
    const updatedSlides = sliderData.map((slide: SliderCoin) => {
      if (slide.id === coin.id) {
        if (slide.selected === false && numberofSelectedSlides < 2) {
          slide.selected = true;
        } else if (slide.selected === true) {
          slide.selected = false;
        }
      }
      return slide;
    });

    setSliderData(updatedSlides);

    const selectCoins = sliderData.filter((coin) => coin.selected === true);

    setSelectedSlides(selectCoins);
  };

  const handleComparison = () => {
    setShowComparison(!showComparison);
    if (showComparison === false) {
      const unselectedSlides = sliderData.map((slide: SliderCoin) => {
        if (slide.selected === true) {
          slide.selected = false;
        }
        return slide;
      });

      setSliderData(unselectedSlides);
      // setSelectedSlides([]);
    }
  };
  return (
    <div className="w-full mt-10 flex flex-col gap-4">
      <div className="w-full h-14 mt-10">
        <div className="flex mb-6 justify-between">
          <h1>Select the currencies to view statistics</h1>
          <button
            className="
                    bg-[#6161D680] text-[#424286]  dark:text-white dark:bg-[#6161D680]
                     w-44 h-14 flex justify-center items-center  rounded-lg"
            onClick={handleComparison}
          >
            {showComparison ? "Exit Comparison" : "Compare"}
          </button>
        </div>
      </div>
      <div className="w-full h-[120px]">
        <Slider {...settings}>
          {sliderData?.map((coin: SliderCoin, index: number) => (
            <div key={`${coin.id}-${index}`} onClick={() => handleSelect(coin)}>
              <CarouselCoinContainer
                selected={coin.selected}
                image={coin.image}
                name={coin.name}
                symbol={coin.symbol}
                current_price={coin.current_price}
                price_change_24h={coin.price_change_percentage_24h}
                selectedCurrency={selectedCurrency}
              ></CarouselCoinContainer>
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-full"></div>

      {showComparison &&
        selectedSlides[0].id !== "" &&
        selectedSlides[1].id !== "" && (
          <HomeComparisonChart
            id1={selectedSlides[0].id}
            id2={selectedSlides[1].id}
          ></HomeComparisonChart>
        )}
    </div>
  );
};

export default Carousel;
