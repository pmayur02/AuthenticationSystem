import { useState, useRef, useEffect, useContext } from 'react'
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';
import { AppContent } from "../../Context/AppContext";
import axios from "axios";
import { toast } from 'react-toastify';

function Navbar() {

    const [expand, setExpand] = useState(false);
    const navigate = useNavigate();
    const { userData, isLoggedin, backendUrl, setIsLoggedIn, setUserData } = useContext(AppContent)

    const listRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (listRef.current && !listRef.current.contains(event.target)) {
                setExpand(!expand);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleVerifyEmail = async () => {
    try {
        const { data } = await axios.post(backendUrl + "/auth/send-verify-otp");
        if (data.success) {
            toast("OTP send to registered email Id");
            navigate("/verify-otp")
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}



    const handleLoggedOut = async () => {
        try {
            
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "/auth/logout");
            if (data.success) {
                setIsLoggedIn(false);
                setUserData(false);
                toast("You logged out successfully");
                navigate("/login")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <nav className="navbar">
                <h2 className="logo">AuthApp</h2>
                <div className="logout-btn" onClick={() => setExpand(prev => !prev)}>{userData ? userData.userData.name[0].toUpperCase() : "Login"}
                    {
                        expand && <ul ref={listRef} className='expand-list'>
                            {isLoggedin && !userData?.userData?.isAccountVerified && <li><a onClick={() => handleVerifyEmail()} >verify Email</a> </li>}
                            {
                                isLoggedin ? <li className='login-item'><a onClick={() => handleLoggedOut()}>Logout</a></li>
                                :  <li className='login-item'><a onClick={() => navigate("/login")} >Login</a></li>
                            } 
                            
                        </ul>
                    }
                </div>

            </nav>

        </>
    )
}



export default Navbar;
