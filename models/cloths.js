
//create Movie Model

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ClothsSchema = new Schema({
  type: String,
  color: String,
  price: Number,
});

module.exports = model("Cloths", ClothsSchema);