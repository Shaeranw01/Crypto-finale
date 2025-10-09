import { TiDeleteOutline } from "react-icons/ti";
import { CoinDataContext } from "@/app/context/coinDataContext";
import { useOutsideClick } from "@/app/hooks/useClickOutside";

import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  ChangeEvent,
} from "react";
import Image from "next/image";

import { GoStack } from "react-icons/go";

import { Coin } from "@/interfaces/Coininterface";

const AssetPopUp = ({
  showAddPopUp,
  setPopUp,
  handlePopUp,
  assetCoins,
  setAssetCoins,
}) => {
  const [showAsset, setAsset] = useState(true);
  const [amount, setAmount] = useState("");
  const [dateValue, setdateValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const number = parseInt(value);
    setAmount(number);
  };
  const [isOpen, setIsOpen] = useState(false);
  const { coinData } = useContext(CoinDataContext);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const [currentCurrency, setCurrency] = useState("Select Coin");

  const handleSave = () => {
    if (!selectedCoin || amount <= 0 || dateValue === "") {
      alert("Please select a coin and enter valid amount and date.");
      return;
    }
    const assetWithMetaData = {
      ...selectedCoin,
      purchaseDate: dateValue,
      purchaseAmount: amount,
    };

    setAssetCoins([...assetCoins, assetWithMetaData]);
    setAmount(0);
    setdateValue("");
    setSelectedCoin(null);
    setCurrency("Select Coin");
    setPopUp(false);
  };

  const ref = useRef(null);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropDown = () => {
    setIsOpen(false);
  };

  useOutsideClick(ref, closeDropDown);

  const handleSelect = (id: string) => {
    const asset: Coin | undefined = coinData.find(
      (coin: Coin) => coin.id === id
    );
    if (!asset) return;
    setSelectedCoin(asset);
    setCurrency(asset.name);
    closeDropDown();
  };

  useEffect(() => {}, [assetCoins]);

  return (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center  top-40">
      <div className="dark:bg-[#13121A] bg-white dark:text-white text-[#424286] w-[886px] h-[405px] rounded-xl p-12 flex flex-col gap-8 ">
        <div className="w-full h-4 flex justify-between">
          <div>Select Coins</div>
          <TiDeleteOutline
            className="w-6 h-6 dark:fill-white fill-[#424286]"
            onClick={() => setPopUp(false)}
          ></TiDeleteOutline>
        </div>

        <div className="w-full h-72 gap-8 flex justify-between">
          <div className="dark:bg-[#191932] bg-[#F3F5F9] w-72 rounded-xl flex flex-col justify-center items-center gap-2">
            <div className="w-16 h-16 rounded-md p-4 flex justify-between items-center">
              <div className="w-8 h-8">
                {selectedCoin ? (
                  <Image
                    src={selectedCoin.image}
                    width={30}
                    height={30}
                    alt="Picture of the coin"
                  />
                ) : (
                  <GoStack />
                )}
              </div>
            </div>
            <div className="h-7 font-[Space Grotesk] text-xl dark:text-white">
              {selectedCoin ? selectedCoin.name : "No Currency Selected..."}(
              {selectedCoin && selectedCoin?.symbol?.toUpperCase()})
            </div>
          </div>
          <div className="w-[461px] h-72 flex flex-col gap-8">
            <div className="  w-full h-11 rounded">
              <div
                className="w-[461px] h-10 relative  dark:bg-[#191932]  bg-[#CCCCFA66] text-[#424286]  dark:text-white transition delay-150 duration-700 ease-in-out rounded-xl  "
                ref={ref}
              >
                <button
                  className="p-2 dark:text-white text-[#424286] rounded-xl"
                  onClick={toggleDropDown}
                >
                  <span className="text-lg  ">{currentCurrency}</span>
                </button>
                <div className="absolute mt-2 max-h-64 overflow-y-auto w-full z-50">
                  {isOpen &&
                    coinData.map((coin: Coin, index: number) => {
                      if (coin.name !== currentCurrency)
                        return (
                          <button
                            key={`${coin.id}-${index}`}
                            className="flex gap-2 items-center p-1 dark:text-white dark:bg-[#191925] w-full bg-[#CCCCFA66] text-[#424286] "
                            onClick={() => handleSelect(coin.id)}
                          >
                            <span className="text-lg">{coin.name}</span>
                          </button>
                        );
                    })}
                </div>
              </div>
            </div>
            <div className="w-full">
              <input
                type="number"
                className=" dark:bg-[#191932]  bg-[#CCCCFA66] text-[#424286]  dark:text-white w-full h-11 rounded p-2 outline-none"
                value={amount}
                onChange={handleChange}
                placeholder="Purchased Amount"
                min={1} // Minimum positive integer
                step={1} // ✅ Only allows whole numbers
              />
            </div>
            <div className="w-full">
              <input
                type="date"
                className="w-full dark:bg-[#191932]  bg-[#CCCCFA66] text-[#424286]  dark:text-white h-11 rounded p-2"
                value={dateValue}
                onChange={(e) => setdateValue(e.target.value)}
                placeholder="Purchased date"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="w-full h-20 flex gap-4 justify-between ">
              <button className="w-1/2" onClick={() => handleSave()}>
                {" "}
                Save and Continue
              </button>
              <button className="w-1/2" onClick={() => setPopUp(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssetPopUp;
