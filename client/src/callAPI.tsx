import React, { useEffect, useState } from "react";
import axios from "axios";
import { TeamComp } from "./type";
import { createTeamCompObjects } from "./component/result";

const ChampionStats: React.FC = () => {
  const region = "NA1_";
  const API_KEY = "RGAPI-882dc7ba-cf6f-4b33-954f-ce37583cef21";
  const gameIDs = Array.from({ length: 5601 }, (_, i) => 4625424000 + i);
  const data = {
    region: "NA",
    teamCompName: "ASDA32",
    result: true,
  };
  useEffect(() => {
    const updateTeamCompData = async () => {
      fetch("http://localhost:5000/teamcompNA", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // for (const id of gameIDs) {
      //   try {
      //     const link = `https://americas.api.riotgames.com/lol/match/v5/matches/${region}${id}?api_key=${API_KEY}`;
      //     const response = await fetch(link);
      //     const data = await response.json();
      //     const [teamCompWinner, teamCompLoser] = createTeamCompObjects(
      //       region,
      //       data
      //     );

      //   } catch (error) {
      //     console.log(`Error fetching data for game ID ${id}:`, error);
      //   }
      // }
    };
    updateTeamCompData();
  }, []);

  return (
    <div>
      {/* {champion && winRate ? (
        <div>
          <p>Champion: {champion.name}</p>
          <p>Win Rate: {winRate.toFixed(2)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
};

export default ChampionStats;
