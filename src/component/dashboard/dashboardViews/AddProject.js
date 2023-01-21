import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../../contexts/AuthContext";
import { MultiSelect } from "react-multi-select-component";
import { technologies } from "../../../Data/technologies";
import { Link } from "react-router-dom";
import { getAll, getValues, getlables } from "../../../utils/DataTreatment";

function AddProject() {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [sujet, setSujet] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionDetaille, setDescriptionDetaille] = useState("");
  const [societe, setSociete] = useState("");
  const [encadreurThechnique, setencadreurThechnique] = useState("");
  const [postEncadreurThechnique, setPostEncadreurThechnique] = useState("");
  const [encadreurAcademique, setEncadreurAcademique] = useState(
    currentUser._id
  );
  const [dateSoutenance, setDateSoutenance] = useState(Date.now);
  const [dureeEstime, setDureeEstime] = useState(0);
  const [jury, setJury] = useState([]);

  const [students, setStudents] = useState([]);
  const [profs, setProfs] = useState([]);
  const [selectedEtudiants, setSelectedEtudiants] = useState([]);
  const [selectedthechnologies, setSelectedthechnologies] = useState([]);
  const [selectedjury, setSelectedjury] = useState([]);

  const [createdProject, setCreatedProject] = useState({});
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(async () => {
    (async () => {
      console.log(await getAll("etudiant", setStudents));
    })();

    (async () => {
      console.log(await getAll("encadreur", setProfs));
    })();
  }, []);

  const studentsOptions = students.map((e) => {
    return { label: e.nom + " " + e.prenom, value: e._id };
  });
  const ProfsOptions = profs.map((e) => {
    return { label: e.nom + " " + e.prenom, value: e._id };
  });

  const etudiants = getValues(selectedEtudiants);
  console.log("ettttttttt", etudiants);
  const technologiesValues = getlables(selectedthechnologies);
  console.log("technooooooooooooo", technologiesValues);
  const juryValues = getValues(selectedjury);

  const ajouterProjet = () => {
    console.log("etudiantyyyyyyyyyyyyyy",etudiants)
    try {
      etudiants.forEach(async (etd) => {
        const resultat = await axios.put("/api/etudiant/"+etd, {
          projetPFE: createdProject,
        });
        if (resultat.data) {
          console.log("tout est bien ajouté à l'etuiant ", etd);
        } else {
          console.log("erreur d'ajout à l'etudiant ", etd);
        }
      });
    } catch (err) {
      console.log("error insertion: ", err.response.data.message);
    }
  };

  //hundle submission
  const hundleSubmission = async (e) => {
    //creation projet
    e.preventDefault();

    console.log({
      name: name,
      sujet: sujet,
      description: description,
      descriptionDetaille: descriptionDetaille,
      societe: societe,
      encadreurThechnique: encadreurThechnique,
      postEncadreurThechnique: postEncadreurThechnique,
      encadreurAcademique: encadreurAcademique,
      etudiants: etudiants,
      dureeEstime: dureeEstime,
      jury: juryValues,
      dateSoutenance: dateSoutenance,
      technologies: technologiesValues,
    });

    await axios
      .post(
        "/api/projetpfe",
        {
          name: name,
          sujet: sujet,
          description: description,
          descriptionDetaille: descriptionDetaille,
          societe: societe,
          encadreurThechnique: encadreurThechnique,
          postEncadreurThechnique: postEncadreurThechnique,
          encadreurAcademique: encadreurAcademique,
          etudiants: etudiants,
          dureeEstime: dureeEstime,
          jury: juryValues,
          dateSoutenance: dateSoutenance,
        },
        config
      )
      .then(async (res) => {
        console.log("projetPFE", res.data.data);
        if (res.data.data) {
          console.log(
            "ttttttttttttttttttttttttttttttttttt8888888888",
            res.data.data
          );
          setCreatedProject(res.data.data);
          try {
            etudiants.forEach(async (etd) => {
              const resultat = await axios.put("/api/etudiant/"+etd, {
                projetPFE:  res.data.data._id,
              });
              if (resultat.data) {
                console.log("tout est bien ajouté à l'etuiant ", etd);
              } else {
                console.log("erreur d'ajout à l'etudiant ", etd);
              }
            });
          } catch (err) {
            console.log("error insertion: ", err.response.data.message);
          }
          Swal.fire({
            position: "center",
            icon: "success",
            title: "projet ajouté avec succée",
            showConfirmButton: false,
            timer: 1500,
          });
           await axios
            .post(
              "/api/topic",
              { profEncadrant: encadreurAcademique, etudiants, name },
              config
            )
            .then((res) => {
              console.log("topic", res.data.data);
              if (res.data.data) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Topic ajouté avec succée",
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "echec ajout Topic",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch((err) => {
              console.log("error creation topic  error : ", err);
            });
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "echec ajout projet",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log("error creation topic  error : ", err);
      });

    //creation Topic associé
  };

  return (
    <div className="m-3">
      <div className="container">
        {/* --------------------------header--------------------- */}
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

        <div className="card card-default w-100">
          <div className="card-header">
            <h3 className="card-title"> Project </h3>
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
                  hundleSubmission(e);
                }}
              >
                <div className="col-6">
                  {/* 1--------------------name */}
                  <div className=" form-floating mb-3 text-left">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Tapez votre name"
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <label htmlFor="name " className="fw-normal">
                      nom projet
                    </label>

                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  {/* 2--------------------description */}
                  <div className="text-left">
                    <div className=" form-floating mb-3">
                      <textarea
                        className="form-control"
                        id="description"
                        rows={3}
                        defaultValue={""}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                      <label htmlFor="description" className="fw-normal">
                        Description projet
                      </label>
                    </div>
                    {/* 3--------------------description detaillee*/}
                    <div className=" mb-3 form-floating">
                      <textarea
                        className="form-control"
                        id="descriptionDetaille"
                        rows={5}
                        defaultValue={""}
                        onChange={(e) => {
                          setDescriptionDetaille(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="descriptionDetaille"
                        className="fw-normal"
                      >
                        Description detaillée du projet
                      </label>
                    </div>

                    {/* 4--------------------sujet */}
                    <div className=" mb-3 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="sujet"
                        required
                        onChange={(e) => {
                          console.log("sujet", e.target.value);
                          setSujet(e.target.value);
                        }}
                      />
                      <label htmlFor="sujet" className="fw-normal">
                        sujet
                      </label>
                    </div>
                    {/* 5--------------------etudiants */}

                    <div className="mb-3 form-group">
                      <div>
                        <label
                          htmlFor="etudiantsResponsables"
                          className="fw-normal"
                        >
                          select Etudiants
                        </label>

                        <MultiSelect
                          id="etudiantsResponsables"
                          options={studentsOptions}
                          value={selectedEtudiants}
                          onChange={setSelectedEtudiants}
                          labelledBy="Select"
                        />
                      </div>
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>
                    {/* 6--------------------societe */}
                    <div className=" form-floating mb-3 text-left">
                      <input
                        type="text"
                        className="form-control"
                        id="societe"
                        placeholder="Tapez votre name"
                        required
                        onChange={(e) => {
                          setSociete(e.target.value);
                        }}
                      />
                      <label htmlFor="societe " className="fw-normal">
                        societe acceuillante
                      </label>

                      <div className="invalid-feedback">
                        Valid society name is required.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className=" form-floating  mb-3 text-left">
                    {/* 7--------------------encadreur Thechnique */}
                    <div className="mb-3 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="encadreurTechnique"
                        placeholder="Encadreur Thechnique"
                        required
                        onChange={(e) => {
                          setencadreurThechnique(e.target.value);
                        }}
                      />
                      <label htmlFor="encadreurTechnique" className="fw-normal">
                        Encadreur Technique
                      </label>
                    </div>
                    {/* 8--------------------poste encadreur Thechnique */}
                    <div className=" mb-3 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="PosteEncadreurTechnique"
                        placeholder="Tapez votre name"
                        required
                        onChange={(e) => {
                          setPostEncadreurThechnique(e.target.value);
                        }}
                      />

                      <label
                        htmlFor="PosteEncadreurTechnique"
                        className="fw-normal"
                      >
                        PosteEncadreurTechnique
                      </label>
                    </div>
                    {/* 9--------------------dateSoutenance*/}
                    <div className="mb-3 form-floating">
                      <input
                        type="date"
                        className="form-control"
                        id="dateSoutenance"
                        placeholder="Tapez votre nom"
                        required
                        onChange={(e) => {
                          console.log("dateSoutenance :", dateSoutenance);
                          setDateSoutenance(e.target.value);
                        }}
                      />
                      <label htmlFor="dateSoutenance" className="fw-normal">
                        dateSoutenance
                      </label>
                    </div>
                    {/*10--------------------dureeEstimee */}
                    <div className="mb-3 form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="duree"
                        placeholder="Tapez votre nom"
                        required
                        onChange={(e) => {
                          setDureeEstime(e.target.value);
                        }}
                      />
                      <label htmlFor="duree " className="fw-normal">
                        durée estimée (jours)
                      </label>
                    </div>
                    {/* 11--------------------thechnologies*/}
                    <div className="mb-3 form-group">
                      <div>
                        <label htmlFor="technologies" className="fw-normal">
                          select thechnologies
                        </label>
                        <MultiSelect
                          options={technologies}
                          value={selectedthechnologies}
                          onChange={setSelectedthechnologies}
                          labelledBy="Select"
                        />
                      </div>

                      <div className="mb-3 form-group">
                        <div>
                          <label htmlFor="jury" className="fw-normal">
                            select jury
                          </label>
                          <MultiSelect
                            options={ProfsOptions}
                            value={selectedjury}
                            onChange={setSelectedjury}
                            labelledBy="Select"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Valid last name is required.
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

              <div className="col-6"></div>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">click submit To create The project</div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
