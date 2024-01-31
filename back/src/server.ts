import express from "express";
import cors from "cors";
import { readdirSync } from "node:fs";
import { endpoint } from "./types/types";

const server = express();
server.use(cors());
server.use(express.json());

// temporairement any
const endpoints: endpoint[] = [];

// Handler
const categories = readdirSync(`${__dirname}/controllers`, {withFileTypes: true})
    .filter(dir => dir.isDirectory())

for (const cat of categories) {
    const endpoints_cache = readdirSync(`${__dirname}/controllers/${cat.name}`, {withFileTypes:true})
        .filter(file => file.isFile() && (file.name.endsWith(".js") || file.name.endsWith(".ts")));

    for (const file of endpoints_cache) {
        const endpoint = require(`${__dirname}/controllers/${cat.name}/${file.name}`).default;
        endpoints.push(endpoint);
    };
};
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=

for (const end of endpoints) {
    switch (end.method) {
        case "get":
            server.get(`/${end.link.join("/")}`, (req, res, next) => end.exec(req, res, next));
            break;
        case "delete":
            server.delete(`/${end.link.join("/")}`, (req, res, next) => end.exec(req, res, next));
            break;
        case "conntect":
            server.connect(`/${end.link.join("/")}`, (req, res, next) => end.exec(req, res, next));
            break;
        case "head":
            server.head(`/${end.link.join("/")}`, (req, res, next) => end.exec(req, res, next));
            break;
        case "options":
            server.options(`/${end.link.join("/")}`, (req, res, next) => end.exec(req, res, next));
            break;
        case "patch":
            server.proppatch(`/${end.link.join("/")}`, (req, res, next) => end.exec(req, res, next))
            break;
        case "post":
            server.post(`/${end.link.join("/")}`, (req, res, next) => end.exec(req, res, next))
            break;
        case "put":
            server.put(`/${end.link.join("/")}`, (req, res, next) => end.exec(req, res, next))
            break;  
        case "trace":
            server.trace(`/${end.link.join("/")}`, (req, res, next) => end.exec(req, res, next))
            break;  
    };
};


server.listen(3000, () => {
    console.log("Serveur en ligne ");
})