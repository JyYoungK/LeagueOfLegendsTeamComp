import { useEffect, useState } from "react";
import sampleData from "../sampleData";
import { CompCards } from "../type";
import {
  getTeamCompOverview,
  getChampions,
  getRoleImage,
  getChampionStats,
} from "../championAnalysis";
import { rankTitles } from "../constant/gameDetails";

//https://op.gg/api/v1.0/internal/bypass/champions/na/ranked

interface CompData {
  teamCompName: string;
  played: number;
  winRate: number;
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
      link = `http://localhost:5000/getTopTeamCompsNA?gameType=normals&filterOption=${selectedOption}`;
    } else if (selectedMode === "ARAM") {
      link = `http://localhost:5000/getTopTeamCompsNA?gameType=arams&filterOption=${selectedOption}`;
    } else if (selectedMode === "Solo/Duo") {
      link = `http://localhost:5000/getTopTeamCompsNA?gameType=${rankTitles[selectedRank]}rankedsolos&filterOption=${selectedOption}`;
    } else {
      link = `http://localhost:5000/getTopTeamCompsNA?gameType=${rankTitles[selectedRank]}rankedflexes&filterOption=${selectedOption}`;
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
    <div className="flex h-full w-full flex-col items-center justify-center bg-sky-800 text-center">
      {isLoadingData ? (
        <div>Loading...</div>
      ) : (
        teamCompData &&
        teamCompData.map((item, index) => (
          <div
            className="my-2 flex flex-row items-center rounded-xl border-4 border-black bg-gray-800 p-4"
            key={index}
          >
            <img
              src={`https://cdn.mobalytics.gg/assets/common/icons/hex-tiers/S.svg?2`}
              alt={"Comp Tier"}
              className="h-16 w-16"
            />
            <div className="mx-4 flex flex-col">
              <div
                className={`${
                  getTeamCompOverview(item.teamCompName).difficultyColor
                } rounded-lg p-2 font-bold text-gray-200`}
              >
                {getTeamCompOverview(item.teamCompName).difficulty} Difficulty
              </div>
              <div
                className={`${
                  getTeamCompOverview(item.teamCompName).powerSpikeColor
                } rounded-lg p-2 text-lg font-bold`}
              >
                {getTeamCompOverview(item.teamCompName).powerSpike} Game Comp
              </div>
            </div>
            {item.teamCompName &&
              getChampions(item.teamCompName).map(
                (champion: any, index: number) => (
                  <div key={index}>
                    <div className="relative mx-2 ">
                      <img
                        className="h-24 w-24 rounded-full border-4 border-black"
                        src={`https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/${champion.name.toLowerCase()}.png?v3`}
                        alt={champion.name}
                      />
                      <img
                        src={getRoleImage(champion.role)}
                        alt={champion.role}
                        className="absolute bottom-2 right-2 h-6 w-6 "
                      />
                    </div>
                    <div className="font-bold text-white">
                      WR:{" "}
                      {(
                        getChampionStats(champion.name)?.win_rate * 100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                )
              )}
            <div className="ml-4 text-3xl font-bold text-yellow-500 shadow-xl">
              WIN RATE:{" "}
              <span className="text-white">
                {item.winRate === 1 ? "100%" : `${item.winRate}%`}
              </span>
            </div>
            <div className="ml-4 text-3xl font-bold text-yellow-500 shadow-xl">
              PLAYED: <span className="text-white">{item.played}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default teamCompCards;
