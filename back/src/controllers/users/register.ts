import { db } from "../../tools/db";
import { endpoint } from "../../types/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gen_uid from "generate-unique-id";

export default {
    link: ["auth", "register"],
    method: "post",
    exec(request, args) {
        const body = request.req.body as { username: string, password: string };

        // Vérifications 
        if (!body.username || !body.password)
            return request.res.status(409).send({ error: 1001, message: "JSON Body Not Complete" });

        // Username virifications
        db().then(async (database) => {
            // Vérification utilisateur
            const username_exist = await database.all("SELECT * FROM users WHERE username = ?;", [body.username]);
            if (username_exist.length > 0)
                return request.res.status(409).send({ error: 1002, message: "Username Already Exists" });

            // Vérification mot de passe
            
            if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[^\s]{8,}$/g).test(body.password)) {
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
            database.run("INSERT INTO users (uid, username, password) VALUES (?,?,?);", [uid, body.username, hash])
                .then(() => {
                    const token = jwt.sign({
                        username: body.username,
                        uid,
                        password: hash,
                    }, process.env.JWT_SECRET!);
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