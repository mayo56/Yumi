import { authBodyChangePassword, authTokenBody, endpoint } from "../../types/types";
import { db } from "../../tools/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
    link: ["auth", "change", "password"],
    method: "patch",
    middleware: true,
    exec(request, args) {
        const body = request.req.body as authBodyChangePassword;

        // Vérifications du body
        if (!body.newPassword || !body.oldPassword) {
            return request.res.status(409).send(
                {
                    error: 1201,
                    message: "JSON Body Not Complete"
                }
            );
        };

        db().then(async (database) => {
            const bodyToken = args[0] as authTokenBody;

            const user = await database.all("SELECT * FROM users WHERE username = ? AND uid = ?;", [bodyToken.username, bodyToken.uid]);

            // Vérification si l'utilisateur existe
            if (user.length === 0) {
                return request.res.status(409).send({
                    error: 901,
                    message: "Invalid User Token"
                });
            };

            // Vérification de l'ancien password
            if (!bcrypt.compareSync(body.oldPassword, user[0].password)) {
                return request.res.status(401).send({
                    error: 1202,
                    message: "Old Password Not Correct"
                });
            };

            // Vérification nouveau password
            if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[^\s]{8,}$/gm).test(body.newPassword)) {
                return request.res.status(409).send({
                    error: 1203,
                    message: "Password Not Secure"
                });
            };

            // Si le nouveau mot de passe est le même que l'ancien => Erreur !
            if (bcrypt.compareSync(body.newPassword, user[0].password)) {
                return request.res.status(409).send({
                    error: 1204,
                    message: "New Password Can't Be The Same As Old Password"
                });
            };

            // Changement du password
            const hash = bcrypt.hashSync(body.newPassword, bcrypt.genSaltSync(10));

            database.all("UPDATE users SET password = ? WHERE uid = ?;", [hash, bodyToken.uid])
                .then(() => {
                    const token = jwt.sign({
                        uid: user[0].uid,
                        username: user[0].username,
                        password: hash,
                    }, process.env.JWT_SECRET!);
                    // On envoi un nouveau Token avec les nouvelles infos
                    return request.res.status(200).send({
                        error: null,
                        token,
                    });
                })
                .catch(err => {
                    console.error(err);
                    request.res.status(500).send({
                        error: 500,
                        message: "Internal Server Error"
                    })
                });
        }).catch(err => {
            console.error(err);
            request.res.status(500).send({
                error: 500,
                message: "Internal Server Error"
            });
        });
    }
} as endpoint;