import 'dotenv/config'

/** @type {import("knex").Knex.Config}  */

export default {
    client: 'sqlite3',
    connection: {
        filename: process.env.DB || './db.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
        directory: './migrations',
        tableName: 'knex_migrations',
    },
}
