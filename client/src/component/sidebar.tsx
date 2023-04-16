import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { NavbarProps } from "../type";
import { regions, gameModes, rankTitles } from "../constant/gameDetails";

const Sidebar = ({
  selectedRegion,
  selectedMode,
  selectedOption,
  selectedRank,
  handleOptionChange,
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar Burger Menu */}
      <div className="absolute right-3 top-3 mt-2 block lg:hidden">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="mr-2 h-6 w-6 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="mr-2 h-6 w-6 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`w-5/8 smooth-transition absolute top-0 z-10 h-full bg-gradient-to-tl from-white/10 to-[#336894] p-6 backdrop-blur-lg lg:hidden ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className="ml-2 mt-8 grid grid-rows-1 space-y-8">
          <div className="flex flex-row items-center space-x-4">
            <div className="text-xl font-bold text-white">Region:</div>
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
          </div>
          <div className="flex flex-row items-center space-x-4">
            <div className="text-xl font-bold text-white"> Game Mode:</div>
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
          <div className="flex flex-row items-center space-x-4">
            <input
              type="radio"
              name="popularPickOption"
              value="popularPick"
              checked={selectedOption === "popularPick"}
              onChange={() => handleOptionChange("option", "popularPick")}
              className="h-4 w-4 border-gray-300 focus:ring-blue-400"
            />
            <label
              htmlFor="popularPick"
              className="text-xl font-bold text-white"
            >
              Popular Pick
            </label>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <input
              type="radio"
              name="highestWinPickOption"
              value="highestWinRate"
              checked={selectedOption === "highestWinRate"}
              onChange={() => handleOptionChange("option", "highestWinRate")}
              className="h-4 w-4 border-gray-300 focus:ring-blue-400"
            />
            <label
              htmlFor="highestWinRate"
              className="text-xl font-bold text-white"
            >
              Highest Win Rate
            </label>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <div className="text-xl font-bold text-white"> Game Rank:</div>
            <select
              id="rank"
              name="rank"
              value={rankTitles[selectedRank]}
              onChange={(e) =>
                handleOptionChange("rank", rankTitles.indexOf(e.target.value))
              }
              className="mt-1 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-400 focus:outline-none focus:ring-blue-400 sm:text-sm"
            >
              {rankTitles.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <RiCloseLine
            className="absolute bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 transform rounded-full border-2 border-white text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
