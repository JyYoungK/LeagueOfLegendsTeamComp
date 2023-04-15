import { TeamComp } from "../type";
//4625425939

const getSummonerTier = async (
  region: string[],
  summonerID: string
): Promise<[string, string]> => {
  const link = `https://${
    region[2]
  }.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${
    import.meta.env.VITE_LOL_DEVELOPER_API_KEY
  }`;
  const response = await fetch(link);
  const data = await response.json();
  const summonerFlexTier =
    data.find((entry: any) => entry.queueType === "RANKED_FLEX_SR")?.tier ||
    "UNRANKED";
  const summonerSoloTier =
    data.find((entry: any) => entry.queueType === "RANKED_SOLO_5x5")?.tier ||
    "UNRANKED";
  return [summonerFlexTier, summonerSoloTier];
};

const flexRanks = [
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER",
];

const getHighestFlexRank = (teamTiers: Array<[string, string]>): string => {
  const flexTiers = teamTiers.filter((tier) =>
    flexRanks.includes(tier[1].toUpperCase())
  );
  const sortedTiers = flexTiers.sort(
    (a, b) =>
      flexRanks.indexOf(b[1].toUpperCase()) -
      flexRanks.indexOf(a[1].toUpperCase())
  );
  return sortedTiers.length > 0 ? sortedTiers[0][1] : "UNRANKED";
};

function splitNumber(num: number): [number, number] {
  const numStr = num.toString();
  const firstTwoDigits = parseInt(numStr.slice(0, 2));
  const lastTwoDigits = parseInt(numStr.slice(2, 4));
  return [firstTwoDigits, lastTwoDigits];
}

export const createTeamCompObjects = async (
  region: string[],
  data: any
): Promise<[TeamComp, TeamComp]> => {
  const winningChampions: string[] = [];
  const losingChampions: string[] = [];
  const winningTeamTier: Array<[string, string]> = [];
  const losingTeamTier: Array<[string, string]> = [];

  for (const participant of data.info.participants) {
    const [flexTier, soloTier] = await getSummonerTier(
      region,
      participant.summonerId
    );
    if (participant.win) {
      winningChampions.push(
        participant.teamPosition + "-" + participant.championName
      );
      winningTeamTier.push([flexTier, soloTier]);
    } else {
      losingChampions.push(
        participant.teamPosition + "-" + participant.championName
      );
      losingTeamTier.push([flexTier, soloTier]);
    }
  }

  let gameType = "";

  if (data.info.queueId === 420) {
    gameType = "Ranked Solo";
  } else if (data.info.queueId === 440) {
    gameType = "Ranked Flex";
  } else if (data.info.queueId === 400 || data.info.queueId === 430) {
    gameType = "Normal";
  } else {
    gameType = "ARAM";
  }
  let highestRank;

  if (gameType === "Ranked Flex") {
    highestRank = getHighestFlexRank(winningTeamTier);
  } else {
    highestRank = getHighestFlexRank(winningTeamTier);
  }

  let winnerKills,
    winnerDeath,
    loserKills,
    loserDeath = 0;
  if (data.info.teams[0].win) {
    winnerKills = data.info.teams[0].objectives.champion.kills;
    winnerDeath = data.info.teams[1].objectives.champion.kills;
    loserKills = data.info.teams[1].objectives.champion.kills;
    loserDeath = data.info.teams[0].objectives.champion.kills;
  } else {
    winnerKills = data.info.teams[1].objectives.champion.kills;
    winnerDeath = data.info.teams[0].objectives.champion.kills;
    loserKills = data.info.teams[0].objectives.champion.kills;
    loserDeath = data.info.teams[1].objectives.champion.kills;
  }

  const teamCompWinner: TeamComp = {
    region: region[1],
    gameType: gameType,
    gameTier: highestRank,
    gameDuration: splitNumber(parseInt(data.info.gameDuration)),
    teamCompName: winningChampions.sort().join(", "),
    kills: winnerKills,
    deaths: winnerDeath,
    result: true,
  };

  const teamCompLoser: TeamComp = {
    region: region[1],
    gameType: gameType,
    gameTier: highestRank,
    gameDuration: splitNumber(parseInt(data.info.gameDuration)),
    teamCompName: losingChampions.sort().join(", "),
    kills: loserKills,
    deaths: loserDeath,
    result: false,
  };

  return [teamCompWinner, teamCompLoser];
};
