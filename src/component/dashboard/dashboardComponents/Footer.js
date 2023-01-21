import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <footer className="main-footer">
        <strong>Copyright &copy; 2014-2019 <NavLink to="/">  Edux  </NavLink></strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.0.0
        </div>
      </footer>
    )
}

export default Footer
