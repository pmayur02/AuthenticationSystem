import React, { useContext } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import { AppContent } from "../../Context/AppContext";

const Home = () => {

   const {userData} = useContext(AppContent) 
//   const userName = "Dev"; // later this can come from auth context / API

  return (
    <div className="home-container">
      <Navbar/>  
      {/* <nav className="navbar">
        <h2 className="logo">AuthApp</h2>
        <button className="logout-btn">Logout</button>
      </nav> */}

      <section className="home-content">
        <h1>Welcome, {userData?.userData?.name ? userData.userData.name : "Developer" } 👋</h1>
        <p>
          This is our home page........  :)
        </p>

        {/* <div className="cards">
          <div className="card">
            <h3>Profile</h3>
            <p>View and manage your profile details</p>
          </div>

          <div className="card">
            <h3>Security</h3>
            <p>Change password & enable 2FA</p>
          </div>

          <div className="card">
            <h3>Settings</h3>
            <p>Customize your preferences</p>
          </div>
        </div> */}
      </section>

      
    </div>
  );
};

export default Home;
