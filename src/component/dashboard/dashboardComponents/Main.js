import React from "react";
import AddEnseignant from "../dashboardViews/AddEnseignant";
import AddEtudiant from "../dashboardViews/AddEtudiant";
import AddProject from "../dashboardViews/AddProject";
import ListeEnseignants from "../dashboardViews/ListeEnseignants";
import ListeEtudiants from "../dashboardViews/listeEtudiants";
import ListeProjets from "../dashboardViews/ListeProjets";
import ProjectDetails from "../dashboardViews/projectDetails";
import Chatbot from "../../ChatRoom/Chat/ChatRoom";
import FileUpload from "../dashboardViews/FileUpload";
import { useAuth } from "../../../contexts/AuthContext";

import { Route, Routes, NavLink } from "react-router-dom";
import UpdateEnseignant from "../dashboardViews/updateEnseignant";
import UpdateEtudiant from "../dashboardViews/updateEtudiant";
import Profile from "../dashboardViews/Profile";

function Main() {
  const { currentUser } = useAuth();

  function userRoleRoutes(role) {
    switch (role) {
      case "Admin":
        return [
          { path: "/listEnseignants", element: <ListeEnseignants /> },
          { path: "/listEtudiants", element: <ListeEtudiants /> },
          { path: "/addetudiant", element: <AddEtudiant /> },
          { path: "/updateetudiant/:id", element: <UpdateEtudiant /> },
          { path: "/addenseignant", element: <AddEnseignant /> },
          { path: "/updateenseignant/:id", element: <UpdateEnseignant /> },
        ];
        break;

      case "Encadreur":
        return [
          { path: "/listProjects/*", element: <ListeProjets /> },
          { path: "/chatbot", element: <Chatbot /> },
          { path: "/projectDetails/:id", element: <ProjectDetails /> },
          { path: "/listProjects/addProject", element: <AddProject /> },
          { path: "/uploadFile/:id", element: <FileUpload /> },
          { path: "/profile/:id", element: <Profile /> },
        ];
        break;

      default:
        if (currentUser.projetPFE) {
          return [
            { path: "/chatbot", element: <Chatbot /> },
            { path: "/profile/:id", element: <Profile /> },
            { path: "/uploadFile/:id", element: <FileUpload /> },
            { path: "/projectDetails/:id", element: <ProjectDetails /> },
          ];
        } else {
          return [
            { path: "/chatbot", element: <Chatbot /> },
            { path: "/profile/:id", element: <Profile /> },
            { path: "/uploadFile/:id", element: <FileUpload /> },
          ];
        }
    }
  }
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <section className="col-lg-12 connectedSortable">
            <Routes>
              {userRoleRoutes(currentUser.role).map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Routes>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Main;
