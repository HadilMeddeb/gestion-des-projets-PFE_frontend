import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import{filiereData} from '../../../Data/technologies';
import{MasterData} from '../../../Data/technologies';
import{LicenceData} from '../../../Data/technologies';
import{IngenierieData} from '../../../Data/technologies';
import{PreparatoireData} from '../../../Data/technologies';


function AddEtudiant() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [filiere, setFiliere] = useState("Licence");
  const [specialite, setSpecialite] = useState("");
  const [tel, setTel] = useState("");
  const [pays, setPays] = useState("");
  const [ville, setVille] = useState("");
  const [avenue, setAvenue] = useState("");
  const [rue, setRue] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [municipalite, setMunicipalite] = useState("");
  const [validation,setValidation]=useState("");
  const [error,setError]=useState("");
  

  function DiplomeToSpecialite(diplome)
  {
    switch(diplome) {
      case "Master":
        return MasterData;
        break;
      case "Preparatoire":
        return PreparatoireData;
        break;
        case "Ingenierie":
          return IngenierieData;
          break;
      default:
       return LicenceData;
    }
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const hundleSubmission = async (e) => {
    e.preventDefault();
    console.log(nom, "  ", prenom, " ", email, "  ", cin, "  ", filiere);
    const adress={pays,ville,avenue,municipalite,rue,codePostal};
   
   try
   {
     console.log({ nom, prenom, email, cin, filiere,dateNaissance,tel,adress,specialite })
    const res=await axios
    .post(
      "/api/etudiant",
      { nom, prenom, email, cin, filiere,dateNaissance,tel,adress,specialite },
      config
    );

   
    if (res.data) {
      console.log(res.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Etudiant ajouté avec succée",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.replace("/dashboard/listEtudiants")
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "echech creation d'un nouveau etudiant",
        showConfirmButton: false,
        timer: 1500,
      });
    }
   }
   catch(err)
   {
    console.log("error creation etud  error : ", err.response.data.message);
    setError(err.response.data.message);
    setTimeout(() => {
    setError("");
    }, 5000); 
       
  }
   
  };

  return (
    <div className="container" >
      <div className="content-header">
        <div>
          <div>
            <div className=" mb-5">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">AddEtudiant</li>
              </ol>
            </div>
            <div className="float-sm-left d-flex align-top mb-5">
              {" "}
              <h4> Nouveau Etudiant </h4>
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
          <div>
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
                    <label htmlFor="email" className="fw-normal">
                      Email
                    </label>
                  </div>

                  <div className=" mb-3 form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="tel"
                      required
                      onChange={(e) => {
                        console.log("tel", e.target.value);
                        setTel(e.target.value);
                      }}
                    />
                    <label htmlFor="tel" className="fw-normal">
                      Tel
                    </label>
                  </div>

                  <div className=" mb-3 form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="dateNaissance"
                      required
                      onChange={(e) => {
                        console.log("dateNaissance", e.target.value);
                        setDateNaissance(e.target.value);
                      }}
                    />
                    <label htmlFor="tel" className="fw-normal">
                    date Naissance
                    </label>
                  </div>
                  {/* adresse */}
                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="pays"
                      required
                      onChange={(e) => {
                        console.log("pays", e.target.value);
                        setPays(e.target.value);
                      }}
                    />
                    <label htmlFor="pays" className="fw-normal">
                    pays
                    </label>
                  </div>



                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="ville"
                      required
                      onChange={(e) => {
                        console.log("ville", e.target.value);
                        setVille(e.target.value);
                      }}
                    />
                    <label htmlFor="tel" className="fw-normal">
                    ville
                    </label>
                  </div>



                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="municipalite"
                      required
                      onChange={(e) => {
                        console.log("municipalite", e.target.value);
                        setMunicipalite(e.target.value);
                      }}
                    />
                    <label htmlFor="municipalite" className="fw-normal">
                    municipalite
                    </label>
                  </div>



                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="Avenue"
                      required
                      onChange={(e) => {
                        console.log("Avenue", e.target.value);
                        setAvenue(e.target.value);
                      }}
                    />
                    <label htmlFor="Avenue" className="fw-normal">
                    Avenue
                    </label>
                  </div>



                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="Rue"
                      required
                      onChange={(e) => {
                        console.log("Rue", e.target.value);
                        setRue(e.target.value);
                      }}
                    />
                    <label htmlFor="Rue" className="fw-normal">
                    Rue
                    </label>
                  </div>
                  



                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="code postal"
                      required
                      onChange={(e) => {
                        console.log("setCodePostal", e.target.value);
                        setCodePostal(e.target.value);
                      }}
                    />
                    <label htmlFor="tel" className="fw-normal">
                    set CodePostal
                    </label>
                  </div>
                  


                  {/* adresse */}
                  {/* 6--------------------filiere */}

                  <div className=" mb-3 form-floating">
                    <select
                      className="form-control select2bs4 select2-hidden-accessible"
                      style={{ width: "100%" }}
                      // data-select2-id="25"
                      // tabindex="-1"
                      // aria-hidden="true"
                      onChange={(e) => {
                        console.log("^filiere", e.target.value);
                        setFiliere(e.target.value);
                      }}
                    >
                       <option defaultValue value="Licence">Licence</option>
                      {filiereData.map((fl) => {
                        return <option value={fl}>{fl}</option>;
                      })}
                    </select>
                    <label>Diplome</label>
                  </div>
                  
                  <div className=" mb-3 form-floating">
                    <select
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
                     <option>choose filiere </option>
                      {DiplomeToSpecialite(filiere).map((sp) => {
                        return <option value={sp}>{sp}</option>;
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

export default AddEtudiant;
