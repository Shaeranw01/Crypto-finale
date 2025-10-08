"use client";

import { useState } from "react";
import AddAsset from "../AddAsset";

const PortfolioComponent = () => {
  const [showAddPopUp, setPopUp] = useState(false);

  const handlePopUp = () => {
    setPopUp(!showAddPopUp);
  };
  const handleSave = () => {
    setPopUp(!showAddPopUp);
  };
  return (
    <div className=" w-full   dark:bg-[#13121A] relative dark:text-white font-[Space_Grotesk] bg-[#F3F5F9] text-[#353570] p-20 box-border">
      <div className="w-full h-[100px] flex justify-between">
        <div>Your Statistics</div>
        <div>
          <button onClick={() => handlePopUp()}>Add Asset</button>
        </div>
      </div>
      {showAddPopUp && <AddAsset />}

      {showAddPopUp && (
        <div className="w-full h-20 flex gap-4 justify-between relative top-40">
          <button className="w-1/2" onClick={() => handleSave()}>
            {" "}
            Save
          </button>
          <button className="w-1/2" onClick={() => handlePopUp()}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioComponent;
