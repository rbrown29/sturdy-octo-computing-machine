const mongoose = require("mongoose");

const hikeSchema = new mongoose.Schema({
	title: {type: String, require: true, unique: true},
	description: String,
	img: String

}, {timestamps: true});

const Hike = mongoose.model("Hike", hikeSchema);

module.exports = Hike;