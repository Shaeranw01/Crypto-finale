import { useContext } from "react";

import { CoinDataContext } from "@/app/context/coinDataContext";

import HomeCharts from "../HomeChart";
export default function ChartContainer() {
  const { showComparison } = useContext(CoinDataContext);

  return <div>{!showComparison && <HomeCharts />}</div>;
}
