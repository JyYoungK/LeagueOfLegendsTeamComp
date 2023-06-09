const mongoose = require("mongoose");

const teamCompSchema = mongoose.Schema(
  {
    region: {
      type: String,
      required: [true, "Please enter region"],
    },
    teamCompName: {
      type: String,
      required: [true, "Please enter teamCompName"],
    },
    result: {
      type: Boolean,
      required: [true, "Please enter result"],
    },
    gameDuration: {
      type: Number,
      required: [true, "Please enter game duration"],
    },
    kills: {
      type: Number,
      required: [true, "Please enter kills"],
    },
    deaths: {
      type: Number,
      required: [true, "Please enter death"],
    },
    played: {
      type: Number,
      default: 0, // Initialize win to 0 by default
    },
    winRate: {
      type: Number,
      default: 0, // Initialize win to 0 by default
    },
    win: {
      type: Number,
      default: 0, // Initialize win to 0 by default
    },
    lost: {
      type: Number,
      default: 0, // Initialize lost to 0 by default
    },
  },
  {
    timestamps: true,
  }
);

module.exports = teamCompSchema;
