import axios from "axios";
import React, { useState } from "react";
import {Modal} from "react-bootstrap";

function AddBioModal(props) {
  const [input, setInput] = useState("");

  const toggle= props.toggle;
  const id= props.id;
  const open= props.open;
  const setBio= props.setBio;

  const config = {
    header: { "Content-Type": "application/json" },
  };

  const hundleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/etudiant/${id}`,
        {bio:input},
        config
      );
      if (res.data.data) {
        console.log(
          "here is data of updatetttttttttttttttttttttt ",
          res.data.data
        );
        setBio(input);
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
      <Modal.Title id="example-modal-sizes-title-lg">
        Add Bio
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form onSubmit={(e)=>{hundleSubmission(e)}}>
        
    <div className=" mb-3 form-floating">
                      <textarea
                        className="form-control"
                        id="descriptionDetaille"
                        rows={5}
                        defaultValue={""}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="descriptionDetaille"
                        className="fw-normal"
                      >
                        Write your Bio here
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

export default AddBioModal;
