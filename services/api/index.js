require("dotenv").config();

const server = require("./server/server");
const { exists } = require("./models/Todo");

const PORT = process.env.PORT || 3001;

if (process.env.DATABASE_NAME !== "todoapp-test-back") {
    server.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
}

module.exports = server;
