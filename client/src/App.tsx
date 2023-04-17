import { useState } from "react";
import "./App.css";
import CallAPI from "./callAPI";
import Navbar from "./component/navbar";
import Sidebar from "./component/sidebar";
import TeamCompCards from "./component/teamCompCards";

// import ironImage from "./assets/Ranks/Season_2022-Iron.webp";

function App() {
  const [selectedRegion, setSelectedRegion] = useState<string>("NA");
  const [selectedMode, setSelectedMode] = useState<string>("Solo/Duo");
  const [selectedOption, setSelectedOption] = useState<string>("popularPick");
  const [selectedRank, setSelectedRank] = useState<number>(0);

  const handleOptionChange = (type: string, option: string | number) => {
    if (type === "region") {
      setSelectedRegion(option as string);
    } else if (type === "mode") {
      setSelectedMode(option as string);
    } else if (type === "option") {
      setSelectedOption(option as string);
    } else {
      if (selectedMode === "Solo/Duo" || selectedMode === "Flex") {
        setSelectedRank(parseInt(option as string));
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-col ">
      <CallAPI />
      <div className="flex h-1/5 w-full items-center justify-center bg-sky-900 py-4 text-center">
        <div className="text-xl font-bold text-yellow-400 lg:text-6xl">
          LOL Team Comp
        </div>
      </div>
      <Sidebar
        selectedRegion={selectedRegion}
        selectedMode={selectedMode}
        selectedOption={selectedOption}
        selectedRank={selectedRank}
        handleOptionChange={handleOptionChange}
      />
      {/* NavBar */}
      <div className="hidden lg:block">
        <Navbar
          selectedRegion={selectedRegion}
          selectedMode={selectedMode}
          selectedOption={selectedOption}
          selectedRank={selectedRank}
          handleOptionChange={handleOptionChange}
        />
      </div>
      <div className="flex h-4/6 w-full items-center justify-center px-4">
        <TeamCompCards
          selectedRegion={selectedRegion}
          selectedMode={selectedMode}
          selectedOption={selectedOption}
          selectedRank={selectedRank}
        />
      </div>
    </div>
  );
}

export default App;
