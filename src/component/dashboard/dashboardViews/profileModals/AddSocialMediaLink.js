import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";


function AddSocialMediaLink(props) {

    const [facebook,setFacebook]= useState("#");
    const [youtube,setYoutube]= useState("#");
    const [website,setWebsite]= useState("#");
    const [github,setGithub]= useState("#");
    const [linkedin,setLinkedin]= useState("#");
    




    const toggle = props.toggle;
    const id = props.id;
    const open = props.open;
    const socialMediaLinks = props.socialMediaLinks;
    const updateSocialMedia=props.updateSocialMedia;
    const config = {
        header: { "Content-Type": "application/json" },
      };

      const updateEtudiant = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.put(`/api/etudiant/${id}`,{socialMediaLinks:{linkedinLink:linkedin,facebookLink:facebook,GitHubLink:github,portfolioWebsite:website,youtubeLink:youtube}},config);
          if (res.data.data) {
            console.log(
              "here is data of updatetttttttttttttttttttttt ",
              res.data.data
            ); 
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
                updateEtudiant(e);
              }}
            >
                <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="facebook"
                  placeholder="facebook link"
                  required
                  onChange={(e) => {
                    setFacebook(e.target.value);
                  }}
                />
                <label htmlFor="facebook" className="fw-normal">
                  Facebook Link
                </label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="youtube"
                  placeholder="youtube Link"
                  required
                  onChange={(e) => {
                    setYoutube(e.target.value);
                  }}
                />
                <label htmlFor="youtube" className="fw-normal">
                  Youtube Link
                </label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="linkedin"
                  placeholder="  Linkedin link"
                  required
                  onChange={(e) => {
                    setLinkedin(e.target.value);
                  }}
                />
                <label htmlFor="societe" className="fw-normal">
                 Linkedin link
                </label>
              </div>
  
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="github"
                  placeholder="Github Link"
                  required
                  onChange={(e) => {
                    setGithub(e.target.value);
                  }}
                />
                <label htmlFor="github" className="fw-normal">
                 Github Link
                </label>
              </div>
  
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  placeholder="Portofilio Website Link"
                  required
                  onChange={(e) => {
                    setWebsite(e.target.value);
                  }}
                />
                <label htmlFor="website" className="fw-normal">
                  Portofilio website Link
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

export default AddSocialMediaLink
