import sqlite from "sqlite3";
const database = new sqlite.Database(`:memory:`, (err) =>
    err ? console.log(err) : console.log("[(i)] DATABSE LOADED"));

export const db_initialize = () => {
    database.run("create table if not exists users (id int primary key not null, username text);", (err) =>
    err ? console.log(err) : null);
}

export const db_request = (sql:string, args?:string[] | Object): sqlite.Database => {
    return database.run(sql, args, (err) => err ? console.log(err) : null);
};