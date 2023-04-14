import { useState } from "react";
import "./App.css";
import CallAPI from "./callAPI";
import IronRank from "./assets/Ranks/Season_2022-Iron.webp";
import BronzeRank from "./assets/Ranks/Season_2022-Bronze.webp";
import SilverRank from "./assets/Ranks/Season_2022-Silver.webp";
import GoldRank from "./assets/Ranks/Season_2022-Gold.webp";
import PlatinumRank from "./assets/Ranks/Season_2022-Platinum.webp";
import DiamondRank from "./assets/Ranks/Season_2022-Diamond.webp";
import MasterRank from "./assets/Ranks/Season_2022-Master.webp";
import GrandmasterRank from "./assets/Ranks/Season_2022-Grandmaster.webp";
import ChallengerRank from "./assets/Ranks/Season_2022-Challenger.webp";

// import ironImage from "./assets/Ranks/Season_2022-Iron.webp";

function App() {
  const [selectedRegion, setSelectedRegion] = useState("NA");
  const [selectedMode, setSelectedMode] = useState("Solo/Duo");
  const [selectedOption, setSelectedOption] = useState("popularPick");

  const handleOptionChange = (type: string, option: string) => {
    if (type === "region") {
      setSelectedRegion(option);
    } else if (type === "mode") {
      setSelectedMode(option);
    } else {
      setSelectedOption(option);
    }
  };

  const rankImages = [
    IronRank,
    BronzeRank,
    SilverRank,
    GoldRank,
    PlatinumRank,
    DiamondRank,
    MasterRank,
    GrandmasterRank,
    ChallengerRank,
  ];

  const regions = ["NA", "KR", "EUW", "EU", "JPN"];
  const gameModes = ["Normal", "ARAM", "Solo/Duo", "Flex"];

  return (
    <div className="flex h-full w-full flex-col">
      {/* <CallAPI /> */}
      <div className="flex h-1/5 w-full items-center justify-center border-2 border-black text-center">
        <div className="text-6xl font-bold"> League of Legends Team Comp </div>
      </div>
      <div className="flex h-1/6 w-full flex-col items-center justify-between border-2 border-black text-center lg:flex-row">
        <div className="ml-4 flex flex-row">
          <div className="flex flex-row">
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
          <div className="ml-4 flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="option"
                value="popularPick"
                checked={selectedOption === "popularPick"}
                onChange={() => handleOptionChange("type", "popularPick")}
                className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              <label htmlFor="popularPick" className="ml-2 text-gray-700">
                Popular Pick
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="option"
                value="highestWinRate"
                checked={selectedOption === "highestWinRate"}
                onChange={() => handleOptionChange("type", "highestWinRate")}
                className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              <label htmlFor="highestWinRate" className="ml-2 text-gray-700">
                Highest Win Rate
              </label>
            </div>
          </div>
        </div>

        <div className="mr-8 grid grid-cols-5 gap-4 md:grid-cols-9">
          {rankImages.map((image, index) => (
            <img key={index} src={image} alt={image} className="w-12" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
