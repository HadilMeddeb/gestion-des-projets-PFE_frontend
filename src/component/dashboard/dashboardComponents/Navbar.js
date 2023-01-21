import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
function Navbar() {
  const { currentUser, logout } = useAuth();
  const [profileUser,setProfileUser]= useState();

  const getById = async () => {
    try {
      const res = await axios.get(`/api/user/${currentUser._id}`);
      if (res.data.data) {
        setProfileUser(res.data.data);
        console.log("profileUser***********", res.data.data);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log("catch error " + err);
    }
  };

  useEffect(()=>{
    getById();
  },[])

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="index3.html" className="nav-link">
            Home
          </a>
        </li>
      
      </ul>
      {/* SEARCH FORM */}
      <form className="form-inline ml-3">
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-navbar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item row ">
          <div className="user-panel d-flex align-item-center row">
            <div className="image col-4 d-flex align-item-center ">
             {currentUser.avatar?<img
                src={currentUser.avatar} stykle={{width:"50px",height:"50px"}}
                className="img-circle elevation-2 d-block"
                alt="User Image"
              />: <div className="align-items-center"><i class="fas fa-user-circle fs-1"></i></div>}
            </div>
            <div className="col-6 mr-2">
              <div className="info ">
                {
                  currentUser.role=="Etudiant" ?    
                  <NavLink
                  className="text-decoration-none"
                  to={`/dashboard/profile/${currentUser._id}`}
                  className="d-block"
                >
                  {" "}
                  {currentUser.nom + " " + currentUser.prenom}
                </NavLink>:
                 <p className="badge text-dark fs-6">
                 {currentUser.nom + " " + currentUser.prenom}
                 </p>
                
                }
               
              </div>
              <div className="d-flex align-item-center">
                <Link
                  className=" col-6 text-dark text-decoration-none align-item-center  mr-3  fw-normal"
                  to="/"
                  onClick={logout}
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  logout
                </Link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
