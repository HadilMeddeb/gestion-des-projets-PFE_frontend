import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, } from "react-router-dom";
import Swal from "sweetalert2";

function ListeEnseignants() {
  const [listEnseignants, setListEnseignants] = useState([]);
  const[searchItem,setSearchItem]= useState("");

  const deleteEnseignant = async (id) => {
    await axios.delete("/api/encadreur/" + id).then((res) => {
      if (res) {
        console.log(res);
        getAll();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Enseignant deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.log(res.data.message);
      }
    });
  };

  const getAll = async () => {
    await axios.get("/api/encadreur/").then((res) => {
      if (res.data.data) {
        console.log(res.data.data);
        setListEnseignants(res.data.data);
      } else {
        console.log(res.data.message);
      }
    });
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between p-3 align-items-center">
        <h5 className="text-left">liste des Eseignant</h5>
        <NavLink className="mb-3 mr-5" to="/dashboard/addenseignant">
          Add Eseignant
        </NavLink>
      </div>
      <div className="table-responsive">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Liste Enseignants</h3>
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
                      <th>specialite</th>
                      <th> email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listEnseignants.filter((value)=>{
                         if(searchItem=="")
                         {
                           return value;
                         }
                         else if(value.prenom.toLowerCase().includes(searchItem.toLowerCase()))
                         {
                           return value;
                         }
                    }).map((enseignant) => {
                      return (
                        <tr key={enseignant._id}>
                          <td>{enseignant.nom}</td>
                          <td>{enseignant.prenom}</td>
                          <td>{enseignant.cin}</td>
                          <td>{enseignant.specialite}</td>
                          <td>{enseignant.email}</td>
                          <td>
                            {" "}
                            <button
                              type="button"
                              className="btn btn-danger mr-2"
                              onClick={() => {
                                deleteEnseignant(enseignant._id);
                              }}
                            >
                              Delete
                            </button>
                            <Link
                              className="btn btn-primary mr-2"
                              to={`/dashboard/updateEnseignant/${enseignant._id}`}
                            >
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
  );
}
export default ListeEnseignants;
