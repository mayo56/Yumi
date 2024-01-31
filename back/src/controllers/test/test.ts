import { endpoint } from "../../types/types";

export default  {
    link: ["name", ":name"],
    method: "get",
    exec: (req, res) => {
        console.log(req.params)
        res.send(`Bonjour ${req.params.name} !`)
    }
} as endpoint;