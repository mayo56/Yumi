import express from "express";

export default  {
    name: "",
    link: ["test"],
    method: "get",
    exec: (req: express.Request, res: express.Response) => {
        res.send("Bonjour !")
    }
}