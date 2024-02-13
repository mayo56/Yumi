import { Users, authBody, endpoint } from "../../types/types";
import { database } from "../../tools/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
    link: ["auth", "login"],
    method: "post",
    exec: async (request, args) => {
        const body = request.req.body as authBody;

        // Verifications body
        if (!body.username || !body.password) {
            return request.res.status(409).send(
                {
                    error: 1101,
                    message: "JSON Body Not Complete"
                }
            );
        };


        const user = await database<Users>("users").where('username', body.username);

        if (user.length === 0) {
            // Utilisateur inconnue
            return request.res.status(401).send(
                {
                    error: 1102,
                    message: "Incorrect Inputs"
                }
            );
        } else {
            // Vérification du mot de passe
            if (bcrypt.compareSync(body.password, user[0].password)) {
                const token = jwt.sign({
                    username: body.username,
                    uid: user[0].uid,
                    password: user[0].password
                }, process.env.JWT_SECRET!);

                // Envoi du Token si tout est bon
                request.res.status(200).send(
                    {
                        error: null,
                        token
                    }
                );
            } else {
                // Mot de passe incorrect
                return request.res.status(401).send(
                    {
                        error: 1102,
                        message: "Incorrect Inputs"
                    }
                );
            };
        };
    }
} as endpoint;