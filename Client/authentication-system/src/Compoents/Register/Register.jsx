import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useContext } from "react";
import {AppContent} from "../../Context/AppContext";
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';


const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { backendUrl,setIsLoggedIn,getUserData} = useContext(AppContent);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
      try {
            e.preventDefault();
            const {data} = await axios.post(backendUrl + "/auth/register",{name:user.name,email:user.email,password:user.password});
            if(data.success === true){
              setIsLoggedIn(true)
              getUserData()
              toast("You Registered Successfully!")
              navigate("/")
            }else{
              toast(data.message)
            }
      } catch (error) {
        throw new Error(error);
      }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Create Account 🚀</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p className="register-footer">
          Already have an account? <span onClick={()=> navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
