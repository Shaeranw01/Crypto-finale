import { PiLinkBold } from "react-icons/pi";
import { TbCopy } from "react-icons/tb";
const LinkDiv = ({ link }: { link: string }) => {
  return (
    <div className="w-[full]  dark:bg-[#1E1932]  bg-[#CCCCFA66] rounded-[12px] pt-[16px] flex justify-center items-center  p-5 gap-[10px] box-border">
      <a href={link}>
        {" "}
        <PiLinkBold className="w-[20px] h-[20px] dark:fill-white fill-[#353570]" />
      </a>

      <p className="w-2/3 text-center break-words font-[500] text-[16px]">
        {link}
      </p>

      <button>
        <TbCopy className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
};

export default LinkDiv;
