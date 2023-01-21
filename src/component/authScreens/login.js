import { Link} from "react-router-dom";
import { useNavigate } from 'react-router';
import { useState } from "react";
import {useAuth} from '../../contexts/AuthContext';
import axios from "axios";
import Navbar from "../Navbar";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""
  );
  const [error, setError] = useState("");
  const [loggedin, setloggedin] = useState("");
  const {login} = useAuth();
  const Navigate=  useNavigate();
  const config = {
    header: { "Content-Type": "application/json" },
  };



  const handleSubmistion = async (e) => {
    e.preventDefault();
       try
       {
        const res=await axios
        .post("/api/user/login", { email, password }, config)
        if(res.data)
        {
          console.log("resulta from login **",res);
          console.log("resulta from login **",res.data.message);
          login();
          setloggedin(res.data.message);
          setTimeout(setloggedin(""), 5000);
          localStorage.setItem("authToken", res.data.token);
          sessionStorage.setItem("authToken", res.data.token);
          
          Navigate({ pathname: '/dashboard' }, { replace: true })
        }
       
        else
        {
        
          console.log(res.data,"error there is no response from backend");
        }

       }catch(err)
       {
        console.log("error ttttttttttttttttttttttt",err);
        setError(err.response.data.message);
        setTimeout(() => {
        setError("");
        }, 5000);
       }



    // await axios
    //   .post("http://127.0.0.1:5000/api/user/login", { email, password }, config)
    //   .then((res) => {
    //     console.log("ressssss");
    //     if(res)
    //     {
    //       console.log("resulta from login **",res);
    //       console.log("resulta from login **",res.data.message);
    //       login();
    //       setloggedin(res.data.message);
    //       setTimeout(() => {
    //         setloggedin("");
    //       }, 5000);
    //       localStorage.setItem("authToken", res.data.token);
    //       sessionStorage.setItem("authToken", res.data.token);
    //       Navigate("/dashboard");
    //     }
    //     else
    //     {
    //       console.log("error there is no response from backend");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("resscatcchhhhssss");
    //     console.log("error ttttttttttttttttttttttt",error);
    //     setError(error.response.data.error);
    //     setTimeout(() => {
    //       setError("");
    //     }, 5000);
    //   });
  };

  return (
  <>
    <Navbar/>
    <div className="form-signin col-lg-5  m-auto mt-5 text-center mb-5">
      <form onSubmit={handleSubmistion}>
        <p>
          <i className="fa fa-user fa-4x mt-5"></i>
        </p>

        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {error}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        {/* success alert */}
        {loggedin && (
          <div
          className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {loggedin}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating ">

          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
          />
         <label forHtml="floatingInput" className="fw-normal">Email address</label>
        </div>

        <div className="form-floating mt-2">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
         <label forHtml="floatingPassword" className="fw-normal" >Password</label>
        </div>

        <div className="d-flex justify-content-between mt-2">
          <div className="checkbox mb-3">
            <label className="fw-normal" >
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2021–2022</p>
      </form>
    </div>
  </>
  );
}

export default Login;

























/*
// verifying if the jwt has expired or not

var isExpired = false;
const token = localStorage.getItem('id_token');
var decodedToken=jwt.decode(token, {complete: true});
var dateNow = new Date();

if(decodedToken.exp < dateNow.getTime())
    isExpired = true;
*/