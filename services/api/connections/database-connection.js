const mongoose = require("mongoose");

mongoose.connect(`mongodb://${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on("error", (error) => console.log("Cannot connect to the MongoDB"));
conn.once("open", () =>
    console.log(`Connected to ${process.env.DATABASE_NAME}`)
);

module.exports = { conn };
