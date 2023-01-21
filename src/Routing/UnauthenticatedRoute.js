import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../component/authScreens/login";
import Navbar from "../component/Navbar";
import Home from "../component/Home/Home";



function UnauthenticatedRoute() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="form-signin text-center ">
          <Routes>
          {/* <Route exact path="/" element={<Home/>} /> */}
          <Route exact path="/" element={<Login />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}



export default UnauthenticatedRoute;


