import { endpoint } from "../../types/types";

export default {
    link: ["name", ":name"],
    method: "get",
    middleware: true,
    exec: (request, args) => {
        request.res.send("Oui !")
    }
} as endpoint;