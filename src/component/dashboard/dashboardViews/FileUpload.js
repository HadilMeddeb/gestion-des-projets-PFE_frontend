import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link, useParams,useEffect } from "react-router-dom";
import ProgressBar from "../dashboardComponents/ProgressBar";
import { useAuth } from "../../../contexts/AuthContext";

function FileUpload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadedPercentage, setUploadedPercentage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploaded, setUploaded] = useState("");
  const[idProject,setIdProject]= useState();
  const { currentUser } = useAuth();
  const {id} = useParams();
 
  const AddFileToProject = async (name,path) => {
    const res = await axios.put(
      "/api/projetpfe/" + id + "/pushFile",
      {
        fileName: name,
        filePath: path,
        size: file.size,
        downloader: currentUser._id,
      }
    );
    if (res.data) {
      console.log("file added successfully ", res.data);
    } else {
      console.log("error file not added ", res.data);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "/api/upload",
        formData,
        {
          headers: { "content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            setUploadedPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
            setTimeout(() => setUploadedPercentage(0), 5000);
          },
        }
      );
      console.log("uploaded res ", res.data);
      if (res.data) {
        console.log("uploaded res ", res.data);
        setUploaded("file uploaded successfully");
        setTimeout(() => setUploaded(""), 5000);
        AddFileToProject(res.data.fileName,res.data.filePath);

      }
      const { fileName, filePath } = res.data;
    } catch (err) {
      if (err.response.status == 500) {
        console.log("There was a problem with the server");
        setErrorMessage(err.response.data.msg);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else {
        console.log(err.response.data.msg);
        setErrorMessage(err.response.data.msg);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };
  return (
    <Fragment>
      <div className="content-header mt-5 mb-5">
        <div>
          <div>
            <div className="">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">File Upload</li>
              </ol>
            </div>
            <div className="float-sm-left d-flex align-top ">
              {" "}
              <h4>FileUpload</h4>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          {uploaded && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              {uploaded}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          {errorMessage && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {errorMessage}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}

          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={(e) => {
                console.log("fffffffff", e.target.files[0]);
                setFile(e.target.files[0]);
                setFileName(e.target.files[0].name);
              }}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {fileName}
            </label>
          </div>

          <ProgressBar percentage={uploadedPercentage} />
          <input
            type="submit"
            value="upload"
            className="btn btn-primary btn-block mt-4"
          />
        </div>
      </form>
    </Fragment>
  );
}

export default FileUpload;
