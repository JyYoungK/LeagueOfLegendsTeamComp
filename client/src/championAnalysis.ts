import TOP from "./assets/Roles/TOP.svg";
import JUNGLE from "./assets/Roles/JUNGLE.svg";
import MIDDLE from "./assets/Roles/MIDDLE.svg";
import BOTTOM from "./assets/Roles/BOTTOM.svg";
import UTILITY from "./assets/Roles/UTILITY.svg";
import FILL from "./assets/Roles/FILL.svg";
import { championIDs } from "./constant/championId";
import OPGGchampionStat from "./constant/OPGGchampionStat.json";
import { championDetails } from "./constant/championDetail";

export function getChampionNameAndRole(teamCompName: string) {
  const champions = teamCompName.split(", ").map((champion: string) => {
    const [name, role] = champion.split("-");
    return { name, role };
  });
  return champions;
}

export function getChampions(teamCompName: string) {
  const rolesInOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

  let champions = getChampionNameAndRole(teamCompName);

  champions.sort(
    (champion1, champion2) =>
      rolesInOrder.indexOf(champion1.role) -
      rolesInOrder.indexOf(champion2.role)
  );

  return champions;
}

export function getChampionStats(name: string) {
  let championID = championIDs[name];
  let championStats = null;

  for (let i = 0; i < OPGGchampionStat.data.length; i++) {
    if (OPGGchampionStat.data[i].id === championID) {
      championStats = OPGGchampionStat.data[i].average_stats;
      break;
    }
  }
  if (championStats !== null) {
    return {
      win_rate: championStats.win_rate,
      tier: championStats.tier,
    };
  }
  return {
    win_rate: 0,
    tier: 0,
  };
}

export function getTeamCompOverview(teamCompName: string) {
  let champions = getChampionNameAndRole(teamCompName);
  let teamDifficulty: string[] = [];
  let teamPowerSpike: string[] = [];
  champions.map((champion) => {
    const { name } = champion;
    const { difficulty, powerSpike } = championDetails[name];
    teamDifficulty.push(difficulty);
    teamPowerSpike.push(powerSpike);
  });

  let difficulty;
  let difficultyColor;
  let powerSpike;
  let powerSpikeColor;

  const severeCount = teamDifficulty.filter(
    (difficulty) => difficulty === "Hard"
  ).length;
  const hardCount = teamDifficulty.filter(
    (difficulty) => difficulty === "Hard"
  ).length;
  const easyCount = teamDifficulty.filter(
    (difficulty) => difficulty === "Easy"
  ).length;
  const lateCount = teamPowerSpike.filter(
    (difficulty) => difficulty === "Late"
  ).length;
  const earlyCount = teamPowerSpike.filter(
    (difficulty) => difficulty === "Early"
  ).length;
  if (hardCount >= 2 || (severeCount >= 1 && hardCount >= 1)) {
    difficulty = "Hard";
    difficultyColor = "bg-[#e75480]";
  } else if (easyCount >= 2) {
    difficulty = "Easy";
    difficultyColor = "bg-[#037d50]";
  } else {
    difficulty = "Average";
    difficultyColor = "bg-[#ec9a00]";
  }
  if (lateCount >= 2) {
    powerSpike = "Late";
    powerSpikeColor = "text-[#ff5480]";
  } else if (earlyCount >= 2) {
    powerSpike = "Early";
    powerSpikeColor = "text-[#039d50]";
  } else {
    powerSpike = "Mid";
    powerSpikeColor = "text-[#ef9d00]";
  }
  return {
    difficulty: difficulty,
    powerSpike: powerSpike,
    difficultyColor: difficultyColor,
    powerSpikeColor: powerSpikeColor,
  };
}

export function getRoleImage(role: string) {
  switch (role) {
    case "TOP":
      return TOP;
    case "JUNGLE":
      return JUNGLE;
    case "MIDDLE":
      return MIDDLE;
    case "BOTTOM":
      return BOTTOM;
    case "UTILITY":
      return UTILITY;
    default:
      return FILL;
  }
}
