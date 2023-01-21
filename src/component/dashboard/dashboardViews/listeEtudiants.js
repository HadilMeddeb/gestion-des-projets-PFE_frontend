import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function ListeEtudiants() {
  const [listEtudiants, setListEtudiants] = useState([]);
  const [searchItem,setSearchItem]= useState([]);
  const deleteEtudiant = (id) => {
    axios.delete("/api/etudiant/" + id).then((res) => {
      if (res) {
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Etudiant deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        getAllStudent();
      } else {
        console.log(res.data.message);
      }
    });
  };

const getAllStudent=()=>{
  axios.get("/api/etudiant/").then((res) => {
      if (res.data.data) {
        setListEtudiants(res.data.data);
      } else {
        console.log(res.data.message);
      }
    });
}

  useEffect(() => {
    getAllStudent();
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between p-3 align-items-center">
          <h5 className="text-left">liste des Etudiants</h5>
          <NavLink className="mb-3 mr-5" to="/dashboard/addetudiant">
            Add Etudiant
          </NavLink>
        </div>
        <div className="table-responsive">
          <div
            className="card-body table-responsive p-0"
            style={{ height: 400 }}
          >
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Liste Etudiants</h3>
                    <div className="card-tools">
                      <div
                        className="input-group input-group-sm"
                        style={{ width: 150 }}
                      >
                        <input
                          type="text"
                          name="table_search"
                          className="form-control float-right"
                          placeholder="Search"
                          onChange={(e)=>{setSearchItem(e.target.value)}}
                        />
                        <div className="input-group-append">
                          <button type="submit" className="btn btn-default">
                            <i className="fas fa-search" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div
                    className="card-body table-responsive p-0"
                    style={{ height: 400 }}
                  >
                    <table className="table table-head-fixed text-nowrap">
                      <thead>
                        <tr>
                          <th>nom</th>
                          <th>prenom</th>
                          <th>cin</th>
                          <th>email</th>
                          <th>filiere</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listEtudiants.filter((value)=>{
                         if(searchItem=="")
                         {
                           return value;
                         }
                         else if(value.prenom.toLowerCase().includes(searchItem.toLowerCase()))
                         {
                           return value;
                         }
                    }).map((etudiant) => {
                          return (
                            <tr key={etudiant._id}>
                              <td>{etudiant.nom}</td>
                              <td>{etudiant.prenom}</td>
                              <td>{etudiant.cin}</td>
                              <td>{etudiant.filiere}</td>
                              <td>{etudiant.email}</td>
                              <td>
                                {" "}
                                <button
                                  type="button"
                                  className="btn btn-danger mr-2"
                                  onClick={() => {
                                    deleteEtudiant(etudiant._id);
                                  }}
                                >
                                  Delete
                                </button>
                                <Link to={`/dashboard/updateEtudiant/${etudiant._id}`}  className="btn btn-primary mr-2">
                                    update
                                </Link>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeEtudiants;
