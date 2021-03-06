const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const propertiesSchema = new Schema({

  name: String,
  area: String,
  price: Number,
  description: String,
  first_image: String,
  second_image: String,
  third_image: String,
});

module.exports = model("properties", propertiesSchema);