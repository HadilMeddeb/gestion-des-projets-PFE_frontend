import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../../contexts/AuthContext";
function ListProjects() {
  const [ListProjects, setListProjects] = useState([]);
  const { currentUser } = useAuth();

  const deleteProject = (id) => {
    axios.delete("/api/projetpfe/" + id).then((res) => {
      if (res) {
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "project deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.log(res.data.message);
      }
    });
    getAllProjects();
  };

  const getAllProjects = () => {
    axios
      .get(
        `/api/encadreur/getallprojects/${currentUser._id}`
      )
      .then((res) => {
        if (res.data.data) {
          setListProjects(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error failed to get Projects :" + err);
      });
  };
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <div className="media text-muted pt-3 mt-2 container">
        <div className="row  w-100">
          {/* --------------------------header--------------------- */}
          <div className="content-header">
            <div>
              <div>
                <div className=" mb-3">
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
          <NavLink
            className="btn btn-block bg-gradient-primary btn-sm text-white"
            to="/dashboard/listProjects/addProject/"
            style={{ width: "100px", margin: "20px 20px 20px 10px" }}
          >
            Add New{" "}
          </NavLink>
          <section className="content w-100">
            {/* Default box */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Projects</h3>
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
              <div className="card-body p-0">
                <table className="table table-striped projects ">
                  <thead>
                    <tr>
                      <th style={{ width: "1%" }}>#</th>
                      <th style={{ width: "20%" }}>Project Name</th>
                      <th style={{ width: "30%" }}>Team Members</th>
                      {/* <th>Project Progress</th> */}
                      <th style={{ width: "8%" }} className="text-center">
                        societe acceuillante
                      </th>
                      <th className="text-center" style={{ width: "20%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ListProjects.map((projet) => {
                      console.log(projet);
                      return (
                        <tr key={projet._id}>
                          <td>#</td>
                          <td>
                            <a>{projet.name}</a>
                            <br />
                            <small>Created {projet.dateProjet}</small>
                          </td>
                          <td>
                            <ul className="list-inline">
                              {projet.etudiants.map((etudiant) => {
                               return ( etudiant.avatar ? (
                                  <li className="list-inline-item">
                                    <img
                                      alt="Avatar"
                                      className="table-avatar"
                                      src={etudiant.avatar}
                                    />
                                  </li>
                                ) : (
                                  <li className="list-inline-item">
                                    <i class="fas fa-photo-video"></i>
                                  </li>
                                ))
                              })}
                            </ul>
                          </td>
                          <td className="project-state">
                            <span
                              className={`badge badge-info`}
                            >
                              {projet.societe}
                            </span>
                          </td>
                          <td className="text-center project-actions text-right">
                            <button className="btn">
                              <NavLink
                                className="text-dark"
                                to={"/dashboard/projectDetails/" + projet._id}
                              >
                                <i className="fas fa-folder"></i>
                              </NavLink>
                            </button>
                            
                            <button
                              onClick={() => {
                                deleteProject(projet._id);
                              }}
                              className="btn"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
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
          </section>
        </div>
      </div>
    </>
  );
}

export default ListProjects;
