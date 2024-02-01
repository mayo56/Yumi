import { endpoint } from "../../types/types";

export default {
    link: ["auth", "register"],
    method: "post",
    exec(request, args) {
        const body = request.req.body as { username: string, password: string };

        if (!body.username || !body.password)
            return request.res.status(400).send({error: 400, message: "json body not complete"});
        
    }
} as endpoint;