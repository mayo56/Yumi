import { authBodyRegister, endpoint, Users } from "../../types/types";
import gen_uid from "generate-unique-id";
import { database } from "../../tools/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
    link: ["auth", "register"],
    method: "post",
    exec: async (request, args) => {
        const body = request.req.body as authBodyRegister;

        // Vérifications 
        if (!body.username || !body.password || !body.email || !body.pseudo)
            return request.res.status(409).send({ error: 1101, message: "JSON Body Not Complete" });


        // Vérification de l'adresse email
        const mailVeification = (/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm);
        if (!mailVeification.test(body.email)) {
            return request.res.status(409).send({
                error: 1004,
                message: "Invalid Email"
            });
        };

        // Vérification du pseudo
        if (!(/^[a-zA-Z0-9\.\-]+$/gm).test(body.pseudo)) {
            return request.res.status(409).send({
                error: 1005,
                message: "Invalid Pseudonym"
            });
        };

        // Username virifications

        // Vérification utilisateur
        const username_exist = await database<Users>('users').where('username', body.username);
        if (username_exist.length > 0) {
            return request.res.status(409).send(
                {
                    error: 1002,
                    message: "Username Already Exists"
                }
            );
        };

        const email_exists = await database<Users>('users').where('email', body.email);
        if (email_exists.length > 0) {
            return request.res.status(409).send(
                {
                    error: 1005,
                    message: "Email Already Exists"
                }
            );
        };

        const pseudo_exists = await database<Users>('users').where('pseudo', body.pseudo);
        if (pseudo_exists.length > 0) {
            return request.res.status(409).send(
                {
                    error: 1006,
                    message: "Pseudonym Already Exists"
                }
            );
        };


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
        const timestamp = Date.now().toString();
        database<Users>('users').insert({
            uid,
            username: body.username,
            pseudo: body.pseudo,
            password: hash,
            email: body.email
        }).into('users').then(() => {
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
        }).catch((err) => {
            console.error(err);
            request.res.status(500).send({
                error: 500,
                message: "Internal Server Error"
            });
        });
    }
} as endpoint;