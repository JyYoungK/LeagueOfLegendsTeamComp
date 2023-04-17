import { useEffect, useState } from "react";
import { CompCards } from "../type";
import {
  getTeamCompOverview,
  getChampions,
  getRoleImage,
  getChampionStats,
} from "../championAnalysis";
import { rankTitles, formatTime } from "../constant/gameDetails";
import LOLLoading from "../assets/LOLLoading.gif";
import PlayedLogo from "../assets/PlayedLogo.png";
import KillsLogo from "../assets/KillsLogo.png";
import TimeLogo from "../assets/TimeLogo.png";
import { CompData } from "../type";

//https://op.gg/api/v1.0/internal/bypass/champions/na/ranked

function teamCompCards({
  selectedRegion,
  selectedMode,
  selectedOption,
  selectedRank,
}: CompCards) {
  const [teamCompData, setTeamCompData] = useState<CompData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    let link;
    if (selectedMode === "Normal") {
      link = `https://lolteamcompnaserver.onrender.com/getTopTeamCompsNA?gameType=normals&filterOption=${selectedOption}`;
    } else if (selectedMode === "ARAM") {
      link = `https://lolteamcompnaserver.onrender.com/getTopTeamCompsNA?gameType=arams&filterOption=${selectedOption}`;
    } else if (selectedMode === "Solo/Duo") {
      link = `https://lolteamcompnaserver.onrender.com/getTopTeamCompsNA?gameType=${rankTitles[selectedRank]}rankedsolos&filterOption=${selectedOption}`;
    } else {
      link = `https://lolteamcompnaserver.onrender.com/getTopTeamCompsNA?gameType=${rankTitles[selectedRank]}rankedflexes&filterOption=${selectedOption}`;
    }

    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setIsLoadingData(false);
        setTeamCompData(data);
      })
      .catch((error) => console.error(error));
  }, [selectedMode, selectedOption, selectedRank]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-2 text-center">
      <div className="flex w-full flex-row items-center justify-center py-4 text-center">
        {/* Tier */}
        <div className="hidden w-1/5 text-2xl font-bold xl:block">TIER</div>
        {/* Comp */}
        <div className="hidden w-2/5 text-2xl font-bold xl:block">
          TEAM COMP
        </div>
        {/* Win Rate */}
        <div className="hidden w-1/10 text-2xl font-bold xl:block">
          WIN RATE
        </div>
        {/* Played */}
        <div className="hidden w-1/10 text-2xl font-bold xl:block">PLAYED</div>
        {/* Avg Kills */}
        <div className="hidden w-1/10 text-2xl font-bold xl:block">
          AVG KILLS
        </div>
        {/* Avg Game Length */}
        <div className="hidden w-1/10 text-2xl font-bold xl:block">
          AVG TIME
        </div>
      </div>
      <div className="w-full items-center justify-center py-4 text-center">
        {isLoadingData ? (
          <div className="flex h-full w-full items-center justify-center px-2 text-center">
            <img src={LOLLoading} alt="loading" />
          </div>
        ) : teamCompData.length > 0 ? (
          teamCompData.map((item, index) => {
            // let tier;
            // if (item.winRate > 70 || item.winRate == 1) {
            //   tier = "S";
            // } else if (item.winRate > 60) {
            //   tier = "A";
            // } else if (item.winRate > 50) {
            //   tier = "B";
            // } else {
            //   tier = "C";
            // }

            return (
              <div
                className="my-2 flex h-full w-full flex-col items-center rounded-xl border-4 border-green-400 bg-gray-800 p-4 md:flex-row"
                key={index}
              >
                {/* --------------------- Tier --------------------- */}
                <div className="mb-4 flex h-full w-full flex-row items-center justify-center px-2 text-center lg:mb-0 lg:w-1/5 lg:justify-evenly">
                  <div className="mr-2 w-1/4 items-center text-2xl text-gray-300 lg:text-5xl">
                    {index + 1}
                  </div>
                  <div className="flex w-3/4 flex-row items-center justify-center space-x-2 text-center lg:flex-col lg:space-x-0">
                    <div
                      className={`${
                        getTeamCompOverview(item.teamCompName).difficultyColor
                      } rounded-md p-2 text-sm font-bold text-gray-200 lg:mt-2 lg:text-lg`}
                    >
                      {getTeamCompOverview(item.teamCompName).difficulty}{" "}
                      Difficulty
                    </div>
                    <div
                      className={`${
                        getTeamCompOverview(item.teamCompName).powerSpikeColor
                      } rounded-md p-2 text-sm font-bold lg:text-lg`}
                    >
                      {getTeamCompOverview(item.teamCompName).powerSpike} Game
                      Comp
                    </div>
                  </div>
                </div>
                {/* --------------------- Team Comp --------------------- */}
                <div className="flex w-full flex-row justify-center lg:w-2/5">
                  {item.teamCompName &&
                    getChampions(item.teamCompName).map(
                      (champion: any, index: number) => (
                        <div key={index}>
                          <div className="relative mx-3 ">
                            <img
                              className="h-12 w-12 rounded-full border-4 border-black lg:h-24 lg:w-24"
                              src={`https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/${champion.name.toLowerCase()}.png?v3`}
                              alt={champion.name}
                            />
                            <img
                              src={getRoleImage(champion.role)}
                              alt={champion.role}
                              className="absolute bottom-0 right-2 h-4 w-4 lg:bottom-2 lg:right-2 lg:h-6 lg:w-6"
                            />
                          </div>
                          <div className="text-xs font-bold text-white lg:text-xl ">
                            WR:{" "}
                            {(
                              getChampionStats(champion.name)?.win_rate * 100
                            ).toFixed(1)}
                            %
                          </div>
                        </div>
                      )
                    )}
                </div>
                {/* --------------------- Stats --------------------- */}
                <div className="text-md ml-0 mt-2 flex w-full flex-row justify-center space-x-4 text-center font-bold text-yellow-500 lg:mt-0 lg:w-2/5 lg:space-x-0 lg:text-3xl">
                  <div className="w-1/4">
                    {((item.win / item.played) * 100).toFixed(2) + `%`}
                  </div>
                  <div className="flex w-1/4 flex-row justify-center text-center">
                    {item.played}
                    <img
                      src={PlayedLogo}
                      className="ml-1 h-4 w-4 md:ml-2 md:mt-0.5 md:h-6 md:w-6 lg:ml-2 lg:mt-0.5 lg:h-8 lg:w-8"
                    />
                  </div>
                  <div className="flex w-1/4 flex-row justify-center text-center">
                    {(item.kills / item.played).toFixed(0)}
                    <img
                      src={KillsLogo}
                      className="ml-1 h-4 w-4 md:ml-2 md:mt-0.5 md:h-6 md:w-6 lg:ml-2 lg:mt-0.5 lg:h-8 lg:w-8"
                    />
                  </div>
                  <div className="flex w-1/4 flex-row justify-center text-center">
                    {formatTime(item.gameDuration / item.played)}
                    <img
                      src={TimeLogo}
                      className="ml-1 h-4 w-4 md:ml-2 md:mt-0.5 md:h-6 md:w-6 lg:ml-2 lg:mt-0.5 lg:h-8 lg:w-8"
                    />
                  </div>

                  {/* <div className="">
                    AVERAGE DEATHS:{" "}
                    <span className="text-white">
                      {(item.deaths / item.played).toFixed(0)}
                    </span>{" "}
                  </div> */}
                </div>
              </div>
            );
          })
        ) : (
          <div className="my-2 flex h-full flex-row items-center justify-center rounded-xl border-4 border-black bg-gray-800 p-4">
            <div className="flex w-full items-center justify-center text-center text-3xl font-bold text-white shadow-xl">
              No Data Available
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default teamCompCards;
