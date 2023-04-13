import { TeamComp } from "../type";
//4625425939
export const createTeamCompObjects = (
  region: string,
  data: any
): [TeamComp, TeamComp] => {
  const winningChampions: string[] = [];
  const losingChampions: string[] = [];
  let winner: string = "";
  let loser: string = "";
  data.info.participants.forEach((participant: any, index: number) => {
    if (participant.win) {
      winningChampions.push(participant.championName);
      if (index === 0) {
        winner = participant.teamId === 100 ? "Blue" : "Red";
      }
    } else {
      losingChampions.push(participant.championName);
      if (index === 5) {
        loser = participant.teamId === 100 ? "Blue" : "Red";
      }
    }
  });

  const teamCompWinner: TeamComp = {
    region: region,
    teamCompName: winningChampions.sort().join(", "),
    result: data.info.participant.win,
  };

  const teamCompLoser: TeamComp = {
    region: region,
    teamCompName: losingChampions.sort().join(", "),
    result: data.info.participant.win,
  };

  return [teamCompWinner, teamCompLoser];
};
