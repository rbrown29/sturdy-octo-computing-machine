const mongoose = require("mongoose");

/// hike schema
const hikeSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, unique: true },
    description: String,
    img: String,
    map: String,
    difficulty: String,
  },
  { timestamps: true }
);

const Hike = mongoose.model("Hike", hikeSchema);

module.exports = Hike;
