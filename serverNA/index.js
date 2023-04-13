const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const TeamComp = require("./models/productModel");
const app = express();
const PORT = 5000;

//Add Middleware or else it won't send any body in POST call!!!
app.use(express.json());

//--bodyParser and Cors are both middleware

//body-parser is a middleware that is commonly used in Node.js web applications to parse incoming request bodies in a middleware before handling the request. It allows you to extract data from the request body and make it available in your server-side code.

// app.use(bodyParser.json());

// app.use("/users", usersRoutes);

// const MONGO_URL =
//   "mongodb+srv://JYK:y73VJIozpDkIV16Z@lolteamcomp.ah4jfli.mongodb.net/?retryWrites=true&w=majority";
// const apiKey = "RGAPI-882dc7ba-cf6f-4b33-954f-ce37583cef21";
// const region = "NA1_";
// const gameID = "4625425939";

//app.use(cors())
//CORS stands for Cross-Origin Resource Sharing. In Node.js, CORS is a mechanism that allows web applications running on one domain to access resources from another domain. It is a security feature that helps prevent unauthorized access to a server's resources from a different origin.

//Installing Nodemon in your Node.js project allows you to automatically restart the server whenever changes are made to your code, eliminating the need to manually restart the server each time you make updates.

//-dev what does this do? When we publish our application, no one is going to be running our server. So we are installing this dependency only for our own development purposes.

app.get("/", (req, res) => {
  //First route
  res.send("This is a server to call League of Legends Team Comp");
});

//Add to database
app.post("/teamcompNA", async (req, res) => {
  try {
    const existingTeamComp = await TeamComp.findOne({
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
      const updatedTeamComp = await TeamComp.findOneAndUpdate(
        { teamCompName: req.body.teamCompName },
        { $set: updateQuery },
        { new: true }
      );
      res.status(200).json(updatedTeamComp);
    } else {
      // If a document with the given teamCompName does not exist, create a new one
      const newTeamComp = await TeamComp.create({
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
