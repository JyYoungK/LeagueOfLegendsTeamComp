# LeagueOfLegendsTeamComp

Demo URL: https://league-of-legends-team-comp.vercel.app/

### Frontend

- React as framework
- Typescript
- Tailwind/MUI for Design and CSS

### Backend

- MongoDB to store all the match games
- Used League of Legends API to collect
  matched games: /lol/match/v5/matches/{matchId}
  player data: /lol/league/v4/entries/by-summoner/{summonerID}

For further information check this link https://developer.riotgames.com/apis

Note:
To allow to read variables from .env, you need to install

npm install dotenv

and put

require("dotenv").config();
