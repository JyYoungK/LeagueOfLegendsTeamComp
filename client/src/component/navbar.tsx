import React from "react";
import { regions, gameModes, rankImages } from "../constant/gameDetails";
import { NavbarProps } from "../type";

function navbar({
  selectedRegion,
  selectedMode,
  selectedOption,
  selectedRank,
  handleOptionChange,
}: NavbarProps) {
  return (
    <div className="flex h-1/6 w-full flex-col items-center justify-between bg-sky-900 py-4 text-center lg:flex-row">
      <div className="ml-4 flex flex-row">
        <div className="flex flex-row space-x-4">
          <select
            id="region"
            name="region"
            value={selectedRegion}
            onChange={(e) => handleOptionChange("region", e.target.value)}
            className="mt-1 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-400 focus:outline-none focus:ring-blue-400 sm:text-sm"
          >
            {regions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            id="gameModes"
            name="gameModes"
            value={selectedMode}
            onChange={(e) => handleOptionChange("mode", e.target.value)}
            className="mt-1 rounded-md border-gray-300 py-2 pl-3 pr-10  focus:border-blue-400 focus:outline-none focus:ring-blue-400 sm:text-sm"
          >
            {gameModes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="ml-4 flex items-center space-x-4 text-lg">
          <div className="flex items-center">
            <input
              type="radio"
              name="option"
              value="popularPick"
              checked={selectedOption === "popularPick"}
              onChange={() => handleOptionChange("option", "popularPick")}
              className="h-4 w-4 border-gray-300 focus:ring-blue-400"
            />
            <label htmlFor="popularPick" className="ml-2 font-bold text-white">
              Popular Pick
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="option"
              value="highestWinRate"
              checked={selectedOption === "highestWinRate"}
              onChange={() => handleOptionChange("option", "highestWinRate")}
              className="h-4 w-4 border-gray-300 focus:ring-blue-400"
            />
            <label
              htmlFor="highestWinRate"
              className="ml-2 font-bold text-white"
            >
              Highest Win Rate
            </label>
          </div>
        </div>
      </div>

      <div className="mr-8 grid grid-cols-5 gap-4 md:grid-cols-9">
        {rankImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleOptionChange("rank", index.toLocaleString())}
            disabled={selectedMode !== "Solo/Duo" && selectedMode !== "Flex"}
            className={`w-12 ${
              selectedMode !== "Solo/Duo" && selectedMode !== "Flex"
                ? "grayscale"
                : ""
            } ${selectedRank == index ? "rankImage" : "grayscale"}`}
          >
            <img src={image} alt={image} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default navbar;
