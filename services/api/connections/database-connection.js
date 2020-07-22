const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/${process.env.DEV_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on("error", (error) => console.log("Cannot connect to the MongoDB"));
conn.once("open", () =>
    console.log(`Connected to ${process.env.DEV_DATABASE}`)
);

module.exports = { conn };
