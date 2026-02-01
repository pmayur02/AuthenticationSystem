import React, { useState } from "react";
import "./VerifyOtp.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { AppContent } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import handleVerifyEmail from "../Navbar/Navbar";
import { useEffect } from "react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  // const [message, setMessage] = useState("");
  const { backendUrl, isLoggedin, userData } = useContext(AppContent)
  const navigate = useNavigate();


  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const enteredOtp = otp.join("");

      if (enteredOtp.length < 6) {
        toast.error("Please enter complete OTP ❌")
        return;
      }

      const { data } = await axios.post(backendUrl + "/auth/verify-otp", { otp: enteredOtp });
      if (data.success) {
        toast("email verified successfully!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      throw new Error(error);
    }

  };

  useEffect(()=>{
    isLoggedin && userData && userData.userData.isAccountVerified && navigate("/")
  },[isLoggedin, userData])

  return (
    <div className="otp-container">
      <div className="otp-box">
        <h2>Verify OTP</h2>
        <p className="otp-subtitle">
          Enter the 6-digit code sent to your email 📩
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            ))}
          </div>

          <button type="submit">Verify</button>
        </form>

        {/* {message && <p className="otp-message">{message}</p>} */}

      </div>
    </div>
  );
};

export default VerifyOtp;
