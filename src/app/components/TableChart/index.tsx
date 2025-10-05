"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
import getLabelArray from "@/utlis/getLabelArray";

const Chart = ({ priceArray }: { priceArray: number[] }) => {
  const [priceData, setData] = useState(priceArray);

  const Line = dynamic(
    () => import("react-chartjs-2").then((mod) => mod.Line),
    {
      ssr: false,
    }
  );

  const labelArray = getLabelArray(priceArray.length);

  const bgColor = [
    "rgba(3,253,252, 0.6)",
    "rgba(252,129,129, 0.6)",
    "rgba(33,253,252, 0.3)",
    "rgba(252,129,129, 0.3)",
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

  const data = {
    labels: labelArray,
    datasets: [
      {
        data: priceData,

        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(
            ctx,
            chartArea,
            priceData[0] < priceData[priceData.length - 1]
              ? bgColor[0]
              : bgColor[1],
            priceData[0] < priceData[priceData.length - 1]
              ? bgColor[2]
              : bgColor[3]
          );
        },
        borderColor:
          priceData[0] < priceData[priceData.length - 1]
            ? bgColor[0]
            : bgColor[1],

        borderWidth: 1,

        tension: 0.4, //to create a curved chart instead of a straight line
        pointRadius: 0, // to remove the dots
        hoverPointRadius: 0, // to remove the values appearing on hover
        fill: true,
      },
    ],
  };
  const options = {
    plugins: {
      legend: false, // Hide legend
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
        display: false,
        grid: {
          drawTicks: false,
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <div className="w-[150px] h-[40px] dark:bg-[#191932] bg-white">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;
