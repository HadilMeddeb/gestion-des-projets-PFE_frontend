import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../component/Navbar";
import Dashboard from "../component/dashboard/dashboard";


function Admin() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="form-signin text-center ">
          <Routes>
            <Route exact path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Admin;
