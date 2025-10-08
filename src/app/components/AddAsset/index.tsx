"use client";

import AssetPopUp from "../AssetPopUp";
import useLocalState from "@/app/hooks/useLocalState";
import { CiEdit } from "react-icons/ci";
import React, { useState } from "react";
import AssetStats from "../AssetStats";

const AddAsset = () => {
  const [showAsset, setAsset] = useState(true);
  const [editAsset, setEdit] = useState(false);

  const [assetCoins, setAssetCoins] = useLocalState("assetCoins", []);
  const [showAddPopUp, setPopUp] = useState(false);

  const handlePopUp = () => {
    setPopUp(true);
  };

  const handleEdit = () => {
    setEdit(!editAsset);
  };

  return (
    <div className="w-full min-h-screen relative dark:text-white font-[Space_Grotesk] text-[#353570] p-20 box-border bg-[#F3F5F9] dark:bg-[#13121A]">
      <div className="w-full flex justify-between">
        <div>Your Statistics</div>
        <div>
          <button onClick={() => handlePopUp()}>Add Asset</button>
        </div>
      </div>
      {showAddPopUp && (
        <AssetPopUp
          showAddPopUp={showAddPopUp}
          setPopUp={setPopUp}
          handlePopUp={handlePopUp}
          assetCoins={assetCoins}
          setAssetCoins={setAssetCoins}
        />
      )}
      <AssetStats
        assetCoins={assetCoins}
        setAssetCoins={setAssetCoins}
        editAsset={editAsset}
      ></AssetStats>
      <div className="flex items-center justify-center">
        <CiEdit className="w-10 h-10 " onClick={() => handleEdit()}></CiEdit>
      </div>
    </div>
  );
};
export default AddAsset;
