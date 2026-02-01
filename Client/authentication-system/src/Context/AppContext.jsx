import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props)=>{
    
    
    axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    const getUserData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + "/user/get-user-data");
            if(data.success === true){
                setUserData(data)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(data.message);
        }
    }

    const authenticatedUser = async()=>{
        try {
            const {data} = await axios.post(backendUrl + "/auth/islogged-in");
            if(data.success){
                setIsLoggedIn(true)
                getUserData();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        authenticatedUser()
    },[])

    const value = {
        backendUrl,
        isLoggedin,setIsLoggedIn,
        userData,setUserData,
        getUserData
    }

    return(
        <AppContent.Provider value = {value}>
        {props.children}
        </AppContent.Provider>
    )
}