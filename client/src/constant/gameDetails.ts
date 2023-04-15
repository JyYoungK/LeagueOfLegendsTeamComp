import IronRank from "../assets/Ranks/Season_2022-Iron.webp";
import BronzeRank from "../assets/Ranks/Season_2022-Bronze.webp";
import SilverRank from "../assets/Ranks/Season_2022-Silver.webp";
import GoldRank from "../assets/Ranks/Season_2022-Gold.webp";
import PlatinumRank from "../assets/Ranks/Season_2022-Platinum.webp";
import DiamondRank from "../assets/Ranks/Season_2022-Diamond.webp";
import MasterRank from "../assets/Ranks/Season_2022-Master.webp";
import GrandmasterRank from "../assets/Ranks/Season_2022-Grandmaster.webp";
import ChallengerRank from "../assets/Ranks/Season_2022-Challenger.webp";

export const rankImages = [
  IronRank,
  BronzeRank,
  SilverRank,
  GoldRank,
  PlatinumRank,
  DiamondRank,
  MasterRank,
  GrandmasterRank,
  ChallengerRank,
];

export const rankTitles = [
  "iron",
  "bronze",
  "silver",
  "gold",
  "platinum",
  "diamond",
  "master",
  "grandmaster",
  "challenger",
];

// const regions = ["NA", "KR", "EUW", "EU", "JPN"];
export const gameModes = ["Normal", "ARAM", "Solo/Duo", "Flex"];
export const regions = ["NA"];

export function formatTime(seconds: number) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = (seconds % 3600) % 60;

  // Pad the numbers with leading zeros if necessary
  let hoursString = hours > 0 ? hours.toString().padStart(2, "0") + ":" : "";
  let minutesString = minutes.toString().padStart(2, "0");
  let remainingSecondsString = remainingSeconds
    .toFixed(0)
    .padStart(2, "0")
    .toString();

  return `${hoursString}${minutesString}:${remainingSecondsString}`;
}
