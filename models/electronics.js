const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const electronicsSchema = new Schema({

  name: String,
  model: String,
  price: String,
  description: String, 
  first_image: {
    type: String,
    default: undefined
  },
  second_image: {
    type: String,
    default: undefined
  },
  third_image: {
    type: String,
    default: undefined
  }
});

module.exports = model("Electronics", electronicsSchema);

