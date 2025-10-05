import { useContext } from "react";

import { CoinDataContext } from "@/app/context/coinDataContext";

import HomeCharts from "../HomeChart";
const ChartContainer = () => {
  const { showComparison } = useContext(CoinDataContext);

  return <div>{!showComparison && <HomeCharts />}</div>;
};
export default ChartContainer;
