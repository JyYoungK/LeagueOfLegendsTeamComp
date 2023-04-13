import express from "express";
import axios from "axios";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/api/champions", async (req, res) => {
  try {
    const response = await axios.get(
      "https://na1.api.riotgames.com/lol/match/v5/matches/NA1_4254586345",
      {
        params: {
          locale: "en_US",
          tags: "keys",
          api_key: "RGAPI-5af5f7ad-90e7-4eb0-8205-a5ecdcfbb01d",
        },
      }
    );
    const champions = response.data.data;
    console.log(champions);
    res.json(champions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch champions" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
