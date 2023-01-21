import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function AddFormation(props) {
  const [nom, setNom] = useState("");
  const [details, setDetails] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [universite, setUniversite] = useState("");

  const toggle = props.toggle;
  const id = props.id;
  const open = props.open;
  const addFormation = props.addFormation;

  const config = {
    header: { "Content-Type": "application/json" },
  };

  const hundleSubmission = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.put(
          `/api/etudiant/formations/${id}`,
          { nom, dateDebut, dateFin, universite,details},
          config
        );

        if(res.data.data) {
          console.log(
            "here is data of updatetttttttttttttttttttttt ",
            res.data.data
          );
          addFormation({ nom, dateDebut, dateFin, universite ,details});
          toggle(false);
        } else {
          console.log(res.data.message);
        }
      }
    catch (err) {
      console.log("catch error " + err);
    }
  };

  return (
    <>
      <Modal
        size="sm"
        show={open}
        onHide={() => toggle(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Add your Biography from here
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={open}
        onHide={() => toggle(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Add Bio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              hundleSubmission(e);
            }}
          >
            <div className="mb-3 form-floating">
              <input
                type="text"
                className="form-control"
                id="nom"
                placeholder="Tapez votre nom"
                required
                onChange={(e) => {
                  setNom(e.target.value);
                }}
              />
              <label htmlFor="nom " className="fw-normal">
                Nom Formation
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="date"
                className="form-control"
                id="dateDebut"
                placeholder="Tapez votre nom"
                required
                onChange={(e) => {
                  setDateDebut(e.target.value);
                }}
              />
              <label htmlFor="dateDebut " className="fw-normal">
                Date Debut
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="date"
                className="form-control"
                id="dateFin"
                placeholder="Tapez votre nom"
                required
                onChange={(e) => {
                  setDateFin(e.target.value);
                }}
              />
              <label htmlFor="dateFin " className="fw-normal">
                Date Fin
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="text"
                className="form-control"
                id="universite"
                placeholder="Tapez l' universite"
                required
                onChange={(e) => {
                  setUniversite(e.target.value);
                }}
              />
              <label htmlFor="universite " className="fw-normal">
                universite
              </label>
            </div>
            <div className=" mb-3 form-floating">
                      <textarea
                        className="form-control"
                        id="details"
                        rows={5}
                        defaultValue={""}
                        onChange={(e) => {
                          setDetails(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="details"
                        className="fw-normal"
                      >
                        plus de detailles
                      </label>
                    </div>
            <button
              className="btn btn-primary btn-lg btn-block mt-2 "
              style={{ width: "100px", fontSize: "15px" }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddFormation;
