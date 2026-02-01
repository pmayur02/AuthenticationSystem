import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import {AppContent} from "../../Context/AppContext";
import { useContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {

    const { backendUrl,setIsLoggedIn,getUserData} = useContext(AppContent)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials =true;
            const {data} = await axios.post(backendUrl + "/auth/login",{email:formData.email, password:formData.password});
            if(data.success === true){
                setIsLoggedIn(true);
                getUserData()
                navigate("/");
            }else{
                toast(data.message);
            }
        } catch (error) {
            toast(error);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Welcome Back 👋</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>

                <div className="forgot-password">
                    <span onClick={() => navigate("/reset-password")}>Forgot password?</span>
                </div>

                <p className="login-footer">
                    Don’t have an account? <span onClick={() => navigate("/register")} >Register</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
