import { useNavigate } from "react-router-dom";
import React from "react";


const Login=()=>{
    const [email,setEmail]=React.useState("");
    const [password,setPassword]=React.useState("");
    const navigate=useNavigate();

    const handlelogin=async()=>{
        console.warn("email,password",email,password);
        let result =await fetch("http://localhost:5000/login",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json",
            }
        });
        result =await result.json();
        console.warn(result);
        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/");
        }
        else{
            alert("Please Check Your Email And Password");
        }
    }
    return(
        <div className="login">
        <h1>LOGIN</h1>
            <input type="text" className="inputBox" placeholder="Enter Email" 
            onChange={(e)=>setEmail(e.target.value)}  value={email}/>

            <input type="password" className="inputBox" placeholder="Enter Password"
            onChange={(e)=>setPassword(e.target.value)} value={password}/>

            <button onClick={handlelogin} className="btn" type="button">Login</button>
        
        </div>
    )
}

export default Login;