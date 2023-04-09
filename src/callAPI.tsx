import React, { useEffect, useState } from "react";
import axios from "axios";

interface Champion {
  id: number;
  key: string;
  name: string;
}

interface ChampionMastery {
  championPoints: number;
  championId: number;
  playerId: string;
  championLevel: number;
  chestGranted: boolean;
  tokensEarned: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  summonerId: string;
  totalChampionMasteryPoints: number;
  totalChampionMasteryLevel: number;
  wins: number;
  losses: number;
}

const apiKey = "RGAPI-5af5f7ad-90e7-4eb0-8205-a5ecdcfbb01d"; // Replace with your own API key
const region = "na1"; // Replace with your desired region
const championId = 266; // Replace with the ID of the desired champion (Aatrox in this example)
const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Use a proxy server to bypass CORS restrictions
const apiUrl = `https://${region}.api.riotgames.com`;

const ChampionStats: React.FC = () => {
  const [champion, setChampion] = useState<Champion | null>(null);
  const [winRate, setWinRate] = useState<number | null>(null);

  useEffect(() => {
    const getChampionStats = async () => {
      try {
        // First, get the list of champions
        const championsUrl = `${apiUrl}/lol/static-data/v3/champions?locale=en_US&tags=keys&api_key=${apiKey}`;
        const championsResponse = await fetch(championsUrl);
        let data = await championsResponse.json();
        console.log(data);
        // const champions: { [key: string]: number } =
        //   championsResponse.data.keys;

        // // Find the champion ID from the list of champions
        // const championKey = Object.keys(champions).find(
        //   (key) => champions[key] === championId
        // );
        // if (!championKey) {
        //   throw new Error(`Champion with ID ${championId} not found`);
        // }
        // const championName =
        //   championKey.charAt(0).toUpperCase() + championKey.slice(1);
        // setChampion({ id: championId, key: championKey, name: championName });

        // // Finally, get the win rate for the specified champion
        // const masteryUrl = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/{summonerId}/by-champion/${championId}?api_key=${apiKey}`;
        // const masteryResponse = await axios.get(masteryUrl);
        // const masteryData: ChampionMastery = masteryResponse.data;
        // const winRate =
        //   masteryData.wins / (masteryData.wins + masteryData.losses);
        // setWinRate(winRate);
      } catch (error) {
        console.error(error);
      }
    };

    getChampionStats();
  }, []);

  return (
    <div>
      {champion && winRate ? (
        <div>
          <p>Champion: {champion.name}</p>
          <p>Win Rate: {winRate.toFixed(2)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChampionStats;
