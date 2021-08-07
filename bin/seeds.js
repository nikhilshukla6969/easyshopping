const mongoose = require("mongoose");
const celebrity = require("../models/celebrity.js");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-mongoose-movies";

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
const celebritiesArr = [
    { name: "Vin Diesel", occupation: "Actor", catchPhrase: "I am one of those boys who appreciates a fine body regardless of the make" },
    { name: "Shah Rukh Khan", occupation: "Actor", catchPhrase: "Who the hell drink to tolerate.. I drink so that I can sit here, so that I can see you, so that I can tolerate you" },
    { name: "Salman Khan", occupation: "Actor", catchPhrase: "People says that when beautiful girls lie... then look more beautiful" }
];

celebrity.create(celebritiesArr).then((celebrity) => {
    console.log("created celebrity");

    mongoose.connection.close();
});