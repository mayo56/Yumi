import express from "express";

/**
 * Types for method in endpoint handler
 */
type method = "get" | "head" | "post" | "put" | "delete" | "conntect" | "options" | "trace" | "patch";

/**
 * Type endpoint handler
 */
export type endpoint = {
    link: string[],
    method: method,
    middleware: boolean,
    exec(
        request: {
            req: express.Request,
            res: express.Response,
            next?: express.NextFunction
        },
        args: any[]
    ): express.Response,
};

/**
 * Type middlewar for endponts
 */
export type middleware = {
    exec(
        request: {
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        },
        args: any[]
    ): void
};

