const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const teamCompSchema = require("./models/schema");
const app = express();
// const TeamComp = require("./models/productModel");

const cors = require("cors");

const PORT = 5000;

//Add cors or else it will throw a CORS policy error when trying to fetch
app.use(cors());
//Add Middleware or else it won't send any body in POST call!!!
app.use(express.json());

app.get("/", (req, res) => {
  //First route
  res.send("This is a server to call League of Legends Team Comp");
});

//Find Games Played
app.get("/allGamesPlayedNA", async (req, res) => {
  try {
    const count = await TeamComp.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Find Top Played Team Comps
app.get("/getTopTeamCompsNA", async (req, res) => {
  try {
    const modelName = req.query.gameType;

    const TeamCompModel = mongoose.model(modelName, teamCompSchema);

    let topTeamComps;
    if (req.query.filterOption === "popularPick") {
      topTeamComps = await TeamCompModel.find({})
        .sort({ played: -1, winRate: -1 }) //Sort by played amount than win rate
        .limit(20);
    } else {
      topTeamComps = await TeamCompModel.find({
        played: { $gte: 2 }, // Filter by at least two plays
        $or: [
          { winRate: 1 }, // winRate is 1 or above
          { winRate: { $gte: 50 } }, // winRate is above 50
        ],
      })
        .sort({ winRate: -1, played: -1 }) //Sort by win rate than played amount
        .limit(20);
    }

    res.status(200).json(topTeamComps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Add teamcomps to database
app.post("/updateTeamCompsNA", async (req, res) => {
  try {
    const gameType = req.body.gameType;
    let modelName;

    //Only show gameTier if it's ranked games
    if (gameType === "Ranked Solo" || gameType === "Ranked Flex") {
      modelName = req.body.gameTier + gameType.replace(" ", "");
    } else {
      modelName = gameType.replace(" ", "");
    }

    const TeamCompModel = mongoose.model(modelName, teamCompSchema);

    const existingTeamComp = await TeamCompModel.findOne({
      teamCompName: req.body.teamCompName,
    });

    if (existingTeamComp) {
      // If a document with the given teamCompName already exists, update it
      const updateQuery = {};
      updateQuery.played = existingTeamComp.played + 1;
      if (req.body.result) {
        // If Result is true, increment win property
        updateQuery.win = existingTeamComp.win + 1;
        updateQuery.winRate =
          (existingTeamComp.win + 1) / (existingTeamComp.played + 1);
      } else {
        // If Result is false, increment lose property
        updateQuery.lost = existingTeamComp.lost + 1;
        updateQuery.winRate =
          existingTeamComp.win / (existingTeamComp.played + 1);
      }
      const updatedTeamComp = await TeamCompModel.findOneAndUpdate(
        { teamCompName: req.body.teamCompName },
        { $set: updateQuery },
        { new: true }
      );
      res.status(200).json(updatedTeamComp);
    } else {
      // If a document with the given teamCompName does not exist, create a new one
      const newTeamComp = await TeamCompModel.create({
        ...req.body,
        played: 1,
        winRate: req.body.result ? 100 : 0,
        win: req.body.result ? 1 : 0,
        lost: req.body.result ? 0 : 1,
      });
      res.status(200).json(newTeamComp);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://JYK:${process.env.MONGODB_PW}@lolteamcomp.ah4jfli.mongodb.net/NA?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on port: http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
