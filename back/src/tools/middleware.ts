import { middleware } from "../types/types";


export default {
    exec (request, args) {
        args.push("lol"),
        request.next();
    }
} as middleware;