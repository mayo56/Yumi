import { endpoint } from "../../types/types";

export default  {
    link: ["name", ":name"],
    method: "get",
    exec: (request, args) => {
        console.log(request.req.params);
        request.res.send(`Bonjour ${request.req.params.name} !`);
    }
} as endpoint;