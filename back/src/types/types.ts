import express from "express";

type method = "get" | "head" | "post" | "put" | "delete" | "conntect" | "options" | "trace" | "patch";

export type endpoint = {
    link: string[],
    method: method,
    exec(req: express.Request, res: express.Response, next?:express.NextFunction) : void,
};