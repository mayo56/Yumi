import React from "react";
import axios from "axios";
import urls from "../../tools/urls"
import "./login.css";
import { NavLink } from "react-router-dom";
import Debugger from "../../components/Debugger";

const Login = () => {

    const [id, setId] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

    const send = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("connexion en cours...")
        
        await axios({
            url: urls().auth.login.dev,
            method: "post",
            data: {
                username: id,
                password
            }
        }).then(res => {
            if (res.data.error) {
                setError(res.data.error);
            } else {
                // Mettre le token dans la data
            }
        }).catch((err) => {
            setError(JSON.stringify(err))
        })
    }

    const [debug, setDebug] = React.useState<Array<[string, string]>>([["id", id], ["pwd", password], ["error", error]]);

    React.useEffect(() => {
        setDebug([["id", id], ["pwd", password], ["error", error]])
        console.log(debug)
    }, [id, error, password])

    return (
        <div>
            <NavLink to={"/register"}>yo</NavLink>
            <h1>Login</h1>

            {/* Container pour les inputs login */}
            <div>
                <form onSubmit={(e) => send(e)}>
                    <input type="text" content={id} onChange={(e) => setId(e.target.value)} />
                    <br />
                    <input type="password" content={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="Connexion" />
                </form>
            </div>

            <Debugger debug={debug} />
        </div>
    );
};

export default Login;