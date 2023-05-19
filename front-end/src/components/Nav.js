import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    };

    let username = "";
    try {
        const parsedAuth = JSON.parse(auth);
        username = parsedAuth.name;
    } catch (error) {
        // Handle JSON parsing error, e.g., auth is not valid JSON
        console.error("Error parsing auth:", error);
    }

    return (
        <div>
            <img src="https://yt3.googleusercontent.com/ytc/AGIKgqOpew-op5VY99ZRjdyeRUHl3HeeBJFV5hJ7gUo4TA=s900-c-k-c0x00ffffff-no-rj" alt="logo" className="logo" />
            {auth ? (
                <ul className="nav-ul">
                    <li><Link to="/">PRODUCTS</Link></li>
                    <li><Link to="/add">ADD PRODUCT</Link></li>
                    <li><Link to="/update">UPDATE PRODUCT</Link></li>
                    <li><Link to="/profile">PROFILE</Link></li>
                    <li><Link onClick={logout} to="/signup">LOGOUT({username})</Link></li>
                </ul>
            ) : (
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">SIGN UP</Link></li>
                    <li><Link to="/login">LOGIN</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Nav;
