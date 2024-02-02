import { db_request } from "../../tools/db";
import { endpoint } from "../../types/types";

export default {
    link: ["name", ":name"],
    method: "get",
    middleware: true,
    exec: (request, args) => {
        request.res.send(`${db_request("select * from bcrypt;")}`);
    }
} as endpoint;