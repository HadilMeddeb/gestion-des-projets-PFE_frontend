import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function AddCompetance(props) {
  const [technologie, setTechnologie] = useState("");
  const [niveau, setNiveau] = useState("");
  const nv=["beginner","intermidiaire","avancee"];
  const toggle = props.toggle;
  const id = props.id;
  const open = props.open;
  const addCompetance= props.addCompetance;

  const config = {
    header: { "Content-Type": "application/json" },
  };
  const hundleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/etudiant/competances/${id}`,
        {technologie,niveau},
        config
      );
      if (res.data.data) {
        console.log(
          "here is data of updatetttttttttttttttttttttt ",
          res.data.data
        );
        addCompetance({technologie,niveau});
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
          <Modal.Title id="example-modal-sizes-title-lg">Add Competance</Modal.Title>
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
                id="duree"
                placeholder="Tapez votre nom"
                required
                onChange={(e) => {
                    setTechnologie(e.target.value);
                }}
              />
              <label htmlFor="duree " className="fw-normal">
                Technologie
              </label>
            </div>
            <div className=" mb-3 form-floating">
              <select
                className="form-control select2bs4 select2-hidden-accessible"
                style={{ width: "100%" }}
                // data-select2-id="25"
                // tabindex="-1"
                // aria-hidden="true"
                onChange={(e) => {
                  console.log("niveau", e.target.value);
                  setNiveau(e.target.value);
                }}
              >
                <option></option>
                {nv.map((n) => {
                  return <option value={n}>{n}</option>;
                })}
              </select>
              <label>Niveau</label>
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

export default AddCompetance;
