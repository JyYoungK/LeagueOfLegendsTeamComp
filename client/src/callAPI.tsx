import React, {useEffect, useState} from 'react';
import axios from 'axios';

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

const apiKey = 'RGAPI-5af5f7ad-90e7-4eb0-8205-a5ecdcfbb01d'; // Replace with your own API key
const region = 'na1'; // Replace with your desired region
const championId = 266; // Replace with the ID of the desired champion (Aatrox in this example)
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Use a proxy server to bypass CORS restrictions
const apiUrl = `https://${region}.api.riotgames.com`;

const ChampionStats: React.FC = () => {
  const [champion, setChampion] = useState<Champion | null>(null);
  const [winRate, setWinRate] = useState<number | null>(null);

  useEffect(() => {
    async function fetchChampions() {
      try {
        const response = await axios.get(
          'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/static-data/v3/champions',
          {
            params: {
              locale: 'en_US',
              tags: 'keys',
              api_key: 'RGAPI-5af5f7ad-90e7-4eb0-8205-a5ecdcfbb01d',
            },
          },
        );
        const champions = response.data.data;
        return champions;
      } catch (error) {
        console.error(error);
      }
    }

    fetchChampions();
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
