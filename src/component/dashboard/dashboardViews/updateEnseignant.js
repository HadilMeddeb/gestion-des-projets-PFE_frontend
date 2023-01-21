import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { specialiteData } from "../../../Data/technologies";
function UpdateEnseignant() {
  const {id} = useParams();
  const [encadreur, setEncadreur] = useState({});
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [updated, setUpdated] = useState("");
  const config = {
    header: { "Content-Type": "application/json" },
  };
  const Navigate= useNavigate();
  const getEnseignant = () => {
    axios
      .get(`/api/user/${id}`)
      .then((res) => {
        if (res.data.data) {
          console.log("here is data ", res.data.data);
          setEncadreur(res.data.data);
          setNom(res.data.data.nom);
          setPrenom(res.data.data.prenom);
          setEmail(res.data.data.email);
          setCin(res.data.data.cin);
          setSpecialite(res.data.data.specialite);
        } else {
          console.log("fffffffffffffffffffffff",res.data.message);
        }
      })
      .catch((err) => {
        console.log("catch error " + err);
      });
  };
  console.log("ancien :",nom, prenom, email, specialite,cin, updated);


  const updateEnseignant = async (e) => {
    e.preventDefault();
    console.log("just before update",nom, prenom, email, specialite,cin, updated);
   try {
      const res= await axios
      .put(`/api/encadreur/${id}`,{nom, prenom, email, specialite,cin},config);
        if (res.data.data) {
          console.log("here is data updated ", res.data.data);
          setUpdated("updated Successfully!");
          setTimeout(setUpdated(""), 2000);
          Navigate("/dashboard/listEnseignants");
        } 
        else {
          console.log(res.data.message);
        }
      }
      catch(err)
      {
        console.log("catch error " + err);
      }
  };

  useEffect(() => {
    getEnseignant();
  }, []);

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
                <li className="breadcrumb-item active">updateEnseignant</li>
              </ol>
            </div>
            <div className="float-sm-left d-flex align-top mb-5">
              {" "}
              <h4>Update Enseignant</h4>
            </div>
          </div>
        </div>
      </div>
      {updated && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {updated}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
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
          <div>
            <form
              className="needs-validation row"
              onSubmit={(e) => {
                updateEnseignant(e);
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
                    value={nom}
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
                      value={prenom}
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
                      value={cin}
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
                      value={email}
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

                  {/*6--------------------filiere-----------------*/}

                  <div className=" mb-3 form-floating">
                    <select defaultValue={specialite}
                      className="form-control select2bs4 select2-hidden-accessible"
                      style={{ width: "100%" }}
                      // data-select2-id="25"
                      // tabindex="-1"
                      // aria-hidden="true"
                      onChange={(e) => {
                        console.log("specialite", e.target.value);
                        setSpecialite(e.target.value);
                      }}
                    >
                     <option >{specialite}</option>
                      {specialiteData.map((sp) => {
                        return <option key ={sp} value={sp}>{sp}</option>;
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

export default UpdateEnseignant;
