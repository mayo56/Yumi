import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";
const sqlite = sqlite3.verbose()

const database = new sqlite.Database(`${__dirname}/../database/database.db`, (err) =>
    err ? console.log(err) : console.log("[(i)] DATABSE LOADED"));

export const db_initialize = () => {
    // Génération du salt pour bcrypt
    database.run("CREATE TABLE IF NOT EXISTS bcrypt (name TEXT);",
    (err) => err ? console.log(err) : null);
    bcrypt.genSalt(45, (err, salt) => err ? console.log(err) : db_request("INSERT INTO bcrypt VALUES (?)", [salt]));

    database.run("CREATE TABLE IF NOT EXISTS users (id UNIQUEIDENTIFER PRIMARY KEY DEFAULT (NEWID()), username TEXT);",
    (err) => err ? console.log(err) : null);
    // database.run("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY NOT NULL, username TEXT);",
    // (err) => err ? console.log(err) : null);
};

export const db_request = (sql:string, args?:string[] | Object) => {
    let response: any
    database.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log("rows",rows)
            response = rows as any
        }
    });
    console.log(response)
    return response;
};