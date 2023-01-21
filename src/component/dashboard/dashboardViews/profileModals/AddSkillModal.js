import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function AddSkillModal(props) {
    const [skill,setSkill]= useState();
    const toggle = props.toggle;
    const id = props.id;
    const open = props.open;
    const addSkill= props.addSkill;
    const config = {
        header: { "Content-Type": "application/json" },
      };
      const hundleSubmission = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.put(
            `/api/etudiant/skills/${id}`,
            {skill},
            config
          );
          if (res.data.data) {
            console.log(
              "here is data of updatetttttttttttttttttttttt ",
              res.data.data
            );
            addSkill(skill);
            toggle(false);
          } else {
            console.log(res.data.message);
          }
        } catch (err) {
          console.log("catch error " + err);
        }
      };
    
console.log(skill);
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
              Add One of your skills  here
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
            <Modal.Title id="example-modal-sizes-title-lg">Add Skill</Modal.Title>
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
                      setSkill(e.target.value);
            
                  }}
                />
                <label htmlFor="duree " className="fw-normal">
                  Skill
                  {skill}
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
    )
}

export default AddSkillModal
