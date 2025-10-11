"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { useCoinContext } from "@/app/hooks/useCoinContext";

const HomeChart = () => {
  const [chartData, setChartData] = useState({
    datesData: [],
    priceData: [],
    volumeData: [],
  });
  const { debouncedCurrency } = useCoinContext();
  const [isClicked, setClicked] = useState("7d");
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
  const fetchChartData = useCallback(
    async (time: string) => {
      const { days, interval } = intervals[time];
      const data3 = await fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${debouncedCurrency}&days=${days}&interval=${interval}`
      );
      const jsonData3 = await data3.json();

      const dateArray = jsonData3.prices.map((price) =>
        new Date(price[0] * 1000).getDate()
      );

      const priceArray = jsonData3.prices.map((price) => price[1]);

      const volumeArray = jsonData3.total_volumes.map((volume) => volume[1]);

      setChartData({
        datesData: dateArray,
        priceData: priceArray,
        volumeData: volumeArray,
      });
    },
    [debouncedCurrency]
  );

  const options = {
    layout: {
      padding: {
        right: 0,
        left: 0,
      },
    },
    scales: {
      y: {
        display: false,
        ticks: { display: false },
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
  const lineData = useMemo(() => {
    return {
      labels: chartData.datesData,
      datasets: [
        {
          label: "Price",
          data: chartData.priceData,
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
  }, [chartData]);

  const barData = useMemo(() => {
    return {
      labels: chartData.datesData,
      datasets: [
        {
          label: "Volume",
          data: chartData.volumeData,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            // This case happens on initial chart load
            if (!chartArea) return;
            return getGradient(ctx, chartArea, "#9D62D9");
          },

          tension: 0.4, //to create a curved chart instead of a straight line
          pointRadius: 0, // to remove the dots
          hoverPointRadius: 0, // to remove the values appearing on hover
          fill: true,
        },
      ],
    };
  }, [chartData]);

  useEffect(() => {
    fetchChartData("365d");
  }, [fetchChartData]);

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex gap-5 justify-between  mt-10 mb-10 w-full">
        <div className="w-full h-[350px] dark:bg-[#191932] bg-white p-2 rounded-lg box-border flex justify-center">
          <Line data={lineData} options={options}></Line>
        </div>
        <div className="w-full h-[350px] dark:bg-[#191932] bg-white p-2 box-border flex justify-center rounded-lg">
          <Bar data={barData} options={options}></Bar>
        </div>
      </div>
      <div className="w-64 p-2 rounded-lg  bg-[#CCCCFA66] dark:bg-[#232336] flex gap-3 justify-between my-10 text-[#424286]  dark:text-white">
        <button
          className={`${
            isClicked === "7d" &&
            "bg-[#6161D680] text-[#424286]  dark:text-white dark:bg-[#6161D680] "
          } w-16 h-10 rounded-lg p-2`}
          onClick={() => {
            fetchChartData("7d");
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
            fetchChartData("30d");
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
            fetchChartData("365d");
            setClicked("365d");
          }}
        >
          365D
        </button>
      </div>
    </div>
  );
};
export default HomeChart;
