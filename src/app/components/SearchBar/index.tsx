"use client";

import { useOutsideClick } from "@/app/hooks/useClickOutside";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Coin } from "@/app/interfaces/Coininterface";

export default function SearchBar() {
  const [data, setData] = useState<Coin[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const ref = useRef(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  //timer as ueref is not updated on every rerender
  const timer = useRef<HTMLDivElement>(null);
  function debounce(callback: (...args: any[]) => void, delay: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }
  const fetchData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?key=CG-YHe92rLkyEoghZERKMWNmW5K&query=${query.toLowerCase()}`
    );
    const allData = await response.json();

    setData(allData.coins);
  };
  const debouncedFetchData = debounce(fetchData, 100);

  const closeList = () => {
    setIsOpen(false);
  };
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
    setQuery("");
  };

  useOutsideClick(ref, closeList);

  useEffect(() => {
    if (query) {
      debouncedFetchData();
    } else {
      setData([]); // Clear results if query is empty
    }
  }, [query]);

  return (
    <div
      className=" h-10 w-full dark:bg-[#191925] bg-[#CCCCFA66] flex  relative flex-col gap-4  p-2 rounded-md "
      ref={ref}
      onClick={toggleDropDown}
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="rounded-md w-full outline-none dark:bg-[#191925]  h-full bg-transparent font-light placeholder-[#424286] dark:placeholder-white"
      />
      {isOpen && (
        <div className=" rounded-md z-50 absolute overflow-auto left-0 w-full h-80 mt-6">
          {data.length > 0 &&
            data.map((coin) => (
              <button
                key={coin.id}
                className="flex justify-start pt-4 dark:bg-[#191925] bg-[#CCCCFA66] text-[#424286] pl-2  w-full text-left  dark:text-white font-light"
              >
                <Link href={`/coin/${coin.id}`}>{coin.name}</Link>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
