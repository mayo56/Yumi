import { db } from "../../tools/db";
import { endpoint } from "../../types/types";

export default {
    link: ["name", ":name"],
    method: "get",
    middleware: true,
    exec: (request, args) => {
        db().then(database => {
            request.res.send(`${database.all("select * from bcrypt;")}`);
        })
    }
} as endpoint;