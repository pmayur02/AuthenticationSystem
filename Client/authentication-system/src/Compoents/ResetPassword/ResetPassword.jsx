import React, { useState, useContext } from "react";
import "./ResetPassword.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { AppContent } from "../../Context/AppContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isEmailSent, setIsEmailSent] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [password, setPassword] = useState("");

  const handleEmailSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(backendUrl + "/auth/send-reset-otp", { email: email });
      if (data.success) {
        toast("A reset OTP has been sent on provided email Id");
        setIsEmailSent(true);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

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

  const handleOTPSubmit = async (e) => {
    try {
      e.preventDefault();
      const enteredOtp = otp.join("");
      if (enteredOtp.length < 6) {
        toast.error("Please enter complete OTP ❌")
        return;
      }
      setIsOtpSent(prev=> !prev);
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    try {
      e.preventDefault();
      const enteredOtp = otp.join("");
      const { data } = await axios.post(backendUrl + "/auth/reset-password", { email:email, otp: enteredOtp, newPassword:password });
      if (data.success) {
        toast("Password reset successfully!");
        navigate("/login")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="reset-container">{
      !isEmailSent && <div className="reset-box">
        <h2>Reset Password</h2>
        <p className="reset-subtitle">
          Enter your email ID to receive an OTP.
        </p>

        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send OTP</button>
        </form>


        {/* {message && <p className="reset-message">{message}</p>} */}

        <p className="reset-footer">
          Remember your password? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    }

      {isEmailSent && !isOtpSent &&
        <div className="otp-box">
          <h2>Verify OTP</h2>
          <p className="otp-subtitle">
            Enter the 6-digit code sent to your email 📩
          </p>

          <form onSubmit={handleOTPSubmit}>
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

            <button onClick={handleOTPSubmit} type="submit">Verify</button>
          </form>

          {/* {message && <p className="otp-message">{message}</p>} */}

        </div>
      }
      {
        isEmailSent && isOtpSent && <div className="reset-box">
          <h2>Reset Password</h2>
          <p className="reset-subtitle">
            Enter your new Password.
          </p>

          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Submit</button>
          </form>



          {/* {message && <p className="reset-message">{message}</p>} */}

          <p className="reset-footer">
            Remember your password? <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      }


    </div>
  );
};

export default ResetPassword;
