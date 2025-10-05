import formatCompactNumber from "@/utlis/getFormattedPrice";
import { IoAddCircleSharp } from "react-icons/io5";

const DetailLine = ({ text, value }: { text: string; value: number }) => {
  return (
    <div className="w-[407px] h-[24px] flex gap-[12px]">
      <div className="w-[24px] h-[24px]">
        <IoAddCircleSharp className="fill-[#7878FA]" />
      </div>
      <div className="w-[180px] h-[11px] font-[400] text-[16px]  leading-[20.42px]">
        {text}
      </div>
      <div className="w-[175px] h-[14px] font-[500] text-[20px] leading-[25.52px]">
        ${formatCompactNumber(value)}
      </div>
    </div>
  );
};

export default DetailLine;
