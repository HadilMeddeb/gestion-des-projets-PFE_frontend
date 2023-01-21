import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function AddExperience(props) {
  const [poste, setPoste] = useState("");
  const [description, setDescription] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [societe, setSociete] = useState("");
  const [nature, setNature] = useState("");

  const toggle = props.toggle;
  const id = props.id;
  const open = props.open;
  const addExperience = props.addExperience;

  const config = {
    header: { "Content-Type": "application/json" },
  };
  const hundleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/etudiant/experiences/${id}`,
        { poste, description, dateDebut, dateFin, societe,nature },
        config
      );
      if (res.data.data) {
        console.log(
          "here is data of updatetttttttttttttttttttttt ",
          res.data.data
        );
        addExperience({ poste, description, dateDebut, dateFin, societe ,nature});
        toggle(false);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
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
            Add One of your competances here
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
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Competance
          </Modal.Title>
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
                id="nature"
                placeholder="Tapez la poste occupée"
                required
                onChange={(e) => {
                  setNature(e.target.value);
                }}
              />
              <label htmlFor="nature" className="fw-normal">
                Nature Ou type de l'experience
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="text"
                className="form-control"
                id="poste"
                placeholder="Tapez la poste occupée"
                required
                onChange={(e) => {
                  setPoste(e.target.value);
                }}
              />
              <label htmlFor="poste" className="fw-normal">
                Poste
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="text"
                className="form-control"
                id="societe"
                placeholder="Tapez la poste occupée"
                required
                onChange={(e) => {
                  setSociete(e.target.value);
                }}
              />
              <label htmlFor="societe" className="fw-normal">
                societe
              </label>
            </div>

            <div className=" mb-3 form-floating">
              <textarea
                className="form-control"
                id="description"
                rows={5}
                defaultValue={""}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <label htmlFor="description" className="fw-normal">
                Plus de details
              </label>
            </div>

            <div className="mb-3 form-floating">
              <input
                type="date"
                className="form-control"
                id="dateDebut"
                placeholder="Tapez la poste occupée"
                required
                onChange={(e) => {
                  setDateDebut(e.target.value);
                }}
              />
              <label htmlFor="dateDebut" className="fw-normal">
                Date debut
              </label>
            </div>

            <div className="mb-3 form-floating">
              <input
                type="date"
                className="form-control"
                id="dateFin"
                placeholder="Tapez la poste occupée"
                required
                onChange={(e) => {
                  setDateFin(e.target.value);
                }}
              />
              <label htmlFor="dateFin" className="fw-normal">
                Date Fin
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

export default AddExperience;
