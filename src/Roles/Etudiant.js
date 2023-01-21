import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../component/Navbar";
import Dashboard from '../component/dashboard/dashboard';
import Chatbot from '../component/ChatRoom/Chat/ChatRoom';
import Profile from '../component/Profile/Profile';

function Etudiant() {
    return (
        <BrowserRouter>
        <div className="App">
          <div className="form-signin text-center ">
            <Routes>
              <Route exact path="/dashboard/*" element={<Dashboard />} />
              <Route exact path="/chatbot" element={<Chatbot />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    )
}

export default Etudiant
