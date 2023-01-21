import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FormatDate } from "../../../utils/DataTreatment";
import { useAuth } from "../../../contexts/AuthContext";
function ProjectDetails() {
  const { id } = useParams();
  console.log("id here", id);
  const [project, setProject] = useState([]);
  const [responsibleStudents, setResponsibleStudents] = useState([]);
  const [encadreurAcademique, setEncadreurAcademique] = useState({});
 const {currentUser}= useAuth();

  const deleteFile = (projectId, fileId,downloaderId) => {
 if(downloaderId==currentUser._id)
 {
   try
   {
   const res= axios.delete(`/api/projetpfe/removeFile`, { projectId, fileId})
   
      if (res.data.data) {
        console.log("deleted suucessfully: ", res.data.data);}
      else {console.log("error: ", res.data.message);}
   }
   catch(err)
   {
    console.log("catch error " + err.response.data.message);
   }
 }
 else
 {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "your not allowed",
    showConfirmButton: false,
    timer: 1500,
  });
 }
  };

  useEffect(() => {
    axios
      .get(`/api/projetpfe/${id}`)
      .then((res) => {
        if (res.data.data) {
          console.log("here is data ", res.data.data);
          setProject(res.data.data);
          setResponsibleStudents(res.data.data.etudiants);
          setEncadreurAcademique(res.data.data.encadreurAcademique);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log("catch error " + err);
      });
  }, []);

  console.log("currrent project :", project);
  const etudiants = project.etudiants;
  console.log(" les etd du projets  : ", etudiants);

  return (
    <section className="container">
      {/* --------------------------header--------------------- */}
      <div className="content-header mt-5 mb-5">
        <div>
          <div>
            <div className="">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">ProjectDetails</li>
              </ol>
            </div>
            <div className="float-sm-left d-flex align-top ">
              {" "}
              <h4>{project.name} Details</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Projects Detail</h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
              title="Collapse"
            >
              <i className="fas fa-minus" />
            </button>
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="remove"
              title="Remove"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        <div className="card-body" style={{ display: "block" }}>
          <div className="row">
            <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">
                        Date soutenance
                      </span>
                      <span className="info-box-number text-center text-muted mb-0">
                        {FormatDate(project.dateSoutenance)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">
                        durée Estimée
                      </span>
                      <span className="info-box-number text-center text-muted mb-0">
                        {project.dureeEstime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h4 className="text-start p-3">Etudiants Responsables</h4>
                  {responsibleStudents.map((etd) => (
                    <div className="post text-start border p-3">
                      <div className="user-block ">
                        {etd.avatar ? (
                          <img
                            className="img-circle img-bordered-sm"
                            src={etd.avatar}
                            alt="user image"
                          />
                        ) : (
                          <i class="fas fa-images fs-4"></i>
                        )}
                        <span className="username">
                          <Link to={`/dashboard/profile/${etd._id}`}>
                            {etd.nom + "      " + etd.prenom}
                          </Link>
                        </span>
                        <span className="description">
                          Shared publicly - 5 days ago
                        </span>
                      </div>
                      {/* /.user-block */}
                      <p>
                        Lorem ipsum represents a long-held tradition for
                        designers, typographers and the like. Some people hate
                        it and argue for its demise, but others ignore.
                      </p>
                      <p>
                        <a href="#" className="link-black text-sm">
                          <i className="fas fa-link mr-1" /> Demo File 1 v1
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
              <h3 className="text-primary">
                <i className="fas fa-paint-brush" /> {project.name}
              </h3>
              <p className="text-muted"> {project.description}</p>
              <br />
              <div className="text-muted">
                <p className="text-sm">
                  societe Acceuillante
                  <b className="d-block">{project.societe}</b>
                </p>
                <p className="text-sm">
                  Encadreur technique
                  <b className="d-block">
                    {project.encadreurThechnique} (
                    {project.postEncadreurThechnique}){" "}
                  </b>
                </p>
                <p className="text-sm">
                  Ecadrant academique
                  <b className="d-block">
                    {encadreurAcademique.nom +
                      "  " +
                      encadreurAcademique.prenom}
                  </b>
                </p>
              </div>
              <div className="text-center mt-5 mb-3">
                <Link
                  to={`/dashboard/uploadFile/${project._id}`}
                  className="btn btn-sm btn-primary"
                >
                  Add file
                </Link>
                {/* Add Task .................... */}
                {/* <a href="#" className="btn btn-sm btn-warning">
                  Add Task To Do
                </a> */}
              </div>
            </div>
          </div>
        </div>
        {/* /.card-body */}
      </div>

      <div className="col-md-12">
        {/* /.card */}
        <div className="card card-info">
          <div className="card-header">
            <h3 className="card-title">Files</h3>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i className="fas fa-minus" />
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>File Size</th>
                  <th>Downloader</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {project.files &&
                  project.files.map((file) => {
                    return (
                      <tr>
                        <td>{file.fileName}</td>
                        <td>{file.size}</td>
                        <td>
                          {file.downloader.nom +
                            " " +
                            file.downloader.prenom +
                            "  ( " +
                            file.downloader.role +
                            " )  "}
                        </td>
                        <td className="text-right py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <a
                              download
                              href={file.filePath}
                              className="btn btn-info"
                            >
                              <i class="fas fa-download"></i>
                            </a>
                            <button  className="btn btn-danger" onClick={()=>{
                              deleteFile(project._id,file._id,file.downloader._id)
                            }}>
                              <i className="fas fa-trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
    </section>
  );
}

export default ProjectDetails;
