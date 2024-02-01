import { middleware } from "../types/types";


export default {
    exec (request, args) {
        args = "lol",
        request.next();
    }
} as middleware;