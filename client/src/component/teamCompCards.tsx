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

//https://op.gg/api/v1.0/internal/bypass/champions/na/ranked

interface CompData {
  teamCompName: string;
  played: number;
  winRate: number;
  win: number;
  gameDuration: number;
  kills: number;
  deaths: number;
}

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
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      {isLoadingData ? (
        <div className="flex h-full w-full items-center justify-center text-center">
          <img src={LOLLoading} alt="loading" />
        </div>
      ) : teamCompData.length > 0 ? (
        teamCompData.map((item, index) => {
          let tier;
          if (item.winRate > 70 || item.winRate == 1) {
            tier = "S";
          } else if (item.winRate > 60) {
            tier = "A";
          } else if (item.winRate > 50) {
            tier = "B";
          } else {
            tier = "C";
          }

          return (
            <div
              className="my-2 flex flex-col items-center rounded-xl border-4 border-black bg-gray-800 p-4 lg:flex-row"
              key={index}
            >
              <div className="mb-4 flex flex-row lg:mb-0 ">
                <img
                  src={`https://cdn.mobalytics.gg/assets/common/icons/hex-tiers/${tier}.svg?2`}
                  alt={`Comp Tier ${tier}`}
                  className="h-16 w-16"
                />
                <div className="mx-4 flex flex-row space-x-2 lg:min-w-[170px] lg:flex-col  lg:space-x-0">
                  <div
                    className={`${
                      getTeamCompOverview(item.teamCompName).difficultyColor
                    } text-md rounded-lg p-2 font-bold text-gray-200 lg:text-lg `}
                  >
                    {getTeamCompOverview(item.teamCompName).difficulty}{" "}
                    Difficulty
                  </div>
                  <div
                    className={`${
                      getTeamCompOverview(item.teamCompName).powerSpikeColor
                    } text-md rounded-lg p-2 font-bold lg:text-lg`}
                  >
                    {getTeamCompOverview(item.teamCompName).powerSpike} Game
                    Comp
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                {item.teamCompName &&
                  getChampions(item.teamCompName).map(
                    (champion: any, index: number) => (
                      <div key={index}>
                        <div className="relative mx-2 ">
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
                        <div className="text-sm font-bold text-white lg:text-xl">
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
              <div className="ml-0 mt-2 flex flex-col space-x-4 text-lg font-bold text-yellow-500 shadow-xl lg:ml-4 lg:mt-0 lg:min-w-[400px] lg:text-3xl">
                <div className="flex flex-row">
                  <div className="">
                    WIN RATE:{" "}
                    <span className="text-white">
                      {/* {item.winRate === 1 ? "100%" : `${item.winRate}%`} */}
                      {((item.win / item.played) * 100).toFixed(2) + `%`}
                    </span>
                  </div>
                  <div className="">
                    PLAYED: <span className="text-white">{item.played}</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="">
                    AVERAGE KILLS:{" "}
                    <span className="text-white">
                      {(item.kills / item.played).toFixed(2)}
                    </span>
                  </div>
                  <div className="">
                    AVERAGE DEATHS:{" "}
                    <span className="text-white">
                      {(item.deaths / item.played).toFixed(2)}
                    </span>{" "}
                  </div>
                </div>
                <div>
                  AVERAGE GAME LENGTH:{" "}
                  {formatTime(item.gameDuration / item.played)}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="my-2 flex h-full flex-row items-center justify-center rounded-xl border-4 border-black bg-gray-800 p-4">
          <div className="flex min-h-[120px] min-w-[1250px] items-center justify-center text-center text-3xl font-bold text-white shadow-xl">
            No Data Available
          </div>
        </div>
      )}
    </div>
  );
}

export default teamCompCards;
