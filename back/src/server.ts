import express from "express";
import cors from "cors";
import {readdirSync} from "node:fs";

const server = express();
server.use(cors());

// temporairement any
const endpoints: any[] = [];
const categories = readdirSync(`${__dirname}/controllers`);

for (const folder of categories) {
    const endpointsList = readdirSync(`${__dirname}/controllers/${folder}/`)
        .filter(file => file.endsWith(".ts") || file.endsWith(".js"));
    
    for (const file of endpointsList) {
        const command = require(`${__dirname}/controllers/${folder}/${file}`).default;
        endpoints.push(command);
    };
};


server.get("*", (req, res) => {
    // [ "link", "without", "slash" ]
    const url = req.url.split(/\//g);
    url.shift();

    console.log(url)
    
    endpoints.forEach((element) => {
        console.log(element.link == url, url, element.link)
        if (true) element.exec(req, res);
    });
});

server.listen(3000, () => {
    console.log("Serveur en ligne ");
})