import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

  
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if(auth)
        {
            navigate("/");
        }
    })

    const collectData = async () => {
        console.warn(name, password, email);
        let result = await fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify({ name, password, email }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
    }
    return (
        <div className='register'>
            <h1>REGISTER</h1>
            <input className="inputBox" type="text"
                value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" /><br /><br />

            <input className="inputBox" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" /><br /><br />

            <input className="inputBox" type="text"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" /><br /><br />

            <button onClick={collectData} className="btn">Sign Up</button>
        </div>
    )
}

export default SignUp;
