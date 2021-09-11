
//create Movie Model

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const automobileSchema = new Schema({
  name: String,
  model: String,
  price: Number,
  first_image: String,
  second_image: String,
  third_image: String,
});

module.exports = model("automobile", automobileSchema);