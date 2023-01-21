import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Niveau, filiere, specialiteData } from "../../../Data/technologies";
function AddEnseignant() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [error,setError]=useState("");
  const [] = useState();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const hundleSubmission = (e) => {
    e.preventDefault();
    console.log(nom, "  ", prenom, " ", email, "  ", cin, "  ", specialite);
    axios
      .post(
        "/api/encadreur",
        { nom, prenom, email, cin, specialite },
        config
      )
      .then((res) => {
        console.log("here is the student from intreface", res.data.data);
        if (res.data.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Enseignant ajouté avec succée",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.replace("/dashboard/listEnseignants")
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "echec ajout d'enseignant",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log("error creation etud  error : ", err.response.data.message);
        setError(err.response.data.message);
        setTimeout(() => {
        setError("");
        }, 5000); 

      });
  };

  return (
    <div className="container">
      <div className="content-header">
        <div>
          <div>
            <div className=" mb-5">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">AddProject</li>
              </ol>
            </div>
            <div className="float-sm-left d-flex align-top mb-5">
              {" "}
              <h4>Nouveau ProjetPFE</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-default w-100 mt-5 ">
        <div className="card-header">
          <h3 className="card-title">Enseignant</h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
            >
              <i className="fas fa-minus" />
            </button>
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="remove"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        {/* /.card-header */}
        <div className="card-body">
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
          <div>
            <form
              className="needs-validation row"
              onSubmit={(e) => {
                hundleSubmission(e);
              }}
            >
              <div className="col-12">
                {/* 1--------------------nom */}
                <div className=" form-floating mb-3 text-left">
                  <input
                    type="text"
                    className="form-control"
                    id="nom"
                    placeholder="Tapez votre name"
                    required
                    onChange={(e) => {
                      setNom(e.target.value);
                    }}
                  />
                  <label htmlFor="name " className="fw-normal">
                    nom
                  </label>

                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                {/* 2--------------------prenom */}
                <div className="text-left">
                  <div className=" form-floating mb-3">
                    <textarea
                      className="form-control"
                      id="prenom"
                      rows={3}
                      defaultValue={""}
                      onChange={(e) => {
                        setPrenom(e.target.value);
                      }}
                    />
                    <label htmlFor="description" className="fw-normal">
                      Prenom
                    </label>
                  </div>
                  {/* 3-------------------Cin*/}
                  <div className=" mb-3 form-floating">
                    <textarea
                      className="form-control"
                      id="descriptionDetaille"
                      rows={5}
                      defaultValue={""}
                      onChange={(e) => {
                        setCin(e.target.value);
                      }}
                    />
                    <label htmlFor="descriptionDetaille" className="fw-normal">
                      Cin
                    </label>
                  </div>

                  {/* 4--------------------sujet */}
                  <div className=" mb-3 form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      required
                      onChange={(e) => {
                        console.log("email", e.target.value);
                        setEmail(e.target.value);
                      }}
                    />
                    <label htmlFor="sujet" className="fw-normal">
                      Email
                    </label>
                  </div>
                  {/* 6--------------------filiere */}

                  <div className=" mb-3 form-floating">
                   
                    <select
                      className="form-control select2bs4 select2-hidden-accessible"
                      style={{width :"100%"}}
                      // data-select2-id="25"
                      // tabindex="-1"
                      // aria-hidden="true"
                      onChange={(e) => {
                        console.log("specialite", e.target.value);
                        setSpecialite(e.target.value);
                      }}
                    >
                       <option>choose specialite </option>
                      {specialiteData.map((fl) => {
                        return <option value={fl}>{fl}</option>;
                      })}
                    </select>
                    <label>specialite</label>
                  </div>
                  <button
                      className="btn btn-primary btn-lg btn-block mt-2 "
                      style={{ width: "100px", fontSize: "15px" }}
                      type="submit"
                    >
                      Submit
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* /.card-body */}
        <div className="card-footer">click submit To create The project</div>
      </div>
    </div>
  );
}

export default AddEnseignant;
