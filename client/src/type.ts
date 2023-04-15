export interface TeamComp {
  region: string;
  gameType: string;
  gameTier: string;
  gameDuration: [number, number];
  teamCompName: string;
  kills: number;
  deaths: number;
  result: boolean;
}

export interface CompCards {
  selectedRegion: string;
  selectedMode: string;
  selectedOption: string;
  selectedRank: number;
}
