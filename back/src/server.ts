import express from "express";
import cors from "cors";
import test from "./routes/test";

const server = express();
server.use(cors());

server.get("/test", test)

server.listen(3000, () => {
    console.log("Serveur en ligne ");
})