import React, { createContext, useEffect, useState } from "react";
import decode from "jwt-decode";
import axios from "axios";
const AuthContext = createContext({});
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
const config = {
  header: { "Content-Type": "application/json" },
};
  const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  
  // default action

  useEffect(() => {
    //*****1******//
    if (sessionStorage.getItem("authToken")) {
      // const token = localStorage.getItem("authToken");
      const token =sessionStorage.getItem("authToken");
      const currentUser_id = decode(token)._id;
      console.log("current user id from context useEffect", currentUser_id);
      axios
        .get(`/api/user/${currentUser_id}`, config)
        .then((res) => {
          console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",res.data.data)
          setCurrentUser(res.data.data);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log("error getting current user from front context :", err);
        });
      //*****2******//
    } else {
      console.log("no auth Token !!!");
    }
  }, []);
  // login
  const login = () => {
 
      if (sessionStorage.getItem("authToken")) {
        // const token = localStorage.getItem("authToken");
        const token =sessionStorage.getItem("authToken")
        const currentUser_id = decode(token);
        console.log("user id from context login ...", currentUser_id);
        console.log(currentUser_id);
        axios
          .get(`/api/user/${currentUser_id}`, config)
          .then((res) => {
            setCurrentUser(res.data.data);
          })
          .catch((err) => {
            console.log("error getting current user from front context :", err);
          });
        //*****2******//
        setLoggedIn(true);
      } 
    console.log(loggedIn);
    console.log(currentUser);
  };
  // logout
  const logout = () => {
    sleep(2000)
      .then(() => {
        sessionStorage.removeItem("authToken");
        setCurrentUser({});
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log("error front  context get current", err);
      });
  };
  const authContextValue = {
    login,
    loggedIn,
    currentUser,
    logout,
  };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };

{
  /* 

****************************explication*********************************

3anna cration ta3 lcontexte li houa AuthContext
ba3d 3melne fonction traja3 lcontexte haka belvalues login loggedin logout
ya3ni eyfonction bech tet7at bin 
<AuthContext>
 <App/> 
<AuthContext/>

tnejm testa3mel elvalues hekom

lhne 3anna login bech tseti loggedIn 3al true li hie state 
w 3anna logout li bech tseti  loggedin 3al false
w 3anna loggedin li bech na3rfou bih est ce que luser loggedin welle 

**************************************************************************
*/
}
