// #####################
// Importations
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { readdirSync } from "node:fs";
import { endpoint } from "./types/types";
import middleware from "./tools/middleware";
import { db_initialize } from "./tools/db";
// ##########################

// SERVER CONFIG
const server = express();
server.use(cors({ "origin": "*" }));
server.use(express.json());
dotenv.config({ path: `${__dirname}/config/.env` });

// Initialize database
db_initialize();
// ==========================

// ==============================
// HANDLER
/**
 * Variable contenant tous les endpoints de l'API
 */
const endpoints: endpoint[] = [];

// Get all files
const categories = readdirSync(`${__dirname}/controllers`, { withFileTypes: true })
    .filter(dir => dir.isDirectory())

for (const cat of categories) {
    const endpoints_cache = readdirSync(`${__dirname}/controllers/${cat.name}`, { withFileTypes: true })
        .filter(file => file.isFile() && (file.name.endsWith(".js") || file.name.endsWith(".ts")));

    for (const file of endpoints_cache) {
        const endpoint = require(`${__dirname}/controllers/${cat.name}/${file.name}`).default;
        endpoints.push(endpoint);
    };
};
// ==============================

// ===========================
// ENDPOINT EXECUTION
for (const end of endpoints) {
    const args: any[] = []
    switch (end.method) {
        case "get":
            server.get(
                `/${end.link.join("/")}`,
                (req, res, next) => end.middleware ? middleware.exec({req, res, next}, args) : next(),
                (req, res, next) => end.exec({req, res, next}, args)
            );
            break;
        case "delete":
            server.delete(
                `/${end.link.join("/")}`,
                (req, res, next) => end.middleware ? middleware.exec({req, res, next}, args) : next(),
                (req, res, next) => end.exec({req, res, next}, args)
            );
            break;
        case "conntect":
            server.connect(
                `/${end.link.join("/")}`,
                (req, res, next) => end.middleware ? middleware.exec({req, res, next}, args) : next(),
                (req, res, next) => end.exec({req, res, next}, args)
            );
            break;
        case "head":
            server.head(
                `/${end.link.join("/")}`,
                (req, res, next) => end.middleware ? middleware.exec({req, res, next}, args) : next(),
                (req, res, next) => end.exec({req, res, next}, args)
            );
            break;
        case "options":
            server.options(
                `/${end.link.join("/")}`,
                (req, res, next) => end.middleware ? middleware.exec({req, res, next}, args) : next(),
                (req, res, next) => end.exec({req, res, next}, args)
            );
            break;
        case "patch":
            server.proppatch(
                `/${end.link.join("/")}`,
                (req, res, next) => end.middleware ? middleware.exec({req, res, next}, args) : next(),
                (req, res, next) => end.exec({req, res, next}, args)
            );
            break;
        case "post":
            server.post(
                `/${end.link.join("/")}`,
                (req, res, next) => end.middleware ? middleware.exec({req, res, next}, args) : next(),
                (req, res, next) => end.exec({req, res, next}, args)
            );
            break;
        case "put":
            server.put(
                `/${end.link.join("/")}`,
                (req, res, next) => end.middleware ? middleware.exec({req, res, next}, args) : next(),
                (req, res, next) => end.exec({req, res, next}, args)
            );
            break;
        case "trace":
            server.trace(
                `/${end.link.join("/")}`,
                (req, res, next) => end.middleware ? middleware.exec({req, res, next}, args) : next(),
                (req, res, next) => end.exec({req, res, next}, args)
            );
            break;
    };
};
// ==============================


server.listen(3000, () => {
    console.log("[(i)] SERVER ONLINE !");
})