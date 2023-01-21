import React from "react";
import Navbar from "./dashboardComponents/Navbar";
import Sidebar from "./dashboardComponents/Sidebar";
import Main from "./dashboardComponents/Main";
import Footer from "./dashboardComponents/Footer";
import { Route, Routes, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


function Dashboard2() {
  const { currentUser } = useAuth();

  return (
    <div className="wrapper">
      <Navbar />

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Sidebar />
      </aside>

      <div className="content-wrapper">
       

        <Main />
      </div>

      <Footer />

   
    </div>
  );
}

export default Dashboard2;
