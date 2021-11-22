import React from 'react';
import {Link, NavLink} from "react-router-dom";

function Navbar({user}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4">
        <Link className="navbar-brand"
              to="/">Vidly</Link>
        <button className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse"
             id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link"
                     aria-current="page"
                     to="/movies">Movies</NavLink>
            <NavLink className="nav-link"
                     to="/customers">Customers</NavLink>
            <NavLink className="nav-link"
                     to="/rentals">Rentals</NavLink>
            {!user && (
              <>
                <NavLink className="nav-link"
                         to="/login">Login</NavLink>
                <NavLink className="nav-link"
                         to="/register">Register</NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink className="nav-link"
                         to="/profile">{user.name}</NavLink>
                <NavLink className="nav-link"
                         to="/logout">Logout</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;