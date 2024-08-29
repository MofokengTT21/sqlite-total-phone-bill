const knex = require("knex");

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename:"phone-bill.sqlite3"
    }
});

module.exports = connectedKnex;