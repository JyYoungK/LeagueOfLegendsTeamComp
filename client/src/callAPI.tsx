import React, { useEffect, useState } from "react";
import { createTeamCompObjects } from "./component/result";

const ChampionStats: React.FC = () => {
  const region = ["americas", "NA1_", "na1"];

  const gameIDs = Array.from({ length: 400000 }, (_, i) => 4626450400 + i);

  //4625425939

  useEffect(() => {
    const updateTeamCompData = async () => {
      for (const id of gameIDs) {
        try {
          const link = `https://${
            region[0]
          }.api.riotgames.com/lol/match/v5/matches/${region[1]}${id}?api_key=${
            import.meta.env.VITE_LOL_DEVELOPER_API_KEY
          }`;
          const response = await fetch(link);
          const data = await response.json();

          const [teamCompWinner, teamCompLoser] = await createTeamCompObjects(
            region,
            data
          );
          console.log(teamCompWinner);
          console.log(teamCompLoser);

          await fetch(
            "https://lolteamcompnaserver.onrender.com/updateTeamCompsNA",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(teamCompWinner),
            }
          );
          await fetch(
            "https://lolteamcompnaserver.onrender.com/updateTeamCompsNA",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(teamCompLoser),
            }
          );
        } catch (error) {
          console.log(`Error fetching data for game ID ${id}:`, error);
        }
      }
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
