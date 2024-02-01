import sqlite from "sqlite3";
const database = new sqlite.Database(`:memory:`, (err) =>
    err ? console.log(err) : console.log("[(i)] DATABSE LOADED"));

export const db_initialize = () => {
    database.run("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY NOT NULL, username TEXT);",
    (err) => err ? console.log(err) : null);
    // database.run("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY NOT NULL, username TEXT);",
    // (err) => err ? console.log(err) : null);
};

export const db_request = (sql:string, args?:string[] | Object): sqlite.Database => {
    return database.run(sql, args, (err) => err ? console.log(err) : null);
};