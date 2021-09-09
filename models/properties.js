const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const propertiesSchema = new Schema({

  name: String,
  model: String,
  price: Number,
});

module.exports = model("properties", propertiesSchema);