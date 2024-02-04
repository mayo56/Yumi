import { authTokenBody, middleware } from "../types/types";
import jwt from "jsonwebtoken";
import { db } from "./db";

export default {
    exec (request, args) {
        const token = request.req.headers.authorization; // Token

        // Aucun Token détecté
        if (!token) {
            return request.res.status(401).send({
                error: 901,
                message: "No Token Detected"
            });
        } else {
            try {
                // Vérification du token
                const userInfo = jwt.verify(token, process.env.JWT_SECRET!) as authTokenBody;
                
                db().then(async (database) => {
                    database.all("SELECT * FROM users WHERE uid = ?;", [userInfo.uid])
                        .then((result) => {
                            // Vérification existance
                            if (result.length === 0) {
                                return request.res.status(401).send({
                                    error: 902,
                                    message: "Invalid User Token"
                                });
                            };

                            // Vérifications des données login
                            if (result[0].password !== userInfo.password || result[0].username !== userInfo.username) {
                                return request.res.status(401).send({
                                    error: 902,
                                    message: "Invalid User Token"
                                });
                            };
                        });
                });

                // Si tout est bon => Envoie des informations pour la suite
                args.push(userInfo);
            } catch (err) {
                console.error(err);
                return request.res.status(401).send({
                    error: 902,
                    message: "Invalid User Token"
                });
            };
        };
        request.next();
    }
} as middleware;