import { getPercentage } from "@/utlis/getPercentage";

const TableBar = ({
  dividend,
  divisor,
  fillColor,
}: {
  dividend: number;
  divisor: number;
  fillColor: string;
}) => {
  const result = getPercentage(dividend, divisor);

  return (
    <div className={`w-[180px] rounded-xl h-1 bg-gray-400  relative`}>
      <div
        className={`rounded-2xl h-1 ${fillColor} absolute left-0 top-0`}
        style={{
          width: `${result}%`,
        }}
      ></div>
    </div>
  );
};

export default TableBar;
