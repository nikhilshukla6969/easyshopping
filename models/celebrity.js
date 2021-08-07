const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const celebritySchema = new Schema(
  {
    name: String,
    poccupation: String,
    catchPhrase: String,
  },

);

const Celebrity = model("Celebrity", celebritySchema, "celebrities");

module.exports = Celebrity;
