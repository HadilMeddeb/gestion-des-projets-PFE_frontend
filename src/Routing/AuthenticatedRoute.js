import React,{useEffect} from "react";
import Etudiant from "../Roles/Etudiant";
import Encadreur from "../Roles/Encadreur";
import Admin from "../Roles/Admin";
import { useAuth } from "../contexts/AuthContext";

function AuthenticatedRoute() {
  const { currentUser } = useAuth();

  console.log("from authenticated commoen n ",currentUser);
  if (currentUser.role == "Admin") {
    console.log("it's admin");
    return  <Admin/>;
  } else if (currentUser.role == "Encadreur") {
    console.log("it's Encadreur");
    return <Encadreur />;
  } else {
    console.log("it's Etudiant");
    return <Etudiant />;
  }
}

export default AuthenticatedRoute;
