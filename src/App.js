



import React from "react";
import { useAuth } from "./contexts/AuthContext";
import AuthenticatedRoute  from "./Routing/AuthenticatedRoute";
import UnauthenticatedRoute from './Routing/UnauthenticatedRoute';


function App() {
  const { loggedIn } = useAuth();
  console.log("loogedin", loggedIn);
  return loggedIn ?  <AuthenticatedRoute /> :<UnauthenticatedRoute/>}

export default App;

