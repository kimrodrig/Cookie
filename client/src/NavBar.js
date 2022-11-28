import React from "react";
import { NavLink, useNavigate} from "react-router-dom";

function NavBar() {

  const navigate = useNavigate();

  return (
    <div>
      <nav className="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-8">
            
            <NavLink exact="true" to="/" className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">
              Home
            </NavLink>
            <NavLink to="/chefs" className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">
              Chefs
            </NavLink>
            <NavLink to="/create-event" className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">
              Create Event
            </NavLink>
            <NavLink to="/profile" className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">
              Profile
            </NavLink> 
            <NavLink to="/signup">
              Sign Up
            </NavLink>
            <NavLink to="/login">
              Login
            </NavLink>
            <NavLink to="/logout">
              Logout
            </NavLink>
        </div>
      </nav>
  </div>
  )
}

export default NavBar;