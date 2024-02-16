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
            table.text('uid').unique().primary(); // using generate-unique-id
            table.text('username');
            table.text('pseudo')
            table.text('password');
            table.string('email', 320);
        });
    });

    /**
     * Table jeux
     */
    await database.schema.dropTableIfExists('games');
    database.schema.hasTable('games').then((exists) => {
        if (!exists) return database.schema.createTable('games', (table) => {
            table.uuid('id').unique().primary();

            // global info
            table.text('name');
            table.specificType('variantName', 'text[]');
            table.specificType('#serie', 'text[]');
            table.specificType('#developers', 'text[]')
            table.specificType('#publishers', 'text[]')
            
            // Platform où le jeu est dispo
            table.specificType('#platform', 'text[]');

            // release
            table.json('release');

            // types
            table.specificType('genre', 'text[]'); // rpg, etc
            table.specificType('mode', 'text[]'); // solo, multi, etc

            // images
            table.specificType('images', 'text[]'); // id des images
            table.text('cover'); // image avant de la boite
            table.text('backCover'); // face arrière de la boite
        });
    });

    /**
     * Series (jeux)
     */
    await database.schema.dropTableIfExists('series');
    database.schema.hasTable('series').then(async (exist) => {
        if (!exist) return await database.schema.createTable('series', (table) => {
            table.uuid('id').primary().unique();
            table.text('name');
        });
    });

    /**
     * Developers
     */
    await database.schema.dropTableIfExists('developers');
    database.schema.hasTable('developers').then(async (exist) => {
        if (!exist) return await database.schema.createTable('developers', (table) => {
            table.uuid('id').primary().unique();
            table.text('name');
            table.text('website');
            table.text('logo');
            table.text('founded');
        });
    });
};
