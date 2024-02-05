import { useNavigate } from "react-router-dom";
// import React from "react";

const  Home = () => {

    const nav = useNavigate()

    return (
        <div>
            <h1>HOME</h1>

            <br />
            <p onClick={() => nav("/login")}>Login</p>
        </div>
    );
};

export default Home;