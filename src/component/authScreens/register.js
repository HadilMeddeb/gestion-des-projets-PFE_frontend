import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState("");

  const config = {
    header: { "Content-Type": "application/json", Accept: "application/json" },
  };

  const hundleSubmission = async (e) => {
    e.preventDefault();

    if (confirm == password) {
      await axios
        .post(
          "/api/user/register",
          { username, email, password },
          config
        )
        .then((res) => {
          let status = res.status;
          console.log(status);
          if (res.status === 201) {
            console.log(res);
            setRegistered("registred successfully");
            setTimeout(function () {
              setRegistered("");
            }, 5000);
            <Navigate to="/" />;
          } else if (status === 300) {
            console.log("fffff", res);
            setError("passwords not match ");
            setTimeout(function () {
              setError("");
            }, 5000);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setError("passwords not match ");
      setTimeout(function () {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="form-signin col-lg-6 m-auto mt-5 text-center mb-5">
      <form onSubmit={hundleSubmission}>
        <p>
          <i className="fa fa-user fa-4x mt-5"></i>
        </p>
        <h1 className="h3 mb-3 fw-normal">Please sign Up</h1>

        {/* alert error */}
        {error && (
          <div
          className="alert alert-warning alert-dismissible fade show"
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
        {registered && (
          <div
          className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {registered}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        <div className="form-floating ">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => {
              console.log(e.target.value);
              setUsername(e.target.value);
            }}
          />
      
        </div>

        <div className="form-floating mt-2">
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
    
        </div>

        <div className="form-floating mt-2">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => {
              console.log(e.target.value);
              setPassword(e.target.value);
            }}
          />
       
        </div>

        <div className="form-floating mt-2">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => {
              console.log(e.target.value);
              setConfirm(e.target.value);
            }}
          />
    
        </div>
        <div className="d-flex justify-content-between mt-2">
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div>
          <Link to="/" className="text-decoration-none">
            {" "}
            already have an account
          </Link>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
      </form>
    </div>
  );
}

export default App;
