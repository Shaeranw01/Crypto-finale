"use client";

import "chart.js/auto";
import dynamic from "next/dynamic";
import { useContext, useState, useEffect } from "react";
import { Coin } from "@/interfaces/Coininterface";
import { BsAspectRatio } from "react-icons/bs";
import { Line } from "react-chartjs-2";
import { useCoinContext } from "@/app/hooks/useCoinContext";

const ConvertorChart = ({
  fromCoin,
  toCoin,
}: {
  fromCoin: Coin;
  toCoin: Coin;
}) => {
  const [priceData, setPriceData] = useState({
    displayData: [],
    timeData: [],
  });
  const intervals = {
    "7d": {
      days: 7,
      interval: "daily",
    },
    "30d": {
      days: 30,
      interval: "daily",
    },
    "365d": {
      days: 365,
      interval: "daily",
    },
  };

  const { debouncedCurrency } = useCoinContext();
  const [isClicked, setClicked] = useState("365d");
  async function getData(time, coinId1, coinId2) {
    const { days, interval } = intervals[time];
    const data1 = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId1}/market_chart?vs_currency=${debouncedCurrency}&days=${days}&interval=${interval}`
    );
    const jsonData1 = await data1.json();

    const timeArray = jsonData1?.prices?.map((price: number) =>
      new Date(price[0] * 1000).getDate()
    );

    const priceData1 = jsonData1?.prices?.map((price: number) => price[1]);

    const data2 = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId2}/market_chart?vs_currency=${debouncedCurrency}&days=${days}&interval=${interval}`
    );
    const jsonData2 = await data2.json();

    const priceData2 = jsonData2?.prices?.map((price: number) => price[1]);

    const ratioData = priceData1.map((value: number, index: number) => {
      const denom = priceData2[index] || 1;
      return value / denom;
    });

    setPriceData({
      displayData: ratioData,

      timeData: timeArray,
    });
  }

  function getGradient(ctx, chartArea, color) {
    let gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.6, color + "99");
    gradient.addColorStop(0.8, color + "66");
    gradient.addColorStop(1, color + "00");
    return gradient;
  }

  useEffect(() => {
    getData("365d", fromCoin?.id, toCoin?.id);
  }, [fromCoin.id, toCoin.id]);

  const label = priceData.timeData;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { display: false, min: 0 },
        grid: {
          drawTicks: false,
          display: false,
        },
      },

      x: {
        grid: {
          drawTicks: false,
          display: false,
        },
      },
    },
  };

  const data = {
    labels: label,
    datasets: [
      {
        data: priceData.displayData,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea, "#7878FA");
        },
        borderColor: "#7878FA",

        borderWidth: 1,

        tension: 0.4, //to create a curved chart instead of a straight line
        pointRadius: 0, // to remove the dots
        hoverPointRadius: 0, // to remove the values appearing on hover
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full mt-5 flex flex-col gap-5">
      <div className=" w-full h-[300px]">
        <Line data={data} options={options}></Line>
      </div>
      <div className="w-64 p-2 rounded-lg  bg-[#CCCCFA66] dark:bg-[#232336] flex gap-3 justify-between m-10 text-[#424286]  dark:text-white">
        <button
          className={`${
            isClicked === "7d" &&
            "bg-[#6161D680] text-[#424286]  dark:text-white dark:bg-[#6161D680] "
          } w-16 h-10 rounded-lg p-2`}
          onClick={() => {
            getData("7d", fromCoin?.id, toCoin?.id);
            setClicked("7d");
          }}
        >
          7D
        </button>
        <button
          className={`${
            isClicked === "30d" &&
            "bg-[#6161D680] text-[#424286]  dark:text-white dark:bg-[#6161D680] "
          } w-16 h-10 rounded-lg p-2`}
          onClick={() => {
            getData("30d", fromCoin?.id, toCoin?.id);
            setClicked("30d");
          }}
        >
          30D
        </button>
        <button
          className={`${
            isClicked === "365d" &&
            "bg-[#6161D680] text-[#424286]  dark:text-white dark:bg-[#6161D680] "
          } w-16 h-10 rounded-lg p-2`}
          onClick={() => {
            getData("365d", fromCoin?.id, toCoin?.id);
            setClicked("365d");
          }}
        >
          365D
        </button>
      </div>
    </div>
  );
};
export default ConvertorChart;
