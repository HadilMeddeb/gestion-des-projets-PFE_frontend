import React from "react";
import { NavLink } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";


function App() {
  const {loggedIn} = useAuth();
  const {logout} = useAuth();
  const {currentUser}=useAuth();

  console.log(loggedIn);
  return (
    <nav className="d-flex justify-content-between flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto fw-normal">Chat Home</h5>

      <div className="my-2 my-md-0 mr-md-3">
        {loggedIn ? 
         <div className=" d-flex align-items-center">
         
         <NavLink className="p-2 text-dark  text-decoration-none d-flex align-items-center" to="/profile" onClick={logout}>  
              <i className="fa fa-user-circle fa-2x d-flex align-items-center "></i>  
          </NavLink>

         <div>
         <NavLink className="p-2 text-dark  text-decoration-none  mr-3 fw-normal " to="/profile">{currentUser.nom +" "+currentUser.prenom}</NavLink><br/>
          <NavLink className="p-2 text-dark  text-decoration-none  mr-3  fw-normal" to="/" onClick={logout}>logout</NavLink>
         </div>
       </div>:
        <> 
        <NavLink className="p-2 text-dark  text-decoration-none  fw-normal text-light"  to="/">Home</NavLink>
        <NavLink className="p-2 text-dark  text-decoration-none  fw-normal" to="/login"> <i className="p-2 fas fa-sign-in-alt"></i> SignIn</NavLink>
        </>
     
        }
      </div>
    </nav>
  );
}

export default App;
