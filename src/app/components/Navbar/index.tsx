"use client";
import { FaCoins } from "react-icons/fa";
import { RiHome5Fill } from "react-icons/ri";
import { GoStack } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import SearchBar from "../SearchBar";
import Dropdown from "../DropDown";
import ThemeSwitch from "../ThemeSwitcher";
import Coinbar from "../Coinbar";
import Link from "next/link";
import { useCoinContext } from "@/app/hooks/useCoinContext";

export default function Navbar() {
  const { setShowConvertor } = useCoinContext();

  return (
    <div className="w-full flex flex-col ">
      <Coinbar />
      <div className="flex justify-center dark:bg-[#13121A] bg-[#FFFFFF] h-20 ">
        <div className="w-11/12  text-white text-2xl p-4 flex justify-between">
          <div className="w-60 flex justify-start items-center gap-2 text-xl font-bold">
            <FaCoins className="w-10 h-10 dark:fill-white fill-[#6161D6]"></FaCoins>
            <div className="text-[#353570] dark:text-white">Coin Trade</div>
          </div>

          <div className="w-64 flex justify-between items-center text-lg">
            <Link
              href="/"
              className="flex gap-2"
              onClick={() => setShowConvertor(false)}
            >
              <RiHome5Fill className="w-6 h-6 dark:fill-white fill-[#353570]"></RiHome5Fill>
              <span className="dark:text-white text-[#353570]">Home</span>
            </Link>

            <Link href="/portfolio" className="flex gap-2">
              <GoStack className="w-6 h-6 dark:fill-white fill-[#353570]"></GoStack>
              <span className="dark:text-white text-[#353570]">Portfolio</span>
            </Link>
          </div>

          <div className="w-1/3 flex justify-start items-center gap-4 text-lg ">
            <div className="w-56 flex justify-start items-center gap-4 dark:bg-[#191925] bg-[#CCCCFA66]  rounded-xl">
              <CiSearch className="w-1/3 h-6 dark:fill-white fill-[#424286]"></CiSearch>
              <SearchBar />
            </div>
            <Dropdown />
            <ThemeSwitch />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
