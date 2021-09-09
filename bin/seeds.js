const mongoose = require("mongoose");
const Electronics = require("../models/electronics");

const DB_NAME = "lab-mongoose-movies";

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const electronics = [
  { name: "Mobile", Model: "iphone 8", Price: "200" },
  {
    name: "apple",
    Model: "iphone 8",
    Price: "200",
  },
  { name: "apple", Model: "iphone 12", Price: "600" },
];

electronics.create(electronics).then((electro) => {
  console.log(`Created ${electro.length} electro`);

  // Once created, close the DB connection
  mongoose.connection.close();
});