export interface NavbarProps {
  selectedRegion: string;
  selectedMode: string;
  selectedOption: string;
  selectedRank: number;
  handleOptionChange: (type: string, option: string | number) => void;
}

export interface TeamComp {
  region: string;
  gameType: string;
  gameTier: string;
  gameDuration: number;
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

export interface CompData {
  teamCompName: string;
  played: number;
  winRate: number;
  win: number;
  gameDuration: number;
  kills: number;
  deaths: number;
}
