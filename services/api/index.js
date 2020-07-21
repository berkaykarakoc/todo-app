require("dotenv").config();

const server = require("./server/server");

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "test") {
    server.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
}

module.exports = server;
