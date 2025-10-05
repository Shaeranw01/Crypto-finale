"use client";

import "chart.js/auto";

import { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useCoinContext } from "@/app/hooks/useCoinContext";
const HomeComparisonChart = ({ id1, id2 }: { id1: string; id2: string }) => {
  const [comparisonData, setComparisonData] = useState({
    selectedCoin1Data: [],
    selectedCoin2Data: [],
    volumeData1: [],
    volumeData2: [],
    timeData: [],
  });

  const { debouncedCurrency } = useCoinContext();
  const [isClicked, setClicked] = useState("7d");
  const [time, setTime] = useState("30d");
  const intervals = {
    "7d": {
      days: 7,
      interval: "hourly",
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
  async function getData(time, coinId1, coinId2) {
    const { days, interval } = intervals[time];

    const data1 = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId1}/market_chart?vs_currency=${debouncedCurrency}&days=${days}&interval=${interval}`
    );
    const jsonData1 = await data1.json();
    console.log("chart", jsonData1);

    const timeArray = jsonData1?.prices?.map((price) =>
      new Date(price[0] * 1000).getDate()
    );

    const priceData1 = jsonData1?.prices?.map((price) => price[1]);
    console.log("price 1", priceData1);
    const volumeArray1 = jsonData1.total_volumes.map((volume) => volume[1]);

    const data2 = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId2}/market_chart?vs_currency=${debouncedCurrency}&days=${days}&interval=${interval}`
    );
    const jsonData2 = await data2.json();

    const priceData2 = jsonData2?.prices?.map((price) => price[1]);
    const volumeArray2 = jsonData2.total_volumes.map((volume) => volume[1]);

    console.log("price 2", priceData2);

    setComparisonData({
      selectedCoin1Data: priceData1,
      selectedCoin2Data: priceData2,
      volumeData1: volumeArray1,
      volumeData2: volumeArray2,
      timeData: timeArray,
    });
  }

  useEffect(() => {
    getData(time, id1, id2);
  }, [time]);
  const label = comparisonData.timeData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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

  const lineData = {
    labels: label,
    datasets: [
      {
        label: id1,
        order: 2,
        data: comparisonData.selectedCoin1Data,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea, "#7878FA");
        },

        borderColor: "#7878FA",

        borderWidth: 2, //removed so getting the default border width

        tension: 0.4, //to create a curved chart instead of a straight line
        pointRadius: 0, // to remove the dots
        hoverPointRadius: 0, // to remove the values appearing on hover
        fill: true,
      },
      {
        label: id2,
        order: 1,
        data: comparisonData.selectedCoin2Data,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea, "#9D62D9");
        },
        borderColor: "#9D62D9",

        borderWidth: 2, //removed so getting the default border width

        tension: 0.4, //to create a curved chart instead of a straight line
        pointRadius: 0, // to remove the dots
        hoverPointRadius: 0, // to remove the values appearing on hover
        fill: true,
      },
    ],
  };
  const barData = {
    labels: label,
    datasets: [
      {
        label: id1,
        order: 2,
        data: comparisonData.volumeData1,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return "#7878FA";
          return getGradient(ctx, chartArea, "#7878FA");
        },

        borderColor: "#7878FA",

        borderWidth: 2,

        tension: 0.4, //to create a curved chart instead of a straight line
        pointRadius: 0, // to remove the dots
        hoverPointRadius: 0, // to remove the values appearing on hover
        fill: true,
      },
      {
        label: id2,
        order: 1,

        data: comparisonData.volumeData2,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return "#9D62D9";
          return getGradient(ctx, chartArea, "#9D62D9");
        },

        borderColor: "#9D62D9",

        borderWidth: 2,

        tension: 0.4, //to create a curved chart instead of a straight line
        pointRadius: 0, // to remove the dots
        hoverPointRadius: 0, // to remove the values appearing on hover
        fill: true,
      },
    ],
  };
  return (
    <div className="w-full my-5 flex flex-col gap-5">
      <div className="flex gap-5 justify-between  mt-10 mb-10 w-full">
        <div className="w-full h-[350px] dark:bg-[#191932] bg-white p-2 rounded-lg box-border flex justify-center">
          {lineData ? (
            <Line data={lineData} options={options}></Line>
          ) : (
            <p className="text-center text-black dark:text-white">
              Loading Chart data...
            </p>
          )}
        </div>
        <div className="w-full h-[350px] dark:bg-[#191932] bg-white p-2 box-border flex justify-center rounded-lg">
          <Bar data={barData} options={options}></Bar>
        </div>
      </div>
      <div className="w-64 p-2 rounded-lg  bg-[#CCCCFA66] dark:bg-[#232336] flex gap-3 justify-between  text-[#424286]  dark:text-white">
        <button
          className={`${
            isClicked === "7d" &&
            "bg-[#6161D680] text-[#424286]  dark:text-white dark:bg-[#6161D680] "
          } w-16 h-10 rounded-lg p-2`}
          onClick={() => {
            getData("7d", id1, id2);
            setClicked("7d");
            setTime("7d");
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
            getData("30d", id1, id2);
            setClicked("30d");
            setTime("30d");
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
            getData("365d", id1, id2);
            setClicked("365d");
            setTime("365d");
          }}
        >
          365D
        </button>
      </div>
    </div>
  );
};
export default HomeComparisonChart;
