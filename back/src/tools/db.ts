import { open } from "sqlite";
import sqlite from "sqlite3";

export async function db() {
    return await open({
        filename: `${__dirname}/../database/database.db`,
        driver: sqlite.Database
    });
};

export const db_initialize = () => {
    db().then(async (database) => {
        // await database.run("DROP TABLE users;")
        await database.run("CREATE TABLE IF NOT EXISTS users (uid UNIQUEIDENTIFER PRIMARY KEY, username TEXT, password TEXT);");
    }).catch(err => console.log(err));
};
