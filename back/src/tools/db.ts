import knex from "knex";

export const database = knex({
    client: "sqlite3",
    connection: {
        filename: `${__dirname}/../database/database.db`,
    },
    useNullAsDefault: true
});

export const db_initialize = async () => {
    /**
     * Base de donnée utilisateurs
     */
    // await database.schema.dropTableIfExists("users")
    database.schema.hasTable('users').then((exists) => {
        if (!exists) return database.schema.createTableIfNotExists('users', (table) => {
            table.text('uid').unique().primary();
            table.text('username');
            table.text('pseudo')
            table.text('password');
            table.string('email', 320);
        });
    });

    /**
     * Table jeux
     */
    // await database.schema.dropTableIfExists('games');
    // database.schema.hasTable('users').then((exists) => {
    //     if (!exists) return database.schema.createTable('games', (table) => {
    //         table.enum('lol', []);
    //     });
    // });
};
