import { db_request } from "../../tools/db";
import { endpoint } from "../../types/types";
import bcrypt from "bcrypt";

export default {
    link: ["auth", "register"],
    method: "post",
    exec(request, args) {
        const body = request.req.body as { username: string, password: string };

        // Vérifications 
        if (!body.username || !body.password)
            return request.res.status(400).send({ error: 400, message: "json body not complete" });

        // Username virifications
        const user_exists = db_request("select * from users where username = ?;", [body.username]);
        if (!user_exists) return request.res.status(401).send({ error: 401, message: "Username already exists" });

        // Encrypt password and send in db
        const salt = db_request("SELECT * FROM bcrypt;");
        console.log(salt)
        bcrypt.hash(body.password, process.env.BCRYPT_SALT!, (err, hash) => {
            if (err) {
                console.log(err)
                return request.res.status(501).send({ error: 501, message: "internal error" });
            }

            db_request("insert into users values (username, password) (?,?)", [body.username, hash]);
        })

        request.res.send("Oka !");
    }
} as endpoint;