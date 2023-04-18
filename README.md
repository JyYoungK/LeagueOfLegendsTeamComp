# LeagueOfLegendsTeamComp

Why hasn't anyone created a list of top or most-played team compositions for League of Legends? While there are lists for top champions and highest win rates, team composition is actually the most critical aspect of the game. It's possible to have the best and most meta champions in a game, but still end up with a poor team composition. Check out the team composition list that I have created that is fetched from real games.

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

### My Study Note:

To allow to read variables from .env, you need to install

`npm install dotenv`

and put `require("dotenv").config()` in side nodeJS
