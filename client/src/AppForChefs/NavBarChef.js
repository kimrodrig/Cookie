import React from "react";
import { NavLink, useNavigate} from "react-router-dom";

function NavBarChef() {

  const nav = useNavigate();

  function handleLogout(){
    fetch('/logout', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    .then(res=>{
        if (res.ok) {
            console.log("Successfully logged out")
            nav("/")
            window.location.reload(false);
        }
        else {console.log("not ok")}
    })
  }

  return (
    <div>
      <nav className="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-8">
            
            <NavLink exact="true" to="/" className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">
              Home
            </NavLink>
            <NavLink to="/profile" className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">
              Profile
            </NavLink> 
            <NavLink onClick={handleLogout}>
              Logout
            </NavLink>
        </div>
      </nav>
  </div>
  )
}

export default NavBarChef;