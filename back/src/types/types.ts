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
    ): Promise<express.Response>,
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

/**
 * Type body authentification (login)
 */
export type authBody = {
    username: string,
    password: string,
};

/**
 * Type body authentification (register)
 */
export type authBodyRegister = {
    pseudo: string,
    username: string,
    email:string,
    password: string,
};


/**
 * Type body change password
 */
export type authBodyChangePassword = {
    oldPassword: string,
    newPassword: string
};

/**
 * Type body contenu dans un token utilisateur
 */
export type authTokenBody = {
    username: string,
    uid: string,
    password: string
};


/**
 * Types USERS database
 */
export type Users = {
    uid: string,
    username: string,
    pseudo: string,
    password: string, 
    email: string
};