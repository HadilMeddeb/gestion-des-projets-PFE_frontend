import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { filiereData } from "../../../Data/technologies";
import{MasterData} from '../../../Data/technologies';
import{LicenceData} from '../../../Data/technologies';
import{IngenierieData} from '../../../Data/technologies';
import{PreparatoireData} from '../../../Data/technologies';
import {transformDateTOStandard} from "../../../utils/DataTreatment";

function UpdateEnseignant() {
  const { id } = useParams();
  const [etudiant, setEtudiant] = useState({});
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");
  const [filiere, setFiliere] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [tel, setTel] = useState("");
  const [pays, setPays] = useState("");
  const [ville, setVille] = useState("");
  const [municipalite, setMunicipalite] = useState("");
  const [avenue, setAvenue] = useState("");
  const [rue, setRue] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [updated, setUpdated] = useState("");
  const [error,setError]=useState("");
  const Navigate = useNavigate();
  const config = {
    header: { "Content-Type": "application/json" },
  };

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


  const getEtudiant = () => {
    axios
      .get(`/api/user/${id}`)
      .then((res) => {
        if (res.data.data) {
          console.log("here is data ", res.data.data);
          setEtudiant(res.data.data);
          setNom(res.data.data.nom);
          setPrenom(res.data.data.prenom);
          setEmail(res.data.data.email);
          setCin(res.data.data.cin);
          setFiliere(res.data.data.filiere);
          setSpecialite(res.data.data.specialite);
          setTel(res.data.data.tel);
          setMunicipalite(res.data.data.adress.municipalite);
          setRue(res.data.data.adress.rue);
          setCodePostal(res.data.data.adress.codePostal);
          setPays(res.data.data.adress.pays);
          setVille(res.data.data.adress.ville);
          setAvenue(res.data.data.adress.avenue);

        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log("catch error " + err);
      });
  };
  
  

 const adress={
    municipalite:municipalite,
    rue:rue,
    codePostal:codePostal,
    pays:pays,
    ville:ville,
    avenue:avenue,
  };




  const updateEtudiant = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/etudiant/${id}`,{nom, prenom, email, filiere,cin,specialite,tel,adress},config);
      if (res.data.data) {
        console.log(
          "here is data of updatetttttttttttttttttttttt ",
          res.data.data
        );
        setUpdated("updated Successfully!");
        setTimeout(setUpdated(""), 2000);
        Navigate("/dashboard/listEtudiants");
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      setError(err.response.data.message);
        setTimeout(() => {
        setError("");
        },5000);
      console.log("catch error " + err);
    }
  };

  useEffect(() => {
    getEtudiant();
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
                <li className="breadcrumb-item active">updateEtudiant</li>
              </ol>
            </div>
            <div className="float-sm-left d-flex align-top mb-5">
              {" "}
              <h4>Update Etudiant</h4>
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
          <h3 className="card-title">Etudiant</h3>
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
                updateEtudiant(e);
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

                  {/* 4--------------------email */}
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
                  {/* tel */}
                  <div className=" mb-3 form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="tel"
                      value={tel}
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
                  {/* adresse */}
                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="pays"
                      value={pays}
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

            {/* ville */}

                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="ville"
                      value={ville}
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

  {/* municipalite */}

                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="municipalite"
                      value={municipalite}
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

 {/* avenue */}

                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="Avenue"
                      required
                      value={avenue}
                      onChange={(e) => {
                        console.log("Avenue", e.target.value);
                        setAvenue(e.target.value);
                      }}
                    />
                    <label htmlFor="Avenue" className="fw-normal">
                    Avenue
                    </label>
                  </div>

           {/* rue */}

                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="Rue"
                      value={rue}
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
                  

  {/* codePostal */}

                  <div className=" mb-3 form-floating">
                    <input
                      type="dta"
                      className="form-control"
                      id="code postal"
                      required
                      value={codePostal}
                      onChange={(e) => {
                        console.log("setCodePostal", e.target.value);
                        setCodePostal(e.target.value);
                      }}
                    />
                    <label htmlFor="tel" className="fw-normal">
                    set CodePostal
                    </label>
                  </div>
                  


                  {/*6--------------------filiere-----------------*/}

                  <div className=" mb-3 form-floating">
                    <select
                      className="form-control select2bs4 select2-hidden-accessible"
                      style={{ width: "100%" }}
                      // data-select2-id="25"
                      // tabindex="-1"
                      // aria-hidden="true"
                      onChange={(e) => {
                        console.log("specialite", e.target.value);
                        setFiliere(e.target.value);
                      }}
                    >
                      <option defaultValue value={filiere}>
                        {filiere}
                      </option>
                      {filiereData.map((fl) => {
                        return (
                          <option key={fl} value={fl}>
                            {fl}
                          </option>
                        );
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

export default UpdateEnseignant;
