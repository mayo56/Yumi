import { authBodyRegister, endpoint } from "../../types/types";
import gen_uid from "generate-unique-id";
import { db } from "../../tools/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
    link: ["auth", "register"],
    method: "post",
    exec(request, args) {
        const body = request.req.body as authBodyRegister;

        // Vérifications 
        if (!body.username || !body.password || !body.email || !body.pseudo)
            return request.res.status(409).send({ error: 1101, message: "JSON Body Not Complete" });

        // Username virifications
        db().then(async (database) => {
            // Vérification utilisateur
            const username_exist = await database.all("SELECT * FROM users WHERE username = ?;", [body.username]);
            if (username_exist.length > 0)
                return request.res.status(409).send(
                    {
                        error: 1002,
                        message: "Username Already Exists"
                    }
                );

            // Vérification mot de passe
            if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[^\s]{8,}$/gm).test(body.password)) {
                return request.res.status(409).send({
                    error: 1003,
                    message: "Password Not Secure"
                });
            };

            // Generation de l'uid
            const uid = gen_uid({
                useLetters: false,
                useNumbers: true
            });


            // Encrypt password and send in db
            const hash = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
            database.all("INSERT INTO users (uid, username, password) VALUES (?,?,?);", [uid, body.username, hash])
                .then(() => {
                    const token = jwt.sign({
                        username: body.username,
                        uid,
                        password: hash,
                    }, process.env.JWT_SECRET!);
                    
                    // Envoi du Token si tout est bon
                    request.res.status(201).send({
                        error: null,
                        token
                    });
                })
                .catch((err) => {
                    console.error(err);
                    request.res.status(500).send({
                        error: 500,
                        message: "Internal Server Error"
                    });
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