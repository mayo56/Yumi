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

            {/* <div>
                <p>debug</p>
                <p>id: {id}</p>
                <p>pwd: {password}</p>
                <p>err: {error}</p>
            </div> */}

            <Debugger json={`{"id":"${id}","pwd":"${password}", "err":"${error}"}`}/>
        </div>
    );
};

export default Login;