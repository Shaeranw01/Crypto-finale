"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { setRequestMeta } from "next/dist/server/request-meta";
import gradient from "chartjs-plugin-gradient";
import { Bar, Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { useCoinContext } from "@/app/hooks/useCoinContext";

export default function HomeCharts() {
  const [chartData, setChartData] = useState({
    datesData: [],
    priceData: [],
    volumeData: [],
  });
  const { debouncedCurrency } = useCoinContext();
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
  const bgColor = [
    "rgba(240,12,147, 1)",
    "rgba(116, 116, 242, 0.8)",
    "rgba(240,12,147, 1)",
    "rgba(179, 116, 242, 0.8)",
  ];
  function getGradient(ctx, chartArea, color1, color2) {
    let gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  }
  async function fetchChartData(time: string) {
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
  }
  useEffect(() => {
    fetchChartData("365d");
  }, [debouncedCurrency]);

  const label = chartData.datesData;
  const dataset = chartData.priceData;

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
  // Chart.register(plugin);

  const data = {
    labels: label,
    datasets: [
      {
        label: "Price",
        data: dataset,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea, bgColor[0], bgColor[1]);
        },
        borderColor: "rgba(240,12,147, 1)",

        // borderWidth: 2, removed so getting the default border width

        tension: 0.4, //to create a curved chart instead of a straight line
        pointRadius: 0, // to remove the dots
        hoverPointRadius: 0, // to remove the values appearing on hover
        fill: true,
      },
    ],
  };

  const dataset2 = chartData.volumeData;
  const data2 = {
    labels: label,
    datasets: [
      {
        label: "Volume",
        data: dataset,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea, bgColor[2], bgColor[3]);
        },
        // borderColor: "rgba(120, 120, 250, 1)",

        // borderWidth: 2, removed so getting the default border width

        tension: 0.4, //to create a curved chart instead of a straight line
        pointRadius: 0, // to remove the dots
        hoverPointRadius: 0, // to remove the values appearing on hover
        fill: true,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex gap-5 justify-between  mt-10 mb-10 w-full">
        <div className="w-full h-[350px] dark:bg-[#191932] bg-white p-2 rounded-lg box-border flex justify-center">
          <Line data={data} options={options}></Line>
        </div>
        <div className="w-full h-[350px] dark:bg-[#191932] bg-white p-2 box-border flex justify-center rounded-lg">
          <Bar data={data2} options={options}></Bar>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          className="w-14 h-10 bg-red-200 rounded-lg p-3"
          onClick={() => fetchChartData("7d")}
        >
          7D
        </button>
        <button
          className="w-14 h-10 bg-red-200 rounded-lg p-3 "
          onClick={() => fetchChartData("30d")}
        >
          30D
        </button>
        <button
          className="w-14 h-10 bg-red-200 rounded-lg p-3"
          onClick={() => fetchChartData("365d")}
        >
          365D
        </button>
      </div>
    </div>
  );
}
