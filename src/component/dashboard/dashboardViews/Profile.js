import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import BioModal from "./profileModals/AddBioModal";
import CompetanceModal from "./profileModals/AddCompetance";
import SkillModal from "./profileModals/AddSkillModal";
import FormationModal from "./profileModals/AddFormation";
import ExperienceModal from "./profileModals/AddExperience";
import SocialMedia from "./profileModals/AddSocialMediaLink";
import { FormatDate, getTime} from "../../../utils/DataTreatment";
import Swal from "sweetalert2";

function Profile() {
 const  {currentUser}= useAuth();
  const [profileUser, setProfileUser] = useState({});
  const [bio, setBio] = useState("");
  const [open, setOpen] = useState(false);
  const [adress, setAdress] = useState([]);
  const [competances, setCompetances] = useState([]);
  const [openCompetance, setOpenCompetance] = useState(false);
  const [openSocialMedia, setOpenSocialMedia] = useState(false);
  const [socialMedia, setSocialMedia] = useState(profileUser.socialMediaLinks);
  const [Skills, setSkills] = useState([]);
  const [openSkill, setOpenSkill] = useState(false);
  const [experience, setExperience] = useState([]);
  const [openExperience, setOpenExperience] = useState(false);
  const [formations, setFormations] = useState([]);
  const [openFormation, setOpenFormation] = useState(false);
  const [avatar, setAvatar] = useState("");
  const { id } = useParams();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [error, setError]= useState("");
  // for update
  const [updateNom, setUpdateNom] = useState(profileUser.nom);
  const [updatePrenom, setUpdatePrenom] = useState(profileUser.prenom);
  const [updateEmail, setUpdateEmail] = useState(profileUser.email);
  const [updateTel, setUpdateTel] = useState(profileUser.tel);
  const [updated, setUpdated] = useState("");

  const config = {
    header: { "Content-Type": "application/json" },
  };

  const uploadAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "/api/upload",
        formData,
        { headers: { "content-Type": "multipart/form-data" } }
      );
      console.log("uploaded res ", res.data);
      if (res.data) {
        console.log(" file uloaded successfully uploaded res ", res.data);
        const result = await axios.put(
          "/api/user/" + profileUser._id,
          { avatar: res.data.filePath }
        );
        if (result) {
          console.log("updated succ", result);
          getById();
        } else {
          console.log("error update");
        }
      }
      const { fileName, filePath } = res.data;
    } catch (err) {
      console.log("There was a problem with the server" + JSON.parse(err));
    }
  };

  const updateEtudiant = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/etudiant/${id}`,
        {
          nom: updateNom,
          prenom: updatePrenom,
          email: updateEmail,
          tel: updateTel,
        },
        config
      );
      if (res.data.data) {
        console.log(
          "here is data of updatetttttttttttttttttttttt ",
          res.data.data
        );
        setUpdated("updated Successfully!");
        setTimeout(setUpdated(""), 5000);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        getById();
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log("catch error " + err);
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const toggle = () => {
    console.log(open);
    if (open == false) {
      setOpen(true);
    } else {
      setOpen(true);
    }
  };
  const StringToPercentage = (niveau) => {
    if (niveau == "beginner") {
      return 20;
    } else if (niveau == "intermidiaire") {
      return 60;
    } else {
      return 80;
    }
  };
  const getColor = (niveau) => {
    if (niveau == "beginner") {
      return "danger";
    } else if (niveau == "intermidiaire") {
      return "warning";
    } else {
      return "green";
    }
  };
  const getById = async () => {
    try {
      const res = await axios.get(`/api/user/${id}`);
      if (res.data.data) {
        console.log("hhhhhhhhh111111111111111111111111");
        setProfileUser(res.data.data);
        console.log("profileUser***********", res.data.data);
        setBio(res.data.data.bio);
        console.log("skills", res.data.data.Skills);
        setAdress(res.data.data.adress);
        setSocialMedia(res.data.data.socialMediaLinks);
        setSkills(res.data.data.Skills);
        setExperience(res.data.data.experience);
        setFormations(res.data.data.formations);
        setCompetances(res.data.data.competences);
        console.log("profile pocessor getted sudccessfully", res.data);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log("catch error " + err);
    }
  };

  useEffect(() => {
    getById();
  }, []);

  console.log("social media link ", socialMedia);
  console.log("userProfile ", profileUser);

  return (
    <div className="container w-100">
      <div className="content-header mb-5">
        <div>
          <div>
            <div className=" mb-5">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">profile</li>
              </ol>
            </div>
            <div className="float-sm-left d-flex align-top mb-5">
              {" "}
              {/* <h4> {profileUser.nom + " " + profileUser.prenom} </h4> */}
            </div>
          </div>
        </div>
      </div>
      <section className="content  d-flex justify-content-center w-100">
        <div className="row w-100">
          <div className="col-md-3">
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                
                 {profileUser.avatar?<img
                    className="profile-user-img img-fluid img-circle"
                    src={profileUser.avatar}
                    alt="picture"
                  />:<i class="fas fa-camera fs-1 text-muted"></i>}

                 {profileUser._id==currentUser._id && <form
                    className=" d-flex m-2"
                    onSubmit={(e) => {
                      uploadAvatar(e);
                    }}
                  >
                    <div className="row justify-content-center">
                      <input
                        type="file"
                        className="form-control mt-3 mb-3 col-10 w-50"
                        title="update profile picture"
                        id="customFile"
                        placeholder="ug"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          setFileName(e.target.files[0].name);
                          console.log("ddddddddddddddddddd", e.target.files[0]);
                        }}
                      />
                      <button type="submit" className="btn col-2">
                        <i className="fas fa-pen-alt"></i>
                      </button>
                    </div>
                  </form>}
                </div>
                <h3 className="profile-username text-center">
                  {profileUser.nom + "  " + profileUser.prenom}
                </h3>
                <p className="text-muted text-center">{profileUser.faculte}</p>
                <p className="text-muted text-center">
                  {profileUser.filiere} ({profileUser.specialite})
                </p>
                <ul className="list-group list-group-unbordered mb-3">
                  <li className="list-group-item">
                    <a className="text-start">{profileUser.email}</a>
                  </li>
                  <li className="list-group-item row">
                    <b className=" d-block text-center">
                      Num Tel : <a>{profileUser.tel}</a>{" "}
                    </b>
                  </li>
                  <li className="list-group-item">
                    <b>Naissance : </b>{" "}
                    <a className="text-start">
                      {FormatDate(profileUser.dateNaissance)}
                    </a>
                  </li>
                </ul>
              </div>
              {/* /.card-body */}
            </div>
            <div className="card ">
              <div className="card-header" style={{ backgroundColor: "#32465c" }}>
                <h3 className="card-title text-light fs-5">About</h3>
              </div>
              <div className="card-body">
                <div className=" text-dark" style={{ fontSize: "25px" }}>
                  <a
                    href="{`${socialMedia.facebookLink}`}"
                    className="text-dark"
                  >
                    <i className="fab fa-facebook-square p-2"></i>
                  </a>
                  {console.log("SocialMedia", socialMedia)}

                  <a href="{`${socialMedia.GitHubLink}`}" className="text-dark">
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href="{`${socialMedia.linkedinLink}`}"
                    className="text-dark"
                  >
                    {" "}
                    <i className="fab fa-linkedin p-2 "></i>
                  </a>
                  <a
                    href="{`${socialMedia.youtubeLink}`}"
                    className="text-dark"
                  >
                    <i className="fab fa-youtube p-2 "></i>
                  </a>
                  <a href="j" className="text-dark">
                    <i className="fab fa-fort-awesome-alt"></i>
                  </a>
                </div>
                <hr />
                <strong>
                  <i className="fas fa-map-marker-alt mr-1" /> Location
                </strong>
                {console.log("adresss ", adress.ville)}
                <p className="pl-2 text-muted text-start">pays {adress.pays}</p>
                <p className="pl-2 text-muted text-start">
                  municipalite {adress.municipalite}
                </p>
                <p className="pl-2 text-muted text-start">
                  ville {adress.ville}
                </p>
                <p className="pl-2 text-muted text-start">
                  avenue {adress.avenue}
                </p>
                <p className="pl-2 text-muted text-start">rue {adress.rue}</p>
                <p className="pl-2 text-muted text-start">
                  codePostal {adress.codePostal}
                </p>
                <hr />
                <strong>
                  <i className="fas fa-pencil-alt mr-1" /> Skills
                </strong>
                <ul className="list-group list-group-unbordered mb-3">
                  {Skills.length != 0 &&
                    Skills.map((skill) => {
                      return (
                        <li className="list-group-item text-start" key={skill._id}>
                        {skill.skill}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>

          <BioModal
            id={id}
            open={open}
            toggle={(bool) => {
              setOpen(bool);
            }}
            setBio={(newBio) => {
              setBio(newBio);
            }}
          />

          <CompetanceModal
            id={id}
            open={openCompetance}
            toggle={(bool) => {
              setOpenCompetance(bool);
            }}
            addCompetance={(newCompetance) => {
              setCompetances([...competances, newCompetance]);
            }}
          />

          <SkillModal
            id={id}
            open={openSkill}
            toggle={(bool) => {
              setOpenSkill(bool);
            }}
            addSkill={(newSkill) => {
              setSkills([...Skills, newSkill]);
            }}
          />

          <FormationModal
            id={id}
            open={openFormation}
            toggle={(bool) => {
              setOpenFormation(bool);
            }}
            addFormation={(newFormation) => {
              setFormations([...formations, newFormation]);
            }}
          />

          <ExperienceModal
            id={id}
            open={openExperience}
            toggle={(bool) => {
              setOpenExperience(bool);
            }}
            addExperience={(newExperience) => {
              setExperience([...experience, newExperience]);
            }}
          />

          <SocialMedia
            id={id}
            open={openSocialMedia}
            toggle={(bool) => {
              setOpenSocialMedia(bool);
            }}
            updateSocialMedia={(links) => {
              setSocialMedia(links);
            }}
            socialMediaLinks={socialMedia}
          />

          <div className="col-md-8">
            <div className="card">
              <div className="card-header p-2">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#activity"
                      data-toggle="tab"
                    >
                      Principal
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#timeline" data-toggle="tab">
                      Formations
                    </a>
                  </li>
                 {currentUser._id==profileUser._id&&<li className="nav-item">
                    <a className="nav-link" href="#settings" data-toggle="tab">
                      Settings
                    </a>
                  </li>}
                </ul>
              </div>
              

              
             {profileUser._id==currentUser._id && <div className="row m-2 border">
                <div className="btn-group col-3  border-right">
                  <button type="button" className="btn btn-default">
                    About Me
                  </button>
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle dropdown-icon"
                    data-toggle="dropdown"
                  >
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu" role="menu">
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        console.log(open);
                        if (open == false) {
                          setOpen(true);
                        } else {
                          setOpen(true);
                        }
                      }}
                    >
                      Ajouter Bio
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        if (openSkill == false) {
                          setOpenSkill(true);
                        } else {
                          setOpenSkill(true);
                        }
                      }}
                    >
                      New Skill
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        console.log(open);
                        if (openSocialMedia == false) {
                          setOpenSocialMedia(true);
                        } else {
                          setOpenSocialMedia(true);
                        }
                      }}
                    >
                      socialLinks
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        if (openCompetance == false) {
                          setOpenCompetance(true);
                        } else {
                          setOpenCompetance(true);
                        }
                      }}
                    >
                      New Competance
                    </a>
                    <div className="dropdown-divider" />
                  </div>
                </div>
                <div className="btn-group col-3  border-right">
                  <button type="button" className="btn btn-default">
                    Extra Info
                  </button>
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle dropdown-icon"
                    data-toggle="dropdown"
                  >
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu" role="menu">
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        console.log(open);
                        if (openFormation == false) {
                          setOpenFormation(true);
                        } else {
                          setOpenFormation(true);
                        }
                      }}
                    >
                      New Formation
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        console.log(open);
                        if (openExperience == false) {
                          setOpenExperience(true);
                        } else {
                          setOpenExperience(true);
                        }
                      }}
                    >
                      New Experience
                    </a>
                    <div className="dropdown-divider" />
                  </div>
                </div>
              </div>}

              <div className="card-body">
                <div className="tab-content">
{/* Principal */}
                  <div className="tab-pane active" id="activity">
                    <div>
                      <div className="user-block mb-3 w-100 ">
                        {profileUser.avatar?<img
                          className="img-circle img-bordered-sm"
                          src={profileUser.avatar}
                          alt="image"
                        />:<div className=" text-start"><i class="fas fa-camera fs-4 text-muted "></i></div>}
                        <span className="username text-start p-2">
                          <Link to="/profile">
                            {profileUser.nom + "  " + profileUser.prenom}
                          </Link>
                          <a href="#" className="float-right btn-tool">
                            <i className="fas fa-times" />
                          </a>
                        </span>
                        <span className="description text-start pl-2">
                        getTime
                          joined - {FormatDate(profileUser.date)+" -- "+getTime(profileUser.date)}
                        </span>
                      </div>
                    </div>

                    <div className="user-block border p-3 w-100">
                      {bio && (
                        <div className="card-body w-100">
                          <h5 className="card-title">My Bio</h5>
                          <p className="card-text text-left">{bio}</p>
                        </div>
                      )}
                    </div>
                    <br />

                    {competances.length != 0 && (
                      <div>
                        <h5 className="card-title p-3">Mes competances</h5>

                        <div className="table-responsive">
                          <table className="table">
                            <thead className="mb-2">
                              <td>competance</td>
                              <td>niveau</td>
                            </thead>
                            <tbody>
                              {competances.map((comp) => {
                                return (
                                  <tr>
                                    <td style={{ width: "50%" }}>
                                      {comp.technologie}
                                    </td>

                                    <td className="project_progress">
                                      <div className="progress progress-sm">
                                        <div
                                          className={
                                            "progress-bar bg-" +
                                            getColor(comp.niveau)
                                          }
                                          role="progressbar"
                                          aria-valuenow={StringToPercentage(
                                            comp.niveau
                                          )}
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                          style={{
                                            width:
                                              StringToPercentage(comp.niveau) +
                                              "%",
                                          }}
                                        ></div>
                                      </div>
                                      <small>
                                        {StringToPercentage(comp.niveau)}%
                                        Complete
                                      </small>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    <br />
                    <br />

                    {experience.length != 0 && (
                      <div>
                        <h5 className="card-title p-3  text-success  fw-bold w-100 text-start">
                          Mes Experiences
                        </h5>
                        {experience.map((exp) => {
                          return (
                            <div className="card-body">
                              <div className="text-start">
                                <a href="https://fontawesome.com/">
                                  {exp.societe}
                                </a>
                              </div>
                              <strong className="text-start d-block">
                                {exp.nature} {exp.poste}
                              </strong>

                              <p className="text-start">{exp.description}</p>

                              <p className="text-start">
                                date Debut : {FormatDate(exp.dateDebut)}
                              </p>
                              <p className="text-start">
                                date Fin :{FormatDate(exp.dateFin)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
{/* formation */}
                  <div className="tab-pane" id="timeline">
                    {formations.map((formation) => {
                      return (
                        <div className="timeline timeline-inverse">
                          <div className="time-label text-start">
                            <span>{formation.dateDebut}</span>
                          </div>
                          <div>
                            <i class="fas fa-stamp"></i>
                            <div className="timeline-item">
                              <h3 className="timeline-header text-start ">
                                <a href="#" className="pb-2">
                                  {formation.nom}
                                </a>
                                <p className="pt-2">{formation.universite}</p>
                              </h3>

                              <div className="timeline-body">
                                <p className="muted text-start fs-6">
                                  plus de details
                                </p>
                                {formation.details}
                              </div>
                            </div>
                          </div>
                          <div className="time-label text-start">
                            <span>{formation.dateFin}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
{/* setting */}
                  
                 {profileUser._id==currentUser._id &&<div className="tab-pane" id="settings">
                    {updated && (
                      <div
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                      >
                        {updated}
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    )}
                    {error && (
                      <div
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                      >
                        {error}
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    )}
                    <form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        updateEtudiant(e);
                      }}
                    >
                      <div className="form-group row">
                        <label
                          htmlFor="nom"
                          className="col-sm-2 col-form-label"
                        >
                          nom
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="nom"
                            value={updateNom}
                            placeholder="nom"
                            onChange={(e) => {
                              setUpdateNom(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="prenom"
                          className="col-sm-2 col-form-label text-start pl-5"
                        >
                          prenom
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="prenom"
                            value={updatePrenom}
                            placeholder="prenom"
                            onChange={(e) => {
                              setUpdatePrenom(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail"
                          className="col-sm-2 col-form-label text-start pl-5"
                        >
                          Email
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            value={updateEmail}
                            placeholder="Email"
                            onChange={(e) => {
                              setUpdateEmail(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail"
                          className="col-sm-2 col-form-label text-start pl-5"
                        >
                          Tel
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            value={updateTel}
                            id="inputEmail"
                            placeholder="Tel"
                            onChange={(e) => {
                              setUpdateTel(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <button type="submit" className="btn btn-danger">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>}

                  {/* /.tab-pane */}
                </div>
                {/* /.tab-content */}
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
