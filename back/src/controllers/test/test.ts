import { db_request } from "../../tools/db";
import { endpoint } from "../../types/types";

export default {
    link: ["name", ":name"],
    method: "get",
    middleware: true,
    exec: (request, args) => {
        console.log(db_request("select * from users;"))
        request.res.send(`Bonjour ${request.req.params.name} !`);
    }
} as endpoint;