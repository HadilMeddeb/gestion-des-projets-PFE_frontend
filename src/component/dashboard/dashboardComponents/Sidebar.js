import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

function Sidebar() {
  const { currentUser } = useAuth();
  
  function userRoleDashboardLinks(role) {
    switch (role) {
      case "Admin":
        return [
          {
            id: "1",
            link: "/dashboard/listEnseignants",
            element: "Enseignants",
            icon: <i className=" p-2 fas fa-user-tie"></i>,
          },
          {
            id: "2",
            link: "/dashboard/listEtudiants",
            element: "Etudiants",
            icon: <i className="p-2 fas fa-user-graduate"></i>,
          },
      

          
        ];
        break;
      case "Encadreur":
        return [
          {
            id: "3",
            link: "/dashboard/listProjects",
            element: "Projects",
            icon: <i className=" p-2 fas fa-project-diagram"></i>,
          },
          {
            id: "4",
            link: "/dashboard/chatbot",
            element: "Chatbot",
            icon: <i className="p-2 fas fa-comments"></i>,
          },
        ];
        break;
      default:
        if(currentUser.projetPFE)
        {
          return [
            {
              id: "5",
              link: "/dashboard/chatbot",
              element: "Chatbot",
              icon: <i className=" p-2 fas fa-comments"></i>,
            },
            {
              id: "7",
              link: "/dashboard/profile/"+currentUser._id,
              element: "Profile",
              icon: <i class=" p-2 fas fa-user-circle"></i>,
            },
            
            {
              id: "8",
              link: "/dashboard/projectDetails/" +currentUser.projetPFE,
              element: "Mon Projet PFE",
              icon: <i className=" p-2 fas fa-project-diagram"></i>,
            },
          ];
        }else
        {return [
          {
            id: "5",
            link: "/dashboard/chatbot",
            element: "Chatbot",
            icon: <i className=" p-2 fas fa-comments"></i>,
          },
          {
            id: "7",
            link: "/dashboard/profile/"+currentUser._id,
            element: "Profile",
            icon: <i class=" p-2 fas fa-user-circle"></i>,
          },
        ];}
    }
  }

  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4"
      style={{ backgroundColor: "#32465c" }}
    >
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item has-treeview menu-open   text-start">
              <a href="#" className="nav-link ">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
            </li>
            <li className="nav-header  text-start">{currentUser.role}</li>

            {userRoleDashboardLinks(currentUser.role).map((link) => {
              return (
                <li className="nav-item has-treeview border-bottom text-start">
                
                    <NavLink key={link.id} className="nav-link" to={link.link}>
                      {link.icon} {link.element}
                    </NavLink>
                 
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
